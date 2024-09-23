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
	admin: integer('admin', { mode: 'boolean' }).notNull(),
});

const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull(),
});

const characters = sqliteTable('characters', {
	id: integer('id').primaryKey(),
	name: text('name').notNull().unique(),
	picture: text('picture').notNull(),
	realm: integer('realm').notNull(),
	intelligence: integer('intelligence').notNull(),
	current_life: integer('current_life').notNull(),
	max_life: integer('max_life').notNull(),
	message: text('message').notNull(),
	enum_god: integer('enum_god').notNull(),
	enum_magic_type: integer('enum_magic_type').notNull(),
	sphere: integer('sphere').notNull(),
	favoris: text('favoris').notNull().default(''),
});

const monsters = sqliteTable('monsters', {
	id: integer('id').primaryKey(),
	enum_mob: integer('enum_mob').notNull(),
	name: text('name').notNull(),
	current_life: integer('current_life').notNull().default(100),
	max_life: integer('max_life').notNull().default(100),
});

const player_spells = sqliteTable('player_spells', {
	id: integer('id').primaryKey(),
	playerId: integer('player_id')
		.notNull()
		.references(() => characters.id),
	enum_spell: integer('enum_spell').notNull(),
	created_at: text('created_at')
		.notNull()
		.default(sql`(current_timestamp)`),
	expires_At: text('expires_at').notNull(),
});

const monster_spells = sqliteTable('monster_spells', {
	id: integer('id').primaryKey(),
	mobId: integer('mob_id')
		.notNull()
		.references(() => monsters.id),
	enum_spell: integer('enum_spell').notNull(),
	created_at: text('created_at')
		.notNull()
		.default(sql`(current_timestamp)`),
	expires_At: text('expires_at').notNull(),
});

const groups = sqliteTable('groups', {
	id: integer('id').primaryKey(),
	creator_id: integer('creator_id')
		.notNull()
		.references(() => characters.id),
	name: text('name').notNull(),
});

const group_characters = sqliteTable('group_characters', {
	id: integer('id').primaryKey(),
	group_id: integer('group_id')
		.notNull()
		.references(() => groups.id),
	character_id: integer('character_id')
		.notNull()
		.references(() => characters.id),
});

const group_enemies = sqliteTable('group_enemies', {
	id: integer('id').primaryKey(),
	group_id: integer('group_id')
		.notNull()
		.references(() => groups.id),
	enemy_id: integer('enemy_id').notNull(),
	type: integer('type').notNull(),
});

const favoris = sqliteTable('favoris', {
	id: integer('id').primaryKey(),
	character_id: integer('character_id')
		.notNull()
		.references(() => characters.id),
	character_favoris_id: integer('character_favoris_id')
		.notNull()
		.references(() => characters.id),
});

export { users, sessions, characters, monsters, player_spells, monster_spells, groups, group_characters, group_enemies, favoris };
