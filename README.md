# PuckPilot

PuckPilot is a responsive fantasy-hockey command center for custom player rankings, roster analysis, matchup simulations, streaming recommendations, daily lineup planning, and draft support.

## Current features

- Responsive desktop and mobile interface
- Persistent light and dark modes
- Custom points, categories, one-win, and rotisserie profiles
- Account-owned multi-team profiles
- Cloud-saved scoring, rosters, and league settings
- Player rankings recalculated from custom point values
- Daily and weekly lineup-planning interface
- Add/drop and streaming simulations
- Matchup and draft-analysis views
- Cloudflare D1 schema and migrations

## Important limitation

The included player pool and projections are demonstration data. Yahoo OAuth, live Yahoo league import, and live NHL/MoneyPuck data ingestion are not yet implemented. The interface identifies the planned Yahoo callback address, but no Yahoo client credentials or tokens are included in this archive.

## Stack

- React 19
- Next.js 16-compatible Vinext runtime
- TypeScript
- Tailwind CSS
- Shadcn/Radix UI primitives
- Cloudflare Workers
- Cloudflare D1 with Drizzle migrations

## Local setup

Requirements:

- Node.js 22.13 or newer
- npm

Install and build:

```bash
npm run install:ci
npm run build
```

Run the development server:

```bash
npm run dev
```

The hosted application expects a D1 binding named `DB`. The logical binding is declared in `.openai/hosting.json`, and the schema is in `db/schema.ts`.

## Database

The current migration lives in `drizzle/`. After modifying `db/schema.ts`, generate a new migration with:

```bash
npm run db:generate
```

Team-profile API operations are implemented in `app/api/teams/route.ts`. They use the authenticated user ID forwarded by the hosting environment to keep each user's data separate.

## Yahoo integration plan

Register a Yahoo web application and configure:

- Home URL: your deployed PuckPilot URL
- Callback URL: `https://YOUR-DOMAIN/api/yahoo/callback`
- Fantasy Sports access, with read/write permissions when available

Keep the Yahoo client secret and refresh tokens in server-side environment variables. Never commit them to the repository or expose them to browser code.

## Sharing safely

The exported `.openai/hosting.json` intentionally contains no existing project ID. Dependencies, build output, repository history, database contents, deployment credentials, and user data are also excluded.
