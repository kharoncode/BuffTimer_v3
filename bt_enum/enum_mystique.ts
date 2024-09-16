export const enum_god = {
	aldmenir: 1,
	azolth: 2,
	dallia: 3,
	delemia: 4,
	karkh: 5,
	keldar: 6,
	elduniel: 7,
	galmaniel: 8,
	lorikiel: 9,
	shadaliel: 9,
	ulmidiel: 10,
	velaniel: 11,
	ghornag: 12,
	khelnor: 13,
	koskhun: 14,
	otharn: 15,
	rasgor: 16,
	sarokha: 17,
	ToString: (value: number): string | undefined => {
		const str = [
			undefined,
			'Aldménir',
			'Azolth',
			'Dallia',
			'Délémia',
			'Karkh',
			'Keldar',
			'Elduniel',
			'Galmaniel',
			'Lorikiel',
			'Shadaliel',
			'Ulmidiel',
			'Vélaniel',
			'Ghornag',
			'Khelnor',
			'Koskhûn',
			'Otharn',
			'Rasgor',
			'Sarokha',
		];
		return str[value];
	},
};

export const enum_sphere = {
	protection: 1,
	vitalite: 2,
	destruction: 3,
	negation: 4,
	alteration: 5,
	ToString: (value: number): string | undefined => {
		const str = [undefined, 'Protection', 'Vitalité', 'Destruction', 'Négation', 'Altération'];
		return str[value];
	},
};

export const enum_magic_type = {
	profane: 1,
	divine: 2,
	ToString: (value: number): string | undefined => {
		const str = [undefined, 'Magie Profane', 'Magie Divine'];
		return str[value];
	},
};

export const enum_spell = {
	nature: 1,
	ToString: (value: number): string | undefined => {
		const str = [undefined, 'nature'];
		return str[value];
	},
};
