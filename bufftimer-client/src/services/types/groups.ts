import { Character } from './character';
import { Monster } from './monster';

export type Group = {
	group_id: number;
	creator_id: number;
	group_name: string;
};

export type Group_Show = {
	id: number;
	characters: { character: Character; group_characters_id: number }[];
	enemies: {
		characters: Character[];
		monsters: Monster[];
	};
};
