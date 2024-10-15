import { Hono } from 'hono';
import { Bindings, Variables } from '../lib/bindings';
import { drizzle } from 'drizzle-orm/d1';
import { sessions, users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { initializeLucia } from '../lib/lucia';

const authRoute = new Hono<{ Bindings: Bindings; Variables: Variables }>();

authRoute.post('/login', async (c) => {
	const db = drizzle(c.env.DB);
	const { login, password } = await c.req.json();

	const user = await db.select().from(users).where(eq(users.username, login)).limit(1);
	if (!user[0]) {
		return c.json({ error: 'Invalid username or password.' }, 400);
	}

	const validPassword = bcrypt.compareSync(password, user[0].password);
	if (!validPassword) {
		return c.json({ error: 'Invalid username or password.' }, 400);
	}

	const lucia = initializeLucia(c.env.DB);
	const session = await lucia.createSession(user[0].id, {});
	const cookie = lucia.createSessionCookie(session.id);

	c.header('Set-Cookie', cookie.serialize(), { append: true });

	return c.json({ result: true });
});

authRoute.post('/signup', async (c) => {
	try {
		const db = drizzle(c.env.DB);
		const user = await c.req.json();
		user.password = bcrypt.hashSync(user.password, 10);
		const resp = await db.insert(users).values(user).returning();

		const lucia = initializeLucia(c.env.DB);
		const session = await lucia.createSession(resp[0].id, {});
		const cookie = lucia.createSessionCookie(session.id);

		c.header('Set-Cookie', cookie.serialize(), { append: true });
		return c.json(resp, 200);
	} catch (error) {
		console.error("Erreur lors de la création de l'utilisateur:", error);
		if (error instanceof Error && error.message.includes('UNIQUE constraint failed: users.mail')) {
			return c.json({ error: 'Cet email est déjà utilisé.' }, 400);
		}
		if (error instanceof Error && error.message.includes('UNIQUE constraint failed: users.username')) {
			return c.json({ error: 'Cet username est déjà utilisé.' }, 400);
		}
		return c.json({ error: "Une erreur s'est produite lors de la création de l'utilisateur." }, 500);
	}
});

authRoute.post('/logout', async (c) => {
	console.log('test');
	try {
		const db = drizzle(c.env.DB);
		const lucia = initializeLucia(c.env.DB);
		const session = c.get('session');
		if (session) {
			await lucia.invalidateSession(session.id);
			await db.delete(sessions).where(eq(sessions.id, session.id)).returning();
			const cookie = lucia.createBlankSessionCookie();
			c.header('Set-Cookie', cookie.serialize(), { append: true });

			return c.json({ isAuth: false });
		} else {
			return c.json({ error: 'Unauthorized' }, 401);
		}
	} catch (error) {
		console.error('Logout error:', error);
		return c.json({ error: 'Internal Server Error' }, { status: 500 });
	}
});

authRoute.get('/check-auth', async (c) => {
	const session = c.get('session');
	if (session) {
		return c.json({ isAuth: true });
	} else {
		return c.json({ isAuth: false });
	}
});

export default authRoute;
