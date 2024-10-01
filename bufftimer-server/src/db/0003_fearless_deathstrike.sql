CREATE TABLE `character_spells` (
	`id` integer PRIMARY KEY NOT NULL,
	`character_id` integer NOT NULL,
	`enum_spell` integer NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON UPDATE no action ON DELETE cascade
);
