import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { characters } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { Bindings, Variables } from '../lib/bindings';

const charactersRoute = new Hono<{ Bindings: Bindings; Variables: Variables }>();

charactersRoute
	.get('/', async (c) => {
		const user = c.get('user');
		if (!user) {
			return c.json({ error: 'Veuillez vous connecter !' }, 404);
		}
		const db = drizzle(c.env.DB);
		//const resp = await db.select().from(characters);
		const resp = await db.select().from(characters).where(eq(characters.user_id, user.id));
		console.log(resp);
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
			const isUser = c.get('user');
			if (!isUser) {
				return c.json({ msg: 'Veuillez vous connecter !' });
			}
			const db = drizzle(c.env.DB);
			const { id } = await c.req.json();
			if (!id) {
				return c.json({ error: 'Un ID est requis.' }, 400);
			}
			const resp = await db.delete(characters).where(eq(characters.id, id)).returning();
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
