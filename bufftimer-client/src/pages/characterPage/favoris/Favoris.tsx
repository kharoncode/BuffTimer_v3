import host from '@/services/host';
import { Character } from '@/services/types/character';
import UseFetch from '@/utils/useFetch';
import { useState } from 'react';
import styles from './favoris.module.scss';
import CharacterCard from '@/components/character/characterCard/CharacterCard';
import { useParams } from 'react-router-dom';
import Select from '@/components/select/Select';

const Favoris = () => {
	const params = useParams();
	const id = Number(params.id);
	const [characterSelected, setCharacterSelected] = useState(0);
	const [refresh, setRefresh] = useState(false);
	const [selectReset, setSelectReset] = useState(false);

	const { data: characterFavorisList } = UseFetch<{ character: Character; favoris_id: number }[]>(
		`${host}/favoris?id=${id}`,
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

	const addFavorisCharacter = async (character_id: number) => {
		if (character_id !== 0) {
			const resp = await fetch(`${host}/favoris/addCharacter`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ character_id: id, character_favoris_id: character_id }),
			});

			if (resp.ok) {
				setCharacterSelected(0);
				setRefresh((set) => !set);
				setSelectReset((prev) => !prev);
			}
		}
	};

	const handleDelete = async (favoris_id: number) => {
		const resp = await fetch(`${host}/favoris`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: favoris_id }),
		});

		if (resp.ok) {
			setCharacterSelected(0);
			setRefresh((prev) => !prev);
		}
	};

	if (charactersList && characterFavorisList) {
		const option = charactersList
			.filter(
				(character) =>
					!characterFavorisList.some((favorisCharacter) => {
						return favorisCharacter.character.id === character.id;
					}) && character.id !== id
			)
			.map((el) => {
				return { value: el.id, label: el.name, styles: styles[`select_option__${el.enum_realm}`] };
			});

		return (
			<div className={styles.container}>
				<div className={styles.select}>
					<Select options={option} initOption="Ajouter un personnage" onChange={setCharacterSelected} reset={selectReset} />
					<button
						className="btn"
						onClick={() => {
							addFavorisCharacter(characterSelected);
						}}
					>
						Ajouter
					</button>
				</div>
				{characterFavorisList.map((favorisCharacter) => (
					<div className={styles.favorisCard} key={`${favorisCharacter.character.id}_favoris`}>
						<CharacterCard character={favorisCharacter.character} />
						<svg onClick={() => handleDelete(favorisCharacter.favoris_id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
							<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
						</svg>
					</div>
				))}
			</div>
		);
	}
};

export default Favoris;
