import { useState } from 'react';
import styles from './profil.module.scss';
import Modal from '@/components/modal/Modal';
import CreateCharacter from '@/components/profil/createCharacter/CreateCharacter';
import UseFetch from '@/utils/useFetch';
import host from '@/services/host';
import { Character } from '@/services/types/character';
import CreateMonster from '@/components/profil/createMonster/CreateMonster';
import { Monster } from '@/services/types/monster';
import CharacterProfilCard from '@/components/profil/characterProfilCard/CharacterProfilCard';
import MonsterProfilCard from '@/components/profil/monsterProfilCard/MonsterProfilCard';

const Profil = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [whichForm, setWichForm] = useState<string>('monster');

	const { data: characters } = UseFetch<Character[]>(
		`${host}/characters/user`,
		{
			method: 'GET',
			credentials: 'include',
		},
		refresh
	);
	const { data: monsters } = UseFetch<Monster[]>(
		`${host}/monsters`,
		{
			method: 'GET',
			credentials: 'include',
		},
		refresh
	);

	return (
		<div className={styles.profil}>
			<div className={styles.profil_column}>
				<button
					className="btn"
					onClick={() => {
						setIsOpen(true);
						setWichForm('character');
					}}
				>
					Ajouter un personnage
				</button>
				<div className={styles.profil_charactersList}>
					{characters &&
						characters.map((character) => <CharacterProfilCard key={character.name} character={character} onSuccess={setRefresh} />)}
				</div>
			</div>
			<div className={styles.profil_column}>
				<button
					className="btn"
					onClick={() => {
						setIsOpen(true);
						setWichForm('monster');
					}}
				>
					Ajouter un monstre
				</button>
				<div className={styles.profil_charactersList}>
					{monsters && monsters.map((monster) => <MonsterProfilCard key={monster.name} monster={monster} onSuccess={setRefresh} />)}
				</div>
			</div>

			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					{whichForm === 'character' ? (
						<CreateCharacter setIsOpen={setIsOpen} onSuccess={setRefresh} />
					) : (
						<CreateMonster setIsOpen={setIsOpen} onSuccess={setRefresh} />
					)}
				</Modal>
			)}
		</div>
	);
};

export default Profil;
