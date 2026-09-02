# Instructions for Coding Agents

1. Read `00_CHATGPT_START_HERE.md` and `README.md` before making changes.
2. Preserve the current Vinext, React, TypeScript, D1, and Drizzle architecture.
3. Treat the current UI as a working application, not a disposable mockup.
4. Do not replace the design system, dark mode, responsive behavior, or multi-team model unless explicitly asked.
5. Use `apply_patch` for source edits and preserve unrelated changes.
6. Run `npm run build` after product changes. Run `npm run db:generate` after schema changes, inspect the SQL, and commit the generated migration metadata.
7. Never include secrets, tokens, credentials, real user data, or deployment identifiers in source or output.
8. Do not claim Yahoo, NHL, or MoneyPuck data is live until the corresponding server integration is implemented and verified.
9. Keep Yahoo write operations review-first. Lineup changes, transactions, waiver claims, and trades must not occur silently.
10. Prefer complete, evidence-backed implementations over placeholder buttons. Clearly label any remaining simulated data.

## Current priority order

1. Yahoo developer application and secure OAuth callback.
2. Read-only import of the authenticated user's Yahoo hockey leagues and teams.
3. Import league scoring, roster positions, eligibility, limits, rosters, matchups, and free agents.
4. Replace demonstration player/schedule data with live sources and projection models.
5. Implement a legal daily/weekly lineup optimizer.
6. Add a review screen and optional Yahoo lineup submission.
7. Add safe multi-user access and sharing.
