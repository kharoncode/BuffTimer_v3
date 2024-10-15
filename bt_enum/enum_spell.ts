import { enum_sphere } from './enum_mystique';

export const enum_spell = {
	flou: 1,
	benediction_de_keldar: 2,
	attaque_sacree: 3,
	regeneration_mineure: 4,
	ami_de_la_foret: 5,
	vigueur: 6,
	invisibilite: 7,
	corrosion: 8,
	toucher_acide: 9,
	resistance: 10,
	restauration: 11,
	vitesse: 12,
	brulure_de_mana: 13,
	grande_benediction_de_keldar: 14,
	regeneration: 15,
	convulsions: 16,
	peau_de_pierre: 17,
	verdoyance: 18,
	nappe_de_Brume: 19,
	lame_de_la_justice: 20,
	caprice_du_destin: 21,
	agilite: 22,
	transcendance: 23,
	decomposition: 24,
	chatiment: 25,
	plenitude: 26,
	entraves: 27,
	malediction: 28,
	oeil_pour_oeil: 29,
	salut_du_divin: 30,
	lame_de_justice: 31,
	ToString: (value: number): string | undefined => {
		const str = [
			undefined,
			'Flou',
			'Bénédiction de Keldar',
			'Attaque Sacrée',
			'Régénération mineure',
			'Ami de la forêt',
			'Vigueur',
			'Invisibilité',
			'Corrosion',
			'Toucher acide',
			'Résistance',
			'Restauration',
			'Vitesse',
			'Brulure de mana',
			'Grande bénédiction de Keldar',
			'Régénération',
			'Convulsions',
			'Peau de pierre',
			'Verdoyance',
			'Nappe de Brume',
			'Lame de la justice',
			'Caprice du destin',
			'Agilité',
			'Transcendance',
			'Décomposition',
			'Châtiment',
			'Plénitude',
			'Entraves',
			'Malediction',
			'Oeil pour oeil',
			'Salut du Divin',
			'Lame de Justice',
			'Attaque Sacrée',
		];
		return str[value];
	},
};

export const enum_spell_data = {
	[enum_spell.flou]: {
		sphere: enum_sphere.alteration,
		arcane: 1,
		time: 0,
	},
	[enum_spell.benediction_de_keldar]: {
		sphere: enum_sphere.justice,
		arcane: 1,
		time: 7800000,
	},
	[enum_spell.attaque_sacree]: {
		sphere: enum_sphere.justice,
		arcane: 2,
		time: 1800000,
	},
	[enum_spell.regeneration_mineure]: {
		sphere: enum_sphere.protection,
		arcane: 1,
		time: 7800000,
	},
	[enum_spell.ami_de_la_foret]: {
		sphere: enum_sphere.vitalite,
		arcane: 1,
		time: 7800000,
	},
	[enum_spell.vigueur]: {
		sphere: enum_sphere.vitalite,
		arcane: 1,
		time: 7800000,
	},
	[enum_spell.invisibilite]: {
		sphere: enum_sphere.alteration,
		arcane: 2,
		time: 0,
	},
	[enum_spell.corrosion]: {
		sphere: enum_sphere.destruction,
		arcane: 2,
		time: 4680000,
	},
	[enum_spell.toucher_acide]: {
		sphere: enum_sphere.destruction,
		arcane: 2,
		time: 5200000,
	},
	[enum_spell.resistance]: {
		sphere: enum_sphere.protection,
		arcane: 2,
		time: 4680000,
	},
	[enum_spell.restauration]: {
		sphere: enum_sphere.vitalite,
		arcane: 2,
		time: 5200000,
	},
	[enum_spell.vitesse]: {
		sphere: enum_sphere.vitalite,
		arcane: 2,
		time: 6240000,
	},
	[enum_spell.brulure_de_mana]: {
		sphere: enum_sphere.destruction,
		arcane: 3,
		time: 4680000,
	},
	[enum_spell.grande_benediction_de_keldar]: {
		sphere: enum_sphere.justice,
		arcane: 3,
		time: 7800000,
	},
	[enum_spell.regeneration]: {
		sphere: enum_sphere.protection,
		arcane: 3,
		time: 3900000,
	},
	[enum_spell.convulsions]: {
		sphere: enum_sphere.vitalite,
		arcane: 3,
		time: 4680000,
	},
	[enum_spell.peau_de_pierre]: {
		sphere: enum_sphere.vitalite,
		arcane: 3,
		time: 4680000,
	},
	[enum_spell.verdoyance]: {
		sphere: enum_sphere.vitalite,
		arcane: 3,
		time: 7800000,
	},
	[enum_spell.nappe_de_Brume]: {
		sphere: enum_sphere.destruction,
		arcane: 4,
		time: 1950000,
	},
	[enum_spell.lame_de_la_justice]: {
		sphere: enum_sphere.justice,
		arcane: 4,
		time: 7800000,
	},
	[enum_spell.caprice_du_destin]: {
		sphere: enum_sphere.protection,
		arcane: 4,
		time: 1950000,
	},
	[enum_spell.agilite]: {
		sphere: enum_sphere.vitalite,
		arcane: 4,
		time: 5200000,
	},
	[enum_spell.transcendance]: {
		sphere: enum_sphere.justice,
		arcane: 5,
		time: 2880000,
	},
	[enum_spell.decomposition]: {
		sphere: enum_sphere.negation,
		arcane: 5,
		time: 1800000,
	},
	[enum_spell.chatiment]: {
		sphere: enum_sphere.protection,
		arcane: 5,
		time: 4680000,
	},
	[enum_spell.plenitude]: {
		sphere: enum_sphere.vitalite,
		arcane: 5,
		time: 5200000,
	},
	[enum_spell.entraves]: {
		sphere: enum_sphere.negation,
		arcane: 4,
		time: 3600000,
	},
	[enum_spell.malediction]: {
		sphere: enum_sphere.negation,
		arcane: 3,
		time: 3600000,
	},
	[enum_spell.oeil_pour_oeil]: {
		sphere: enum_sphere.negation,
		arcane: 2,
		time: 1800000,
	},
	[enum_spell.salut_du_divin]: {
		sphere: enum_sphere.protection,
		arcane: 2,
		time: 7800000,
	},
	[enum_spell.lame_de_justice]: {
		sphere: enum_sphere.justice,
		arcane: 4,
		time: 7800000,
	},
};
