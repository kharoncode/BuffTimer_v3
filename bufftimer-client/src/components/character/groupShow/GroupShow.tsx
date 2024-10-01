import host from '@/services/host';
import { Group_Show } from '@/services/types/groups';
import UseFetch from '@/utils/useFetch';
import { useState } from 'react';
import styles from './groupShow.module.scss';
import CharacterCard from '../characterCard/CharacterCard';
import { Character } from '@/services/types/character';

const GroupShow = ({ group_id, name }: { group_id: number; name: string }) => {
	const [characterSelected, setCharacterSelected] = useState(0);
	const [refresh, setRefresh] = useState(false);
	const { data } = UseFetch<Group_Show>(
		`${host}/groups/list?id=${group_id}`,
		{
			method: 'GET',
			credentials: 'include',
		},
		refresh
	);

	const { data: charactersList } = UseFetch<Character[]>(`${host}/characters/all`, {
		method: 'GET',
		credentials: 'include',
	});

	const addGoodCharacter = async (character_id: number) => {
		const resp = await fetch(`${host}/groups/addCharacter`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ character_id: character_id, group_id: group_id }),
		});

		if (resp.ok) {
			setRefresh((set) => !set);
		}
	};

	return (
		<div className={styles.container}>
			<h3>{name}</h3>
			{data && (
				<div className={styles.arene}>
					<div className={styles.arene_team}>
						<p>Good</p>
						{charactersList && (
							<div>
								<select
									onChange={(event) => {
										const { value } = event.target;
										setCharacterSelected(Number(value));
									}}
								>
									<option value="0">Ajouter un Personnage</option>
									{charactersList
										.filter(
											(character) =>
												!data.characters.some((dataCharacter) => {
													return dataCharacter.id === character.id;
												})
										)
										.map((character) => (
											<option key={`${character.id}_option`} value={character.id}>
												{character.name}
											</option>
										))}
								</select>
								<button
									className="btn"
									onClick={() => {
										addGoodCharacter(characterSelected);
									}}
								>
									Ajouter
								</button>
							</div>
						)}
						{data.characters.map((character) => (
							<CharacterCard key={`${character.id}_character`} character={character} />
						))}
					</div>
					<div className={styles.arene_middle}>VS</div>
					<div className={styles.arene_team}>
						<p>Bad</p>
						<div>
							<p>Characters</p>
							{data.enemies.characters.length !== 0 &&
								data.enemies.characters.map((character) => <CharacterCard key={`${character.id}_character`} character={character} />)}
						</div>
						<div>
							<p>Monsters</p>
							{data.enemies.monsters.length !== 0 &&
								data.enemies.monsters.map((monster) => <div key={`${monster.id}_monster`}>{monster.name}</div>)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GroupShow;
