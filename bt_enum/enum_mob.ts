export const enum_mob = {
	cadavre_ensanglante: 1,
	archer_squelette: 2,
	goule: 3,
	colosse_ossements: 4,
	colosse_chair: 5,
	guerrier_squelette: 6,
	mage_squelette: 7,
	zombi_infecté: 8,
	liche: 9,
	spectre_effroi: 10,
	necromancien: 11,
	champion_squelette_geant: 12,
	ToString: (value: number): string | undefined => {
		const str = [
			undefined,
			'Cadavre Ensanglanté ',
			'Archer Squelette ',
			'Goule',
			"Colosse d'ossements",
			'Colosse de chair',
			'Guerrier Squelette',
			'Mage Squelette',
			'Zombi Infecté',
			'Liche',
			"Spectre de l'effroi",
			'Nécromancien',
			'Champion squelette géant',
		];
		return str[value];
	},
};

export const enum_mob_picture = {
	[enum_mob.cadavre_ensanglante]: 'https://ideo-lejeu.com/ideov23/creatures/zombie.gif',
};
