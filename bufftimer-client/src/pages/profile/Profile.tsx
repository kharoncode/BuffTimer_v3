import { useState } from 'react';
import styles from './profile.module.scss';
import Modal from '@/components/modal/Modal';
import CreateCharacter from '@/components/profile/createCharacter/CreateCharacter';

const Profile = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [typeAdd, setTypeAdd] = useState<'character' | 'favoris'>('favoris');

	const toggleModal = (type: 'character' | 'favoris') => {
		setIsOpen(true);
		setTypeAdd(type);
	};

	return (
		<div className={styles.profile}>
			<div className={styles.profile_column}>
				<div className={styles.profile_charactersList}>Liste des Persos</div>
				<button className="btn" onClick={() => toggleModal('character')}>
					Créer un personnage
				</button>
			</div>
			<div className={styles.profile_column}>
				<div className={styles.profile_charactersList}>Liste des Favoris</div>
				<button className="btn" onClick={() => toggleModal('favoris')}>
					Ajouter un personnage
				</button>
			</div>
			{isOpen && <Modal setIsOpen={setIsOpen}>{typeAdd === 'character' ? <CreateCharacter /> : <div>Favoris</div>}</Modal>}
		</div>
	);
};

export default Profile;
