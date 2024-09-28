import { useState } from 'react';
import styles from './profile.module.scss';
import Modal from '@/components/modal/Modal';
import CreateCharacter from '@/components/profile/createCharacter/CreateCharacter';
import UseFetch from '@/utils/useFetch';
import host from '@/services/host';
import { Character } from '@/services/types/character';
import CharacterProfileCard from '@/components/profile/characterProfileCard/CharacterProfileCard';

const Profile = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { data } = UseFetch<Character[]>(`${host}/characters`, {
		method: 'GET',
		credentials: 'include',
	});

	return (
		<div className={styles.profile}>
			<div className={styles.profile_column}>
				<div className={styles.profile_charactersList}>
					{data && data.map((character) => <CharacterProfileCard character={character} />)}
				</div>
				<button className="btn" onClick={() => setIsOpen(true)}>
					Créer un personnage
				</button>
			</div>

			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					<CreateCharacter setIsOpen={setIsOpen} />
				</Modal>
			)}
		</div>
	);
};

export default Profile;
