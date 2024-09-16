import { Lucia, TimeSpan } from 'lucia';
import { D1Adapter } from '@lucia-auth/adapter-sqlite';
import { D1Database } from '@cloudflare/workers-types';
import { DatabaseUser } from './db';

export const initializeLucia = (D1: D1Database) => {
	const adapter = new D1Adapter(D1, {
		user: 'users',
		session: 'sessions',
	});

	const lucia = new Lucia(adapter, {
		sessionExpiresIn: new TimeSpan(1, 'd'),
		sessionCookie: {
			attributes: {
				secure: true,
				sameSite: 'none',
				path: '/',
			},
		},
		getUserAttributes: (attributes) => {
			return {
				username: attributes.username,
			};
		},
	});

	return lucia;
};

declare module 'lucia' {
	interface Register {
		Lucia: ReturnType<typeof initializeLucia>;
		UserId: number;
		DatabaseUserAttributes: DatabaseUser;
	}
}
