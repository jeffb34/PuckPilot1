# Start Here: PuckPilot Project Brief

Read this file completely before analyzing or modifying the project.

## What PuckPilot is

PuckPilot is a responsive fantasy-hockey assistant designed for Yahoo Fantasy Hockey. Its intended purpose is to help users:

- prepare for drafts;
- rank players using each league's exact scoring rules;
- optimize daily and weekly starting lineups;
- analyze weekly opponents and matchup probabilities;
- identify streaming, add/drop, waiver, and trade opportunities;
- manage multiple teams and league formats; and
- use the same account and saved data across computers and phones.

## Current implementation

The application currently includes:

- a responsive desktop/mobile dashboard;
- persistent light and dark modes;
- player rankings recalculated from custom point values;
- points, categories, one-win, and rotisserie team profiles;
- account-owned multi-team profiles;
- cloud-persisted team name, league name, scoring, format, and roster data;
- draft recommendations;
- matchup simulations;
- streaming and add/drop simulations;
- an opponent-analysis interface; and
- a seven-day lineup-planning interface.

The player pool, schedules, projections, opponent, and matchup values are demonstration data inside `app/page.tsx`.

## Not implemented yet

Do not claim these features are live:

1. Yahoo OAuth authorization.
2. Live Yahoo league, roster, opponent, transaction, waiver, or free-agent import.
3. Live NHL or MoneyPuck ingestion.
4. Real position-constrained lineup optimization using imported Yahoo roster rules.
5. Submitting lineups or transactions to Yahoo.
6. Public multi-user sharing.

The highest-priority next milestone is secure Yahoo OAuth and read-only Yahoo league import. Yahoo write actions should be added only after read-only import is working and should require explicit user review and approval.

## Architecture

- React 19 and TypeScript
- Next.js-compatible Vinext runtime
- Tailwind CSS
- Shadcn/Radix UI primitives
- Cloudflare Workers-compatible server routes
- Cloudflare D1 for team-profile persistence
- Drizzle for schema and migrations

## Important files

| File | Purpose |
|---|---|
| `app/page.tsx` | Main client application, demo data, calculations, and interface |
| `app/globals.css` | Complete light/dark responsive design system |
| `app/api/teams/route.ts` | Authenticated multi-team CRUD API |
| `app/chatgpt-auth.ts` | Hosting-provided ChatGPT sign-in helpers |
| `db/schema.ts` | D1 schema |
| `drizzle/` | Generated database migrations |
| `.openai/hosting.json` | Logical hosting and D1 binding configuration |
| `README.md` | Setup, deployment, database, and Yahoo-integration notes |

## Data and security rules

- Never put Yahoo client secrets, refresh tokens, access tokens, or user data in client code.
- Keep Yahoo credentials in server-side environment variables.
- Associate every saved team and Yahoo connection with the authenticated user ID.
- Enforce ownership again in every server route; never trust client-supplied user IDs.
- Treat lineup submissions, add/drops, waiver claims, and trades as consequential actions requiring a confirmation screen.
- Do not commit `.env` files, credentials, tokens, real database contents, or deployment credentials.

## Product behavior requirements

- Support multiple teams under one user account.
- Keep each league's scoring, roster rules, limits, and recommendations isolated.
- Support daily and weekly lineup-lock leagues.
- For points leagues, optimize expected fantasy points.
- For category leagues, optimize probability of winning the matchup rather than raw aggregate player value.
- Model player eligibility, lineup slots, bench/IR positions, off-nights, schedule conflicts, goalie start probability, injuries, transaction limits, and roster-lock times.
- Keep the interface usable on phones without removing core functionality.

## How to continue

Before editing, inspect the relevant files and explain what is currently real versus simulated. Preserve the existing architecture and visual direction. Make the smallest coherent change that advances the requested capability, validate with `npm run build`, and never invent Yahoo API responses or credentials.
