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

const players = sqliteTable('players', {
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

const mobs = sqliteTable('mobs', {
	id: integer('id').primaryKey(),
	enum_mob: integer('enum_mob').notNull(),
	name: text('name').notNull(),
	current_life: integer('current_life').notNull().default(100),
	max_life: integer('max_life').notNull().default(100),
});

const player_spells = sqliteTable('spells', {
	id: integer('id').primaryKey(),
	playerId: integer('player_id')
		.notNull()
		.references(() => players.id),
	enum_spell: integer('enum_spell').notNull(),
	created_at: text('created_at')
		.notNull()
		.default(sql`(current_timestamp)`),
	expires_At: text('expires_at').notNull(),
});

const mob_spells = sqliteTable('spells', {
	id: integer('id').primaryKey(),
	mobId: integer('mob_id')
		.notNull()
		.references(() => mobs.id),
	enum_spell: integer('enum_spell').notNull(),
	created_at: text('created_at')
		.notNull()
		.default(sql`(current_timestamp)`),
	expires_At: text('expires_at').notNull(),
});

export { users, sessions, players, mobs, player_spells, mob_spells };
