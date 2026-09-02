CREATE TABLE `team_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`league_name` text NOT NULL,
	`team_name` text NOT NULL,
	`format` text NOT NULL,
	`roster_json` text NOT NULL,
	`scoring_json` text NOT NULL,
	`provider` text DEFAULT 'manual' NOT NULL,
	`provider_team_key` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_team_profiles_user_id` ON `team_profiles` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_team_profiles_provider_team` ON `team_profiles` (`user_id`,`provider`,`provider_team_key`);