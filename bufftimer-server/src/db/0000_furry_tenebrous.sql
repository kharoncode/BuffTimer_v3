CREATE TABLE `characters` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`name` text NOT NULL,
	`picture` text NOT NULL,
	`enum_realm` integer NOT NULL,
	`intelligence` integer NOT NULL,
	`current_life` integer NOT NULL,
	`max_life` integer NOT NULL,
	`message` text NOT NULL,
	`enum_god` integer NOT NULL,
	`enum_magic_type` integer NOT NULL,
	`sphere` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `favoris` (
	`id` integer PRIMARY KEY NOT NULL,
	`character_id` integer NOT NULL,
	`character_favoris_id` integer NOT NULL,
	FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`character_favoris_id`) REFERENCES `characters`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `group_characters` (
	`id` integer PRIMARY KEY NOT NULL,
	`group_id` integer NOT NULL,
	`character_id` integer NOT NULL,
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `group_enemies` (
	`id` integer PRIMARY KEY NOT NULL,
	`group_id` integer NOT NULL,
	`enemy_id` integer NOT NULL,
	`type` integer NOT NULL,
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` integer PRIMARY KEY NOT NULL,
	`creator_id` integer NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`creator_id`) REFERENCES `characters`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `monster_spells` (
	`id` integer PRIMARY KEY NOT NULL,
	`mob_id` integer NOT NULL,
	`enum_spell` integer NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`mob_id`) REFERENCES `monsters`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `monsters` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`enum_mob` integer NOT NULL,
	`name` text NOT NULL,
	`current_life` integer DEFAULT 100 NOT NULL,
	`max_life` integer DEFAULT 100 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `player_spells` (
	`id` integer PRIMARY KEY NOT NULL,
	`player_id` integer NOT NULL,
	`enum_spell` integer NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `characters`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`mail` text NOT NULL,
	`password` text NOT NULL,
	`date` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `characters_name_unique` ON `characters` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_mail_unique` ON `users` (`mail`);