import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Bindings, Variables } from './lib/bindings';
import { authMiddleware } from './lib/middleware';
import { csrf } from 'hono/csrf';
import usersRoute from './routes/users';
import authRoute from './routes/auth';
import charactersRoute from './routes/characters';
import monstersRoute from './routes/monsters';
import characterSpellsRoute from './routes/spells';

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();
app.use('*', (c, next) => {
	return cors({
		origin: c.env.CORS_ORIGIN,
		credentials: true,
		allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
		allowHeaders: ['content-type'],
	})(c, next);
});

app.use(csrf());
app.use('*', authMiddleware);

app.get('/', (c) => {
	const user = c.get('user');
	const session = c.get('session');
	return c.json({ msg: 'Welcome !', user: user, session: session });
});

app.route('/users', usersRoute);
app.route('/auth', authRoute);
app.route('/characters', charactersRoute);
app.route('/monsters', monstersRoute);
app.route('/character-spells', characterSpellsRoute);

app.get('/', (c) => {
	return c.json({ msg: 'Welcome in BuffTimer !' });
});

export default app;
