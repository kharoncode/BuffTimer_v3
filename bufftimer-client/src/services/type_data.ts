export type data_type = {
	magie: {
		gods: {
			elduniel: {
				name: 'Elduniel';
				title: 'Déesse de la guerre';
				spheres: 'protection vitalite negation';
				race: 'elf';
			};
			galmaniel: {
				name: 'Galmaniel';
				title: "Déesse de la nature et de l'art";
				spheres: 'protection vitalite alteration';
				race: 'elf';
			};
			lorikiel: {
				name: 'Lorikiel';
				title: 'Dieu des traditions cérémonies';
				spheres: 'protection vitalite alteration';
				race: 'elf';
			};
			shadaliel: {
				name: 'Shadaliel';
				title: 'Déesse de la nuit';
				spheres: 'protection negation alteration';
				race: 'elf';
			};
			ulmidiel: {
				name: 'Ulmidiel';
				title: 'Dieu du savoir';
				spheres: 'protection vitalite alteration';
				race: 'elf';
			};
			velaniel: {
				name: 'Vélaniel';
				title: 'Dieu oublié de la Magie...';
				spheres: 'protection destruction';
				race: 'elf';
			};
			aldmenir: {
				name: 'Aldménir';
				title: 'Dieu de la Connaissance et de la Nature';
				spheres: 'protection vitalite alteration';
				race: 'human';
			};
			azolth: {
				name: 'Azolth';
				title: 'Dieu de la Mort';
				spheres: 'protection negation alteration';
				race: 'human';
			};
			dallia: {
				name: 'Dallia';
				title: 'Déesse de la Vie';
				spheres: 'protection vitalite alteration';
				race: 'human';
			};
			delemia: {
				name: 'Délémia';
				title: 'Déesse de la manipulation';
				spheres: 'protection negation alteration';
				race: 'human';
			};
			karkh: {
				name: 'Karkh';
				title: 'Dieu de la Force';
				spheres: 'protection vitalite negation';
				race: 'human';
			};
			keldar: {
				name: 'Keldar';
				title: 'Dieu de la Justice';
				spheres: 'protection justice';
				race: 'human';
			};
			ghornag: {
				name: 'Ghornag';
				title: 'Dieu de la guerre';
				spheres: 'protection vitalite negation';
				race: 'orc';
			};
			khelnor: {
				name: 'khelnor';
				title: 'Dieu des héros';
				spheres: 'protection negation alteration';
				race: 'orc';
			};
			koskhun: {
				name: 'Koskhûn';
				title: 'Dieu du chaos';
				spheres: 'protection negation alteration';
				race: 'orc';
			};
			otharn: {
				name: 'Otharn';
				title: 'Dieu des shamans';
				spheres: 'protection vitalite negation';
				race: 'orc';
			};
			rasgor: {
				name: 'Rasgor';
				title: 'Dieu des bêtes et de la sauvagerie';
				spheres: 'protection vitalite negation';
				race: 'orc';
			};
			sarokha: {
				name: 'Sarokha';
				title: 'Déesse de la fécondité';
				spheres: 'protection negation alteration';
				race: 'orc';
			};
		};
		spheres: {
			protection: {
				name: 'Protection';
				list: 'regenerationMineure resistance salutDuDivin regeneration capriceDuDestin chatiment';
			};
			vitalite: {
				name: 'Vitalité';
				list: 'vigueur restauration vitesse convulsions peauDePierre verdoyance agilite plenitude';
			};
			destruction: {
				name: 'Déstruction';
				list: 'corrosion toucherAcide brulureDeMana nappeDeBrume';
			};
			negation: {
				name: 'Négation';
				list: 'oeilPourOeil malediction entraves decomposition';
			};
			alteration: {
				name: 'Altération';
				list: 'flou invisibilite bombeDeLumiere cecite champDeantimagie imageMiroir silence distortionTemporelle visionUltime';
			};
			justice: {
				name: 'Justice';
				list: 'benedictionDeKeldar attaqueSacree grandeBenedictionDeKeldar lameDeJustice transcendance';
			};
		};
		spells: {
			benedictionDeKeldar: {
				name: 'Bénédiction de Keldar';
				category: 'justice';
				arcane: 1;
				time: 7800000;
			};
			attaqueSacree: {
				name: 'Attaque Sacrée';
				category: 'justice';
				arcane: 2;
				time: 1800000;
			};
			grandeBenedictionDeKeldar: {
				name: 'Grd Bénédiction de Keldar';
				category: 'justice';
				arcane: 3;
				time: 7800000;
			};
			lameDeJustice: {
				name: 'Lame de Justice';
				category: 'justice';
				arcane: 4;
				time: 7800000;
			};
			transcendance: {
				name: 'Transcendance';
				category: 'justice';
				arcane: 5;
				time: 2880000;
			};
			regenerationMineure: {
				name: 'Régénération Mineure';
				category: 'protection';
				arcane: 1;
				time: 7800000;
			};
			resistance: {
				name: 'Résistance';
				category: 'protection';
				arcane: 2;
				time: 4680000;
			};
			salutDuDivin: {
				name: 'Salut du Divin';
				category: 'protection';
				arcane: 2;
				time: 7800000;
			};
			regeneration: {
				name: 'Régénération';
				category: 'protection';
				arcane: 3;
				time: 3900000;
			};
			capriceDuDestin: {
				name: 'Caprice du Destin';
				category: 'protection';
				arcane: 4;
				time: 1950000;
			};
			chatiment: {
				name: 'Chatiment';
				category: 'protection';
				arcane: 5;
				time: 4680000;
			};
			oeilPourOeil: {
				name: 'Oeil pour oeil';
				category: 'negation';
				arcane: 2;
				time: 1800000;
			};
			malediction: {
				name: 'Malediction';
				category: 'negation';
				arcane: 3;
				time: 3600000;
			};
			entraves: {
				name: 'Entraves';
				category: 'negation';
				arcane: 4;
				time: 3600000;
			};
			decomposition: {
				name: 'Décomposition';
				category: 'negation';
				arcane: 5;
				time: 1800000;
			};
			musique: {
				name: 'Musique';
				category: 'general';
				arcane: 0;
				time: 93600000;
			};
			enseignement: {
				name: 'Enseignement';
				category: 'general';
				arcane: 0;
				time: 187200000;
			};
		};
	};
	skills: {
		musique: {
			name: 'Musique';
			time: 93600000;
		};

		enseignement: {
			name: 'Enseignement';
			time: 187200000;
		};
	};
};
