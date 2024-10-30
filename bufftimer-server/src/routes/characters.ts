import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { character_spells, characters } from '../db/schema';
import { eq, and, ne, inArray, lt } from 'drizzle-orm';
import { Bindings, Variables } from '../lib/bindings';

const charactersRoute = new Hono<{ Bindings: Bindings; Variables: Variables }>();

charactersRoute
	.get('/', async (c) => {
		const user = c.get('user');
		if (!user) {
			return c.json({ error: 'Veuillez vous connecter !' }, 404);
		}
		const db = drizzle(c.env.DB);
		const character_id = Number(c.req.query('id'));
		if (character_id) {
			const resp = await db
				.select()
				.from(characters)
				.where(and(eq(characters.user_id, user.id), eq(characters.id, character_id)));

			if (resp.length === 0) {
				return c.json({ error: 'Personnage introuvable ou non autorisé.' }, 404);
			} else {
				const characterSpellsList = await db.select().from(character_spells).where(eq(character_spells.character_id, character_id));
				const character = { ...resp[0], spells: characterSpellsList };

				const realm_charactersRowList = await db
					.select()
					.from(characters)
					.where(and(eq(characters.enum_realm, character.enum_realm), ne(characters.id, character.id)))
					.orderBy(characters.name);
				const spellsList = await db
					.select()
					.from(character_spells)
					.where(
						inArray(
							character_spells.character_id,
							realm_charactersRowList.map((character) => character.id)
						)
					);
				const realm_characters = realm_charactersRowList.map((character) => {
					const spells = spellsList.filter((spell) => spell.character_id === character.id);
					return { ...character, spells: spells };
				});
				return c.json({ character: character, characterRealmList: realm_characters });
			}
		} else {
			return c.json({ error: 'Un id est requis !' });
		}
	})
	.get('/user', async (c) => {
		const user = c.get('user');
		if (!user) {
			return c.json({ error: 'Veuillez vous connecter !' }, 404);
		}
		const db = drizzle(c.env.DB);
		const charactersList = await db.select().from(characters).where(eq(characters.user_id, user.id)).orderBy(characters.name);

		const currentTime = Date.now();
		await db.delete(character_spells).where(lt(character_spells.expires_at, currentTime));

		const spellsList = await db
			.select()
			.from(character_spells)
			.where(
				inArray(
					character_spells.character_id,
					charactersList.map((character) => character.id)
				)
			);
		const resp = charactersList.map((character) => {
			const spells = spellsList.filter((spell) => spell.character_id === character.id);
			return { ...character, spells: spells };
		});
		return c.json(resp);
	})
	.get('/all', async (c) => {
		const user = c.get('user');
		if (!user) {
			return c.json({ error: 'Veuillez vous connecter !' }, 404);
		}
		const db = drizzle(c.env.DB);

		const charactersList = await db.select().from(characters).orderBy(characters.name);
		const spellsList = await db
			.select()
			.from(character_spells)
			.where(
				inArray(
					character_spells.character_id,
					charactersList.map((character) => character.id)
				)
			);
		const resp = charactersList.map((character) => {
			const spells = spellsList.filter((spell) => spell.character_id === character.id);
			return { ...character, spells: spells };
		});
		return c.json(resp);
	})
	.post('/', async (c) => {
		try {
			const user = c.get('user');
			if (!user) {
				return c.json({ error: 'Veuillez vous connecter !' }, 404);
			}
			const db = drizzle(c.env.DB);
			const character = await c.req.json();
			character.user_id = user.id;
			character.current_life = character.max_life;
			console.log(character);
			const resp = await db.insert(characters).values(character).returning();
			return c.json(resp, 200);
		} catch (error) {
			console.error("Erreur lors de la création de l'utilisateur:", error);
			if (error instanceof Error && error.message.includes('UNIQUE constraint failed: characters.mail')) {
				return c.json({ error: 'Cet email est déjà utilisé.' }, 400);
			}
			return c.json({ error: "Une erreur s'est produite lors de la création de l'utilisateur." }, 500);
		}
	})
	.patch('/', async (c) => {
		try {
			const isUser = c.get('user');
			if (!isUser) {
				return c.json({ msg: 'Veuillez vous connecter !' });
			}
			const db = drizzle(c.env.DB);
			const { id, update_character } = await c.req.json();
			if (!id) {
				return c.json({ error: 'Un ID est requis.' }, 400);
			}

			const resp = await db.update(characters).set(update_character).where(eq(characters.id, id)).returning();

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
			const resp = await db
				.delete(characters)
				.where(and(eq(characters.user_id, user.id), eq(characters.id, id)))
				.returning();
			if (resp.length > 0) {
				return c.json({ msg: 'Utilisateur correctement supprimé !' }, 200);
			} else {
				return c.json({ error: 'Aucune modification effectuée.' }, 400);
			}
		} catch (error) {
			console.log(error);
		}
	});

export default charactersRoute;
