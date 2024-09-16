import { Session, User } from 'lucia';

export type Bindings = {
	DB: D1Database;
	CORS_ORIGIN: string;
};

export type Variables = {
	user: User | null;
	session: Session | null;
};
