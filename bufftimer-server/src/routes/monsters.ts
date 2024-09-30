import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { monsters } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { Bindings, Variables } from '../lib/bindings';

const monstersRoute = new Hono<{ Bindings: Bindings; Variables: Variables }>();

monstersRoute
	.get('/', async (c) => {
		const user = c.get('user');
		if (!user) {
			return c.json({ error: 'Veuillez vous connecter !' }, 404);
		}
		const db = drizzle(c.env.DB);
		const monsterId = Number(c.req.query('id'));
		if (monsterId) {
			const resp = await db
				.select()
				.from(monsters)
				.where(and(eq(monsters.user_id, user.id), eq(monsters.id, monsterId)));

			if (resp.length === 0) {
				return c.json({ error: 'Personnage introuvable ou non autorisé.' }, 404);
			}

			return c.json(resp[0]);
		} else {
			const resp = await db.select().from(monsters).where(eq(monsters.user_id, user.id));

			return c.json(resp);
		}
	})
	.post('/', async (c) => {
		try {
			const user = c.get('user');
			if (!user) {
				return c.json({ error: 'Veuillez vous connecter !' }, 404);
			}
			const db = drizzle(c.env.DB);
			const monster = await c.req.json();
			monster.user_id = user.id;
			const resp = await db.insert(monsters).values(monster).returning();
			return c.json(resp, 200);
		} catch (error) {
			console.error("Erreur lors de la création de l'utilisateur:", error);
			if (error instanceof Error && error.message.includes('UNIQUE constraint failed: monsters.mail')) {
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
			const { id, update_monster } = await c.req.json();
			if (!id) {
				return c.json({ error: 'Un ID est requis.' }, 400);
			}

			const resp = await db.update(monsters).set(update_monster).where(eq(monsters.id, id)).returning();

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
				.delete(monsters)
				.where(and(eq(monsters.user_id, user.id), eq(monsters.id, id)))
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

export default monstersRoute;
