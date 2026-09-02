import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const teamProfiles = sqliteTable(
  "team_profiles",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    leagueName: text("league_name").notNull(),
    teamName: text("team_name").notNull(),
    format: text("format").notNull(),
    rosterJson: text("roster_json").notNull(),
    scoringJson: text("scoring_json").notNull(),
    provider: text("provider").notNull().default("manual"),
    providerTeamKey: text("provider_team_key"),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
  },
  (table) => [
    index("idx_team_profiles_user_id").on(table.userId),
    uniqueIndex("idx_team_profiles_provider_team").on(
      table.userId,
      table.provider,
      table.providerTeamKey,
    ),
  ],
);
