import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { characters, group_characters, group_enemies, favoris, monsters } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { Bindings, Variables } from '../lib/bindings';

const favorisRoute = new Hono<{ Bindings: Bindings; Variables: Variables }>();

favorisRoute
	.get('/', async (c) => {
		const user = c.get('user');
		if (!user) {
			return c.json({ error: 'Veuillez vous connecter !' }, 404);
		}
		const db = drizzle(c.env.DB);
		const character_id = Number(c.req.query('id'));
		if (character_id) {
			const resp = await db
				.select({
					character: characters,
					favoris_id: favoris.id,
				})
				.from(favoris)
				.leftJoin(characters, eq(favoris.character_favoris_id, characters.id))
				.where(eq(favoris.character_id, character_id));

			return c.json(resp, 200);
		} else {
			return c.json({ error: 'Un id est requis !' });
		}
	})
	.post('/addCharacter', async (c) => {
		try {
			const user = c.get('user');
			if (!user) {
				return c.json({ error: 'Veuillez vous connecter !' }, 404);
			}
			const db = drizzle(c.env.DB);
			const character_favoris = await c.req.json();
			const resp = await db.insert(favoris).values(character_favoris).returning();
			return c.json(resp, 200);
		} catch (error) {
			console.error("Erreur lors de l'ajout d'un personnage dans les favoris:", error);
			return c.json({ error: "Une erreur s'est produite lors de l'ajout d'un personnage dans les favoris." }, 500);
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
			const resp = await db.delete(favoris).where(eq(favoris.id, id)).returning();
			if (resp.length > 0) {
				return c.json({ msg: 'Favoris correctement supprimé !' }, 200);
			} else {
				return c.json({ error: 'Aucune modification effectuée.' }, 400);
			}
		} catch (error) {
			console.log(error);
		}
	});

export default favorisRoute;
