export const enum_realm = {
	rdk: 1,
	ek: 2,
	pe: 3,
	ca: 4,
	uh: 5,
	neutre: 6,
	ToString: (value: number): string | undefined => {
		const str = [
			undefined,
			'Royaume de Keldar',
			'Empire de Khor',
			'Peuple Elfe',
			'Confédération Arténienne',
			'Union de Hâvrebois',
			'Apatrides et Guildés',
		];
		return str[value];
	},
};

export const enum_species = {
	orc: 1,
	human: 2,
	elf: 3,
	ToString: (value: number): string | undefined => {
		const str = [undefined, 'Orc', 'Humain', 'Elfe'];
		return str[value];
	},
};
