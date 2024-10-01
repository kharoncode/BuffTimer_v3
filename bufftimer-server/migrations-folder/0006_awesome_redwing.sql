CREATE TABLE `character_spells` (
	`id` integer PRIMARY KEY NOT NULL,
	`character_id` integer NOT NULL,
	`enum_spell` integer NOT NULL,
	`created_at` integer DEFAULT 1727806989502 NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `monster_spells` (
	`id` integer PRIMARY KEY NOT NULL,
	`mob_id` integer NOT NULL,
	`enum_spell` integer NOT NULL,
	`created_at` integer DEFAULT 1727806989502 NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`mob_id`) REFERENCES `monsters`(`id`) ON UPDATE no action ON DELETE cascade
);
