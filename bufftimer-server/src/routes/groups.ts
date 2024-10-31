import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { character_spells, characters, group_characters, group_enemies, groups, monsters } from '../db/schema';
import { eq, and, notInArray, inArray } from 'drizzle-orm';
import { Bindings, Variables } from '../lib/bindings';

const groupsRoute = new Hono<{ Bindings: Bindings; Variables: Variables }>();

groupsRoute
	.get('/', async (c) => {
		const user = c.get('user');
		if (!user) {
			return c.json({ error: 'Veuillez vous connecter !' }, 404);
		}
		const db = drizzle(c.env.DB);
		const character_id = Number(c.req.query('id'));
		if (character_id) {
			const characterGroup = await db
				.select({
					group_id: groups.id,
					group_name: groups.name,
					creator_id: groups.creator_id,
				})
				.from(groups)
				.innerJoin(group_characters, eq(group_characters.group_id, groups.id))
				.where(eq(group_characters.character_id, character_id))
				.orderBy(groups.name);

			const presentGroupIds = characterGroup.map((group) => group.group_id);
			const otherGroups = await db
				.select({
					group_id: groups.id,
					group_name: groups.name,
					creator_id: groups.creator_id,
				})
				.from(groups)
				.where(notInArray(groups.id, presentGroupIds))
				.orderBy(groups.name);

			return c.json({ characterGroups: characterGroup, otherGroups: otherGroups }, 200);
		} else {
			return c.json({ error: 'Un id est requis !' });
		}
	})
	.get('/list', async (c) => {
		const user = c.get('user');
		if (!user) {
			return c.json({ error: 'Veuillez vous connecter !' }, 404);
		}
		const db = drizzle(c.env.DB);
		const group_id = Number(c.req.query('id'));
		if (group_id) {
			const group = await db.select().from(groups).where(eq(groups.id, group_id));

			const charactersGroupListRow = await db
				.select({
					character: characters,
					group_characters_id: group_characters.id,
				})
				.from(group_characters)
				.innerJoin(characters, eq(group_characters.character_id, characters.id))
				.where(eq(group_characters.group_id, group_id))
				.orderBy(characters.name);

			const charactersEnemiesGroupListRow = await db
				.select({
					id: characters.id,
					user_id: characters.user_id,
					name: characters.name,
					picture: characters.picture,
					enum_realm: characters.enum_realm,
					intelligence: characters.intelligence,
					current_life: characters.current_life,
					max_life: characters.max_life,
					message: characters.message,
					enum_god: characters.enum_god,
					enum_magic_type: characters.enum_magic_type,
					sphere: characters.sphere,
				})
				.from(group_enemies)
				.innerJoin(characters, eq(group_enemies.enemy_id, characters.id))
				.where(and(eq(group_enemies.group_id, group_id), eq(group_enemies.type, 1)));

			const monstersEnemiesGroupListRow = await db
				.select({
					id: monsters.id,
					user_id: monsters.user_id,
					enum_mob: monsters.enum_mob,
					name: monsters.name,
					current_life: monsters.current_life,
					max_life: monsters.max_life,
				})
				.from(group_enemies)
				.innerJoin(monsters, eq(group_enemies.enemy_id, monsters.id))
				.where(and(eq(group_enemies.group_id, group_id), eq(group_enemies.type, 0)));

			const group_data = {
				group_id: group_id,
				group_name: group[0].name,
				creator_id: group[0].creator_id,
				characters: charactersGroupListRow,
				enemies: { characters: charactersEnemiesGroupListRow, monsters: monstersEnemiesGroupListRow },
			};

			let result;

			if (charactersGroupListRow.length > 0) {
				const spellsList = await db
					.select()
					.from(character_spells)
					.where(
						inArray(
							character_spells.character_id,
							charactersGroupListRow.map((character) => character.character.id)
						)
					);

				result = group_data.characters.map((character) => {
					const spells = spellsList.filter((spell) => spell.character_id === character.character.id);
					return { ...character, character: { ...character.character, spells: spells } };
				});
			}

			return c.json({ ...group_data, characters: result }, 200);
		} else {
			return c.json({ error: 'Un id est requis !' });
		}
	})
	// .get('/list', async (c) => {
	// 	const user = c.get('user');
	// 	if (!user) {
	// 		return c.json({ error: 'Veuillez vous connecter !' }, 404);
	// 	}
	// 	const db = drizzle(c.env.DB);
	// 	const character_id = Number(c.req.query('id'));
	// 	if (character_id) {
	// 	const groupData = await db
	// 		.select({
	// 			groupId: groups.id,
	// 			groupName: groups.name,
	// 			characterId: group_characters.character_id,
	// 			enemyId: group_enemies.enemy_id,
	// 			enemyType: group_enemies.type,
	// 		})
	// 		.from(groups)
	// 		.leftJoin(group_characters, eq(groups.id, group_characters.group_id))
	// 		.leftJoin(group_enemies, eq(groups.id, group_enemies.group_id)).where(eq(group_characters.character_id, character_id));

	// 	const group_data: {
	// 		id: number;
	// 		name: string;
	// 		characters: number[];
	// 		enemies: { id: number; type: number }[];
	// 	} = {
	// 		id: groupData[0].groupId,
	// 		name: groupData[0].groupName,
	// 		characters: [],
	// 		enemies: [],
	// 	};
	// 	groupData.map((el) => {
	// 		if (el.characterId) {
	// 			group_data.characters.push(el.characterId);
	// 		} else if (el.enemyId && el.enemyType) {
	// 			group_data.enemies.push({ id: el.enemyId, type: el.enemyType });
	// 		}
	// 	});
	// 	//   const groupedData = groupData.reduce((acc, row) => {
	// 	// 	if (!acc[row.groupId]) {
	// 	// 	  acc[row.groupId] = {
	// 	// 		groupName: row.groupName,
	// 	// 		members: [],
	// 	// 		enemies: []
	// 	// 	  };
	// 	// 	}

	// 	// 	if (row.characterId) {
	// 	// 	  acc[row.groupId].members.push(row.characterId);
	// 	// 	}

	// 	// 	if (row.enemyId) {
	// 	// 	  acc[row.groupId].enemies.push({ enemyId: row.enemyId, type: row.enemyType });
	// 	// 	}

	// 	// 	return acc;
	// 	//   }, {});
	// 	return c.json(group_data, 200);
	// } else {
	// 	return c.json({ error: 'Un id est requis !' });
	// }
	// })
	.post('/addGoodCharacter', async (c) => {
		try {
			const user = c.get('user');
			if (!user) {
				return c.json({ error: 'Veuillez vous connecter !' }, 404);
			}
			const db = drizzle(c.env.DB);
			const group_character = await c.req.json();
			const resp = await db.insert(group_characters).values(group_character).returning();
			return c.json(resp, 200);
		} catch (error) {
			console.error("Erreur lors de l'ajout d'un personnage dans le groupe:", error);
			return c.json({ error: "Une erreur s'est produite lors de l'ajout d'un personnage dans le groupe." }, 500);
		}
	})
	.post('/', async (c) => {
		try {
			const user = c.get('user');
			if (!user) {
				return c.json({ error: 'Veuillez vous connecter !' }, 404);
			}
			const db = drizzle(c.env.DB);
			const group = await c.req.json();
			const resp = await db.insert(groups).values(group).returning();
			const add = await db.insert(group_characters).values({ group_id: resp[0].id, character_id: group.creator_id }).returning();
			return c.json(resp, 200);
		} catch (error) {
			console.error('Erreur lors de la création du group:', error);
			return c.json({ error: "Une erreur s'est produite lors de la création du group." }, 500);
		}
	})
	.delete('/', async (c) => {
		try {
			const user = c.get('user');
			if (!user) {
				return c.json({ msg: 'Veuillez vous connecter !' });
			}
			const db = drizzle(c.env.DB);
			const { id } = await c.req.json();
			if (!id) {
				return c.json({ error: 'Un ID est requis.' }, 400);
			}
			const resp = await db.delete(groups).where(eq(groups.id, id)).returning();
			if (resp.length > 0) {
				return c.json({ msg: 'Group correctement supprimé !' }, 200);
			} else {
				return c.json({ error: 'Aucune modification effectuée.' }, 400);
			}
		} catch (error) {
			console.log(error);
		}
	})
	.delete('/deleteGoodCharacter', async (c) => {
		try {
			const user = c.get('user');
			if (!user) {
				return c.json({ msg: 'Veuillez vous connecter !' });
			}
			const db = drizzle(c.env.DB);
			const { id } = await c.req.json();
			if (!id) {
				return c.json({ error: 'Un ID est requis.' }, 400);
			}
			const resp = await db.delete(group_characters).where(eq(group_characters.id, id)).returning();
			if (resp.length > 0) {
				return c.json({ msg: 'Favoris correctement supprimé !' }, 200);
			} else {
				return c.json({ error: 'Aucune modification effectuée.' }, 400);
			}
		} catch (error) {
			console.log(error);
		}
	});

export default groupsRoute;
