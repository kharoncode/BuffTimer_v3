import { Spell } from './spell';

export type Character = {
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
	spells: Spell[];
};
