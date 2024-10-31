import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { characters, group_characters, group_enemies, favoris, monsters, character_spells } from '../db/schema';
import { eq, and, inArray } from 'drizzle-orm';
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
			let resp: {
				character: {
					id: number;
					user_id: number;
					name: string;
					picture: string;
					enum_realm: number;
					intelligence: number;
					current_life: number;
					max_life: number;
					message: string;
					enum_god: number;
					enum_magic_type: number;
					sphere: number;
				};
				favoris_id: number;
			}[] = [];
			const favorisCharacterList = await db
				.select({
					character: characters,
					favoris_id: favoris.id,
				})
				.from(favoris)
				.innerJoin(characters, eq(favoris.character_favoris_id, characters.id))
				.where(eq(favoris.character_id, character_id))
				.orderBy(characters.name);

			if (favorisCharacterList.length > 0) {
				const spellsList = await db
					.select()
					.from(character_spells)
					.where(
						inArray(
							character_spells.character_id,
							favorisCharacterList.map((character) => character.character.id)
						)
					);
				resp = favorisCharacterList.map((character) => {
					const spells = spellsList.filter((spell) => spell.character_id === character.character.id);
					return { ...character, character: { ...character.character, spells: spells } };
				});
			}
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
