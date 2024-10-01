import { Character } from '@/services/types/character';
import styles from './characterCard.module.scss';
import styled from 'styled-components';
import LifeBar from '../lifeBar/lifeBar';
import { useEffect, useState } from 'react';
import SpellCard from '../spellCard/SpellCard';
//import UseFetch from '@/utils/useFetch';
import { Spell } from '@/services/types/spell';
import host from '@/services/host';

const SpellContainer = styled.div<{ $flex: string }>`
	align-self: flex-end;
	width: 85%;
	display: flex;
	${({ $flex }) => $flex}
	@media (max-width: 700px) {
		width: 100%;
	}
`;

const CharacterCard = ({ character }: { character: Character }) => {
	const [isOpen, setOpen] = useState(false);
	const [spellsList, setSpellsList] = useState<Spell[]>([]);

	useEffect(() => {
		const fetchSpellsList = async () => {
			try {
				const resp = await fetch(`${host}/character-spells?id=${character.id}`, {
					method: 'GET',
					credentials: 'include',
				});
				if (resp.ok) {
					const data: Spell[] = await resp.json();
					setSpellsList(data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchSpellsList();
	}, [character.id]);

	// const { data: spellsList } = UseFetch<Spell[]>(`${host}/character-spells?id=${character.id}`, {
	// 	method: 'GET',
	// 	credentials: 'include',
	// });

	const style: string = isOpen
		? `flex-direction: column;
    align-items: center;
    gap: 5px;`
		: `flex-direction: row;
    gap: 10px;`;

	return (
		<div id={`${character.id}Card`} className={styles.container}>
			<div className={styles.status}>
				<svg className={styles.editButton} xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
					<path
						opacity="1"
						fill="#1E3050"
						d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"
					/>
				</svg>

				<img className={styles.playerPicture} src={character.picture} alt={character.name}></img>
				<div className={styles.title}>{character.name}</div>
				<LifeBar life={{ maxLife: character.max_life, currentLife: character.current_life }} />
			</div>
			{spellsList && (
				<SpellContainer
					onClick={() => {
						setOpen(!isOpen);
					}}
					$flex={style}
				>
					{spellsList.map((spell) => (
						<SpellCard
							key={`${character.id}-${spell.id}-spell`}
							id={spell.id}
							enum_spell={spell.enum_spell}
							character_id={character.id}
							created_at={spell.created_at}
							expires_at={Number(spell.expires_at)}
							isOpen={isOpen}
							setSpellsList={setSpellsList}
						/>
					))}
				</SpellContainer>
			)}
		</div>
	);
};

export default CharacterCard;
