import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { Bindings, Variables } from '../lib/bindings';

const usersRoute = new Hono<{ Bindings: Bindings; Variables: Variables }>();

usersRoute
	.get('/', async (c) => {
		const user = c.get('user');
		if (!user) {
			return c.json({ error: 'Veuillez vous connecter !' }, 404);
		}
		const db = drizzle(c.env.DB);
		const resp = await db.select().from(users).where(eq(users.id, user.id));

		if (resp.length > 0) {
			const { password, ...userWithoutPassword } = resp[0];
			return c.json(userWithoutPassword);
		}

		return c.json({ error: 'Utilisateur non trouvé' }, 404);
	})
	// .post('/', async (c) => {
	// 	try {
	// 		const db = drizzle(c.env.DB);
	// 		const user = await c.req.json();
	// 		user.password = bcrypt.hashSync(user.password, 10);
	// 		const resp = await db.insert(users).values(user).returning();
	// 		return c.json(resp, 200);
	// 	} catch (error) {
	// 		console.error("Erreur lors de la création de l'utilisateur:", error);
	// 		if (error instanceof Error && error.message.includes('UNIQUE constraint failed: users.mail')) {
	// 			return c.json({ error: 'Cet email est déjà utilisé.' }, 400);
	// 		}
	// 		return c.json({ error: "Une erreur s'est produite lors de la création de l'utilisateur." }, 500);
	// 	}
	// })
	.patch('/', async (c) => {
		try {
			const isUser = c.get('user');
			if (!isUser) {
				return c.json({ msg: 'Veuillez vous connecter !' });
			}
			const db = drizzle(c.env.DB);
			const user = await db.select().from(users).where(eq(users.id, isUser.id));
			const { password, updated_user } = await c.req.json();
			console.log(password);
			const validPassword = bcrypt.compareSync(password, user[0].password);
			if (!validPassword) {
				return c.json({ error: 'Invalid password.' }, 400);
			}
			if (updated_user.password) {
				updated_user.password = bcrypt.hashSync(updated_user.password, 10);
			}

			const resp = await db.update(users).set(updated_user).where(eq(users.id, isUser.id)).returning();

			if (resp.length > 0) {
				return c.json(resp[0], 200);
			} else {
				return c.json({ error: 'Aucune modification effectuée.' }, 400);
			}
		} catch (error) {
			console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
			return c.json({ error: "Une erreur s'est produite lors de la mise à jour de l'utilisateur." }, 500);
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
			const resp = await db.delete(users).where(eq(users.id, id)).returning();
			if (resp.length > 0) {
				return c.json({ msg: 'Utilisateur correctement supprimé !' }, 200);
			} else {
				return c.json({ error: 'Aucune modification effectuée.' }, 400);
			}
		} catch (error) {
			console.log(error);
		}
	});

export default usersRoute;
