import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	username: text('username').notNull().unique(),
	mail: text('mail').notNull().unique(),
	password: text('password').notNull(),
	date: text('date')
		.notNull()
		.default(sql`(current_timestamp)`),
});

const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at').notNull(),
});

const characters = sqliteTable('characters', {
	id: integer('id').primaryKey(),
	user_id: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	name: text('name').notNull().unique(),
	picture: text('picture').notNull(),
	enum_realm: integer('enum_realm').notNull(),
	intelligence: integer('intelligence').notNull(),
	current_life: integer('current_life').notNull(),
	max_life: integer('max_life').notNull(),
	message: text('message').notNull(),
	enum_god: integer('enum_god').notNull(),
	enum_magic_type: integer('enum_magic_type').notNull(),
	sphere: integer('sphere').notNull(),
});

const monsters = sqliteTable('monsters', {
	id: integer('id').primaryKey(),
	user_id: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	enum_mob: integer('enum_mob').notNull(),
	name: text('name').notNull(),
	current_life: integer('current_life').notNull().default(100),
	max_life: integer('max_life').notNull().default(100),
});

const character_spells = sqliteTable('character_spells', {
	id: integer('id').primaryKey(),
	character_id: integer('character_id')
		.notNull()
		.references(() => characters.id, { onDelete: 'cascade' }),
	enum_spell: integer('enum_spell').notNull(),
	created_at: integer('created_at')
		.notNull()
		.default(sql`(unixepoch()*1000)`),
	expires_at: integer('expires_at').notNull(),
});

const monster_spells = sqliteTable('monster_spells', {
	id: integer('id').primaryKey(),
	mob_id: integer('mob_id')
		.notNull()
		.references(() => monsters.id, { onDelete: 'cascade' }),
	enum_spell: integer('enum_spell').notNull(),
	created_at: integer('created_at')
		.notNull()
		.default(sql`(unixepoch()*1000)`),
	expires_at: integer('expires_at').notNull(),
});

const groups = sqliteTable('groups', {
	id: integer('id').primaryKey(),
	creator_id: integer('creator_id')
		.notNull()
		.references(() => characters.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
});

const group_characters = sqliteTable('group_characters', {
	id: integer('id').primaryKey(),
	group_id: integer('group_id')
		.notNull()
		.references(() => groups.id, { onDelete: 'cascade' }),
	character_id: integer('character_id')
		.notNull()
		.references(() => characters.id, { onDelete: 'cascade' }),
});

const group_enemies = sqliteTable('group_enemies', {
	id: integer('id').primaryKey(),
	group_id: integer('group_id')
		.notNull()
		.references(() => groups.id, { onDelete: 'cascade' }),
	enemy_id: integer('enemy_id').notNull(),
	type: integer('type').notNull(),
});

const favoris = sqliteTable('favoris', {
	id: integer('id').primaryKey(),
	character_id: integer('character_id')
		.notNull()
		.references(() => characters.id, { onDelete: 'cascade' }),
	character_favoris_id: integer('character_favoris_id')
		.notNull()
		.references(() => characters.id, { onDelete: 'cascade' }),
});

export { users, sessions, characters, monsters, character_spells, monster_spells, groups, group_characters, group_enemies, favoris };
