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
	shadaliel: 10,
	ulmidiel: 11,
	velaniel: 12,
	ghornag: 13,
	khelnor: 14,
	koskhun: 15,
	otharn: 16,
	rasgor: 17,
	sarokha: 18,
	nature: 19,
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
			'Nature',
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
	justice: 6,
	ToString: (value: number): string | undefined => {
		const str = [undefined, 'Protection', 'Vitalité', 'Destruction', 'Négation', 'Altération', 'Justice'];
		return str[value];
	},
};

export const enum_god_sphere = {
	[enum_god.nature]: [enum_sphere.protection, enum_sphere.vitalite],
	[enum_god.elduniel]: [enum_sphere.protection, enum_sphere.vitalite, enum_sphere.destruction],
	[enum_god.galmaniel]: [enum_sphere.protection, enum_sphere.vitalite, enum_sphere.alteration],
	[enum_god.lorikiel]: [enum_sphere.protection, enum_sphere.vitalite, enum_sphere.alteration],
	[enum_god.shadaliel]: [enum_sphere.protection, enum_sphere.negation, enum_sphere.alteration],
	[enum_god.ulmidiel]: [enum_sphere.protection, enum_sphere.vitalite, enum_sphere.alteration],
	[enum_god.velaniel]: [enum_sphere.vitalite, enum_sphere.destruction],
	[enum_god.aldmenir]: [enum_sphere.protection, enum_sphere.vitalite, enum_sphere.alteration],
	[enum_god.azolth]: [enum_sphere.protection, enum_sphere.negation, enum_sphere.alteration],
	[enum_god.dallia]: [enum_sphere.protection, enum_sphere.vitalite, enum_sphere.alteration],
	[enum_god.delemia]: [enum_sphere.protection, enum_sphere.negation, enum_sphere.alteration],
	[enum_god.karkh]: [enum_sphere.protection, enum_sphere.vitalite, enum_sphere.destruction],
	[enum_god.keldar]: [enum_sphere.protection, enum_sphere.negation, enum_sphere.justice],
	[enum_god.ghornag]: [enum_sphere.protection, enum_sphere.vitalite, enum_sphere.destruction],
	[enum_god.khelnor]: [enum_sphere.protection, enum_sphere.negation, enum_sphere.alteration],
	[enum_god.koskhun]: [enum_sphere.protection, enum_sphere.negation, enum_sphere.alteration],
	[enum_god.otharn]: [enum_sphere.protection, enum_sphere.vitalite, enum_sphere.destruction],
	[enum_god.rasgor]: [enum_sphere.protection, enum_sphere.vitalite, enum_sphere.destruction],
	[enum_god.sarokha]: [enum_sphere.protection, enum_sphere.vitalite, enum_sphere.alteration],
};

export const enum_magic_type = {
	profane: 1,
	divine: 2,
	ToString: (value: number): string | undefined => {
		const str = [undefined, 'Magie Profane', 'Magie Divine'];
		return str[value];
	},
};
