CREATE TABLE `spells` (
	`id` integer PRIMARY KEY NOT NULL,
	`player_id` integer NOT NULL,
	`enum_spell` integer NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mobs` (
	`id` integer PRIMARY KEY NOT NULL,
	`enum_mob` integer NOT NULL,
	`name` text NOT NULL,
	`current_life` integer DEFAULT 100 NOT NULL,
	`max_life` integer DEFAULT 100 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`picture` text NOT NULL,
	`realm` integer NOT NULL,
	`intelligence` integer NOT NULL,
	`current_life` integer NOT NULL,
	`max_life` integer NOT NULL,
	`message` text NOT NULL,
	`enum_god` integer NOT NULL,
	`enum_magic_type` integer NOT NULL,
	`sphere` integer NOT NULL,
	`favoris` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`mail` text NOT NULL,
	`password` text NOT NULL,
	`date` text DEFAULT (current_timestamp) NOT NULL,
	`admin` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `players_name_unique` ON `players` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_mail_unique` ON `users` (`mail`);