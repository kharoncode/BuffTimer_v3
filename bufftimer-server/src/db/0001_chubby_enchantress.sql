CREATE TABLE `group_characters` (
	`id` integer PRIMARY KEY NOT NULL,
	`group_id` integer NOT NULL,
	`character_id` integer NOT NULL,
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `group_enemies` (
	`id` integer PRIMARY KEY NOT NULL,
	`group_id` integer NOT NULL,
	`enemy_id` integer NOT NULL,
	`type` integer NOT NULL,
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` integer PRIMARY KEY NOT NULL,
	`creator_id` integer NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`creator_id`) REFERENCES `characters`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `monster_spells` (
	`id` integer PRIMARY KEY NOT NULL,
	`mob_id` integer NOT NULL,
	`enum_spell` integer NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`mob_id`) REFERENCES `monsters`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `player_spells` (
	`id` integer PRIMARY KEY NOT NULL,
	`player_id` integer NOT NULL,
	`enum_spell` integer NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `characters`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `spells`;--> statement-breakpoint
ALTER TABLE `players` RENAME TO `characters`;--> statement-breakpoint
ALTER TABLE `mobs` RENAME TO `monsters`;--> statement-breakpoint
DROP INDEX IF EXISTS `players_name_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `characters_name_unique` ON `characters` (`name`);