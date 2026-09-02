import { env } from "cloudflare:workers";

type TeamPayload = {
  id?: string;
  leagueName?: string;
  teamName?: string;
  format?: string;
  roster?: number[];
  scoring?: Record<string, number>;
  provider?: "manual" | "yahoo";
  providerTeamKey?: string | null;
};

function userId(request: Request) {
  return request.headers.get("oai-authenticated-user-id");
}

function cleanText(value: unknown, fallback: string, max = 120) {
  return typeof value === "string" && value.trim()
    ? value.trim().slice(0, max)
    : fallback;
}

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function publicTeam(row: Record<string, unknown>) {
  return {
    id: row.id,
    leagueName: row.league_name,
    teamName: row.team_name,
    format: row.format,
    roster: parseJson(String(row.roster_json ?? "[]"), [] as number[]),
    scoring: parseJson(String(row.scoring_json ?? "{}"), {} as Record<string, number>),
    provider: row.provider,
    providerTeamKey: row.provider_team_key,
    updatedAt: row.updated_at,
  };
}

export async function GET(request: Request) {
  const ownerId = userId(request);
  if (!ownerId) return Response.json({ error: "Sign in required" }, { status: 401 });
  const result = await env.DB.prepare(
    `SELECT id, league_name, team_name, format, roster_json, scoring_json,
            provider, provider_team_key, updated_at
       FROM team_profiles
      WHERE user_id = ?
      ORDER BY updated_at DESC`,
  ).bind(ownerId).all();
  return Response.json({ teams: result.results.map((row) => publicTeam(row)) });
}

export async function POST(request: Request) {
  const ownerId = userId(request);
  if (!ownerId) return Response.json({ error: "Sign in required" }, { status: 401 });
  const payload = (await request.json()) as TeamPayload;
  const id = crypto.randomUUID();
  const now = Date.now();
  const leagueName = cleanText(payload.leagueName, "My Fantasy League");
  const teamName = cleanText(payload.teamName, "My Team");
  const format = cleanText(payload.format, "points", 30);
  const roster = Array.isArray(payload.roster) ? payload.roster.filter(Number.isInteger) : [];
  const scoring = payload.scoring && typeof payload.scoring === "object" ? payload.scoring : {};
  const provider = payload.provider === "yahoo" ? "yahoo" : "manual";
  const providerTeamKey = cleanText(payload.providerTeamKey, "", 160) || null;
  await env.DB.prepare(
    `INSERT INTO team_profiles
      (id, user_id, league_name, team_name, format, roster_json, scoring_json,
       provider, provider_team_key, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(id, ownerId, leagueName, teamName, format, JSON.stringify(roster),
    JSON.stringify(scoring), provider, providerTeamKey, now, now).run();
  return Response.json({ team: { id, leagueName, teamName, format, roster, scoring, provider, providerTeamKey, updatedAt: now } }, { status: 201 });
}

export async function PUT(request: Request) {
  const ownerId = userId(request);
  if (!ownerId) return Response.json({ error: "Sign in required" }, { status: 401 });
  const payload = (await request.json()) as TeamPayload;
  if (!payload.id) return Response.json({ error: "Team id is required" }, { status: 400 });
  const now = Date.now();
  const result = await env.DB.prepare(
    `UPDATE team_profiles
        SET league_name = ?, team_name = ?, format = ?, roster_json = ?,
            scoring_json = ?, updated_at = ?
      WHERE id = ? AND user_id = ?`,
  ).bind(
    cleanText(payload.leagueName, "My Fantasy League"),
    cleanText(payload.teamName, "My Team"),
    cleanText(payload.format, "points", 30),
    JSON.stringify(Array.isArray(payload.roster) ? payload.roster.filter(Number.isInteger) : []),
    JSON.stringify(payload.scoring && typeof payload.scoring === "object" ? payload.scoring : {}),
    now,
    payload.id,
    ownerId,
  ).run();
  if (!result.meta.changes) return Response.json({ error: "Team not found" }, { status: 404 });
  return Response.json({ ok: true, updatedAt: now });
}

export async function DELETE(request: Request) {
  const ownerId = userId(request);
  if (!ownerId) return Response.json({ error: "Sign in required" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error: "Team id is required" }, { status: 400 });
  const result = await env.DB.prepare(
    "DELETE FROM team_profiles WHERE id = ? AND user_id = ?",
  ).bind(id, ownerId).run();
  if (!result.meta.changes) return Response.json({ error: "Team not found" }, { status: 404 });
  return Response.json({ ok: true });
}
