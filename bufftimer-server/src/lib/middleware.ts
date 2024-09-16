import { Context, Next } from 'hono';
import { initializeLucia } from './lucia';
import { getCookie } from 'hono/cookie';

export const authMiddleware = async (c: Context, next: Next) => {
	const lucia = initializeLucia(c.env.DB);

	const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;
	if (!sessionId) {
		c.set('user', null);
		c.set('session', null);
		return next();
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		c.header('Set-Cookie', lucia.createSessionCookie(session.id).serialize(), { append: true });
	}
	if (!session) {
		c.header('Set-Cookie', lucia.createBlankSessionCookie().serialize(), { append: true });
	}
	c.set('session', session);
	c.set('user', user);
	return next();
};
