import host from '@/services/host';
import { Group_Show } from '@/services/types/groups';
import UseFetch from '@/utils/useFetch';
import { useState } from 'react';
import styles from './groupShow.module.scss';
import { Character } from '@/services/types/character';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterCard from '@/components/character/characterCard/CharacterCard';
import Select from '@/components/select/Select';
import { useSelector } from 'react-redux';
import { groupRefresh } from '@/router/selectors';
import { store } from '@/router/store';
import { userSlice } from '@/router/slice/userSlice';

const GroupShow = () => {
	const params = useParams();
	const navigate = useNavigate();
	const refreshGroupList = useSelector(groupRefresh);
	const group_id = Number(params.group_id);
	const casterId = Number(params.id);
	const [characterSelected, setCharacterSelected] = useState(0);
	const [refresh, setRefresh] = useState(false);
	const [selectReset, setSelectReset] = useState(false);

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
		if (character_id !== 0) {
			const resp = await fetch(`${host}/groups/addGoodCharacter`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ character_id: character_id, group_id: group_id }),
			});

			if (resp.ok) {
				setRefresh((set) => !set);
				setCharacterSelected(0);
				setSelectReset((prev) => !prev);
				if (character_id === casterId) {
					store.dispatch(userSlice.actions.groupRefresh(!refreshGroupList));
				}
			}
		}
	};

	const handleDelete = async (group_characters_id: number) => {
		const resp = await fetch(`${host}/groups/deleteGoodCharacter`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: group_characters_id }),
		});

		if (resp.ok) {
			setCharacterSelected(0);
			setRefresh((prev) => !prev);
		}
	};

	const leaveGroup = async () => {
		const caster_group_id = data?.characters.find((character) => character.character.id === casterId)?.group_characters_id;
		if (caster_group_id) {
			const resp = await fetch(`${host}/groups/deleteGoodCharacter`, {
				method: 'DELETE',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: caster_group_id }),
			});

			if (resp.ok) {
				navigate(`/auth/character/${casterId}/realm`);
				store.dispatch(userSlice.actions.groupRefresh(!refreshGroupList));
			}
		}
	};

	if (data && charactersList) {
		const { group_name, creator_id, characters } = data;
		const creatorName = charactersList.find((character) => character.id === creator_id);

		const option = charactersList
			.filter(
				(character) =>
					!characters.some((dataCharacter) => {
						return dataCharacter.character.id === character.id;
					})
			)
			.map((el) => {
				return { value: el.id, label: el.name, styles: styles[`select_option__${el.enum_realm}`] };
			});

		return (
			<div className={styles.container}>
				<div className={styles.container_title}>
					<div className={styles.container_title__name}>
						<h3 onClick={() => setRefresh((prev) => !prev)}>{group_name}</h3>
					</div>
					<h4>Créateur : {creatorName ? creatorName.name : ''}</h4>

					{creator_id !== casterId && characters.some((character) => character.character.id === casterId) && (
						<button
							onClick={() => {
								leaveGroup();
							}}
							className="btn"
						>
							Quitter le groupe
						</button>
					)}
				</div>

				<div className={styles.arene}>
					{charactersList && (
						<div className={styles.select}>
							<Select options={option} initOption="Ajouter un personnage" onChange={setCharacterSelected} reset={selectReset} />

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
					<div className={styles.arene_team}>
						{characters
							.filter((character) => character.character.id !== casterId)
							.map((character) => (
								<div key={`${character.character.id}_character`} className={styles.arene_team_character}>
									<CharacterCard character={character.character} />
									{casterId === creator_id && (
										<svg
											className={styles.arene_team_character_delete}
											onClick={() => handleDelete(character.group_characters_id)}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 448 512"
										>
											<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
										</svg>
									)}
								</div>
							))}
					</div>
					{/* <div className={styles.arene_middle}>VS</div>
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
					</div> */}
				</div>
			</div>
		);
	}
};

export default GroupShow;
