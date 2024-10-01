import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { monster_spells } from '../db/schema';
import { eq, and, lt } from 'drizzle-orm';
import { Bindings, Variables } from '../lib/bindings';

const monsterSpellsRoute = new Hono<{ Bindings: Bindings; Variables: Variables }>();

monsterSpellsRoute
	.get('/', async (c) => {
		const user = c.get('user');
		if (!user) {
			return c.json({ error: 'Veuillez vous connecter !' }, 404);
		}
		const db = drizzle(c.env.DB);
		const mob_id = Number(c.req.query('id'));
		if (mob_id) {
			const currentTime = Date.now();
			await db.delete(monster_spells).where(and(eq(monster_spells.mob_id, mob_id), lt(monster_spells.expires_at, currentTime)));
			const resp = await db.select().from(monster_spells).where(eq(monster_spells.mob_id, mob_id));

			return c.json(resp);
		} else {
			return c.json({ error: 'Veuillez fournir un ID !' }, 404);
		}
	})
	.post('/', async (c) => {
		try {
			const user = c.get('user');
			if (!user) {
				return c.json({ error: 'Veuillez vous connecter !' }, 404);
			}
			const db = drizzle(c.env.DB);
			const spell = await c.req.json();
			const isSpell = await db
				.select()
				.from(monster_spells)
				.where(and(eq(monster_spells.enum_spell, spell.enum_spell), eq(monster_spells.mob_id, spell.mob_id)));
			if (isSpell[0]) {
				const resp = await db.update(monster_spells).set(spell).where(eq(monster_spells.id, isSpell[0].id)).returning();
				return c.json(resp, 200);
			} else {
				const resp = await db.insert(monster_spells).values(spell).returning();
				return c.json(resp, 200);
			}
		} catch (error) {
			console.error('Erreur lors de la création du sort:', error);
			return c.json({ error: "Une erreur s'est produite lors de la création du sort." }, 500);
		}
	})
	.patch('/', async (c) => {
		try {
			const isUser = c.get('user');
			if (!isUser) {
				return c.json({ msg: 'Veuillez vous connecter !' });
			}
			const db = drizzle(c.env.DB);
			const { id, update_spell } = await c.req.json();
			if (!id) {
				return c.json({ error: 'Un ID est requis.' }, 400);
			}

			const resp = await db.update(monster_spells).set(update_spell).where(eq(monster_spells.id, id)).returning();

			if (resp.length > 0) {
				return c.json(resp[0], 200);
			} else {
				return c.json({ error: 'Aucune modification effectuée.' }, 400);
			}
		} catch (error) {
			console.error('Erreur lors de la mise à jour : ', error);
			return c.json({ error: "Une erreur s'est produite lors de la mise à jour." }, 500);
		}
	})
	.delete('/', async (c) => {
		try {
			const user = c.get('user');
			if (!user) {
				return c.json({ msg: 'Veuillez vous connecter !' });
			}
			const db = drizzle(c.env.DB);
			const { id } = await c.req.json();
			if (!id) {
				return c.json({ error: 'Un ID est requis.' }, 400);
			}
			const resp = await db.delete(monster_spells).where(eq(monster_spells.id, id)).returning();
			if (resp.length > 0) {
				return c.json(resp, 200);
			} else {
				return c.json({ error: 'Aucune modification effectuée.' }, 400);
			}
		} catch (error) {
			console.log(error);
		}
	});

export default monsterSpellsRoute;
