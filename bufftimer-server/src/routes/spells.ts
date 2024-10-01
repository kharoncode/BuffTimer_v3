import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { character_spells } from '../db/schema';
import { eq } from 'drizzle-orm';
import { Bindings, Variables } from '../lib/bindings';

const characterSpellsRoute = new Hono<{ Bindings: Bindings; Variables: Variables }>();

characterSpellsRoute
	.get('/', async (c) => {
		const user = c.get('user');
		if (!user) {
			return c.json({ error: 'Veuillez vous connecter !' }, 404);
		}
		const db = drizzle(c.env.DB);
		const character_id = Number(c.req.param('id'));
		if (character_id) {
			const resp = await db.select().from(character_spells).where(eq(character_spells.character_id, character_id));

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
			const resp = await db.insert(character_spells).values(spell).returning();
			return c.json(resp, 200);
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

			const resp = await db.update(character_spells).set(update_spell).where(eq(character_spells.id, id)).returning();

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
			const resp = await db.delete(character_spells).where(eq(character_spells.id, id)).returning();
			if (resp.length > 0) {
				return c.json({ msg: 'Spell correctement supprimé !' }, 200);
			} else {
				return c.json({ error: 'Aucune modification effectuée.' }, 400);
			}
		} catch (error) {
			console.log(error);
		}
	});

export default characterSpellsRoute;
