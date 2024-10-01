import { useState } from 'react';
import styles from './profile.module.scss';
import Modal from '@/components/modal/Modal';
import CreateCharacter from '@/components/profile/createCharacter/CreateCharacter';
import UseFetch from '@/utils/useFetch';
import host from '@/services/host';
import { Character } from '@/services/types/character';
import CharacterProfileCard from '@/components/profile/characterProfileCard/CharacterProfileCard';
import CreateMonster from '@/components/profile/createMonster/CreateMonster';
import { Monster } from '@/services/types/monster';
import MonsterProfileCard from '@/components/profile/monsterProfileCard/MonsterProfileCard';

const Profile = () => {
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
		<div className={styles.profile}>
			<div className={styles.profile_column}>
				<button
					className="btn"
					onClick={() => {
						setIsOpen(true);
						setWichForm('character');
					}}
				>
					Ajouter un personnage
				</button>
				<div className={styles.profile_charactersList}>
					{characters &&
						characters.map((character) => <CharacterProfileCard key={character.name} character={character} onSuccess={setRefresh} />)}
				</div>
			</div>
			<div className={styles.profile_column}>
				<button
					className="btn"
					onClick={() => {
						setIsOpen(true);
						setWichForm('monster');
					}}
				>
					Ajouter un monstre
				</button>
				<div className={styles.profile_charactersList}>
					{monsters && monsters.map((monster) => <MonsterProfileCard key={monster.name} monster={monster} onSuccess={setRefresh} />)}
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

export default Profile;
