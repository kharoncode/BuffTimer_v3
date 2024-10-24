import host from '@/services/host';
import { Group_Show } from '@/services/types/groups';
import UseFetch from '@/utils/useFetch';
import { useState } from 'react';
import styles from './groupShow.module.scss';
import { Character } from '@/services/types/character';
import CharacterCard from '../../characterCard/CharacterCard';
import { useSearchParams } from 'react-router-dom';
import Modal from '@/components/modal/Modal';

const GroupShow = ({
	group_id,
	group_name,
	creator_id,
	groupRefresh,
}: {
	group_id: number;
	group_name: string;
	creator_id: number;
	groupRefresh: (isInit: boolean) => void;
}) => {
	const [searchParams] = useSearchParams();
	const casterId = Number(searchParams.get('id'));
	const [characterSelected, setCharacterSelected] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);
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
				if (character_id === casterId) {
					groupRefresh(false);
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

	const handleDeleteGroup = async (group_id: number) => {
		const resp = await fetch(`${host}/groups`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: group_id }),
		});

		if (resp.ok) {
			groupRefresh(true);
		}
	};

	const leaveGroup = async () => {
		const resp = await fetch(`${host}/groups/deleteGoodCharacter`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: casterId }),
		});

		if (resp.ok) {
			groupRefresh(true);
		}
	};

	const creatorName = charactersList?.find((character) => character.id === creator_id);

	return (
		data && (
			<div className={styles.container}>
				<div className={styles.container_title}>
					<div className={styles.container_title__name}>
						<h3 onClick={() => setRefresh((prev) => !prev)}>{group_name}</h3>
						{creator_id === casterId && (
							<svg
								className={`${styles.option_icone} ${styles.option_icone_delete}`}
								onClick={() => setModalOpen(true)}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
							</svg>
						)}
					</div>
					<h4>Créateur : {creatorName ? creatorName.name : ''}</h4>

					{creator_id !== casterId && data.characters.some((character) => character.character.id === casterId) && (
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
												return dataCharacter.character.id === character.id;
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
					<div className={styles.arene_team}>
						{data.characters
							.filter((character) => character.character.id !== casterId)
							.map((character) => (
								<div key={`${character.character.id}_character`} className={styles.arene_team_character}>
									<CharacterCard character={character.character} setRefreshCharacter={setRefresh} />
									{casterId === creator_id && (
										<svg
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
				{modalOpen && (
					<Modal setIsOpen={setModalOpen}>
						<button onClick={() => handleDeleteGroup(group_id)} className="btn">
							Supprimer le groupe
						</button>
					</Modal>
				)}
			</div>
		)
	);
};

export default GroupShow;
