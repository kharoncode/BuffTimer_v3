-- Suppression correcte de la table 'characters' si elle existe
DROP TABLE IF EXISTS `characters`;

-- Création de la table 'characters' avec la clé étrangère 'user_id'
CREATE TABLE `characters` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
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
	`favoris` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE NO ACTION ON DELETE NO ACTION -- Pas de virgule ici
);

-- Création de la table 'favoris' avec les clés étrangères
CREATE TABLE `favoris` (
	`id` integer PRIMARY KEY NOT NULL,
	`character_id` integer NOT NULL,
	`character_favoris_id` integer NOT NULL,
	FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	FOREIGN KEY (`character_favoris_id`) REFERENCES `characters`(`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
);
