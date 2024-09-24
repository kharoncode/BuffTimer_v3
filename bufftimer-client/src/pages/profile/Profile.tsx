import { useState } from 'react';
import styles from './profile.module.scss';
import Modal from '@/components/modal/Modal';
import CreateCharacter from '@/components/profile/createCharacter/CreateCharacter';
import UseFetch from '@/utils/useFetch';
import host from '@/services/host';
import { Character } from '@/services/types/character';
import EditCharacter from '@/components/profile/editCharacter/EditCharacter';
import edit_icone from '@assets/icones/edit.svg';

const Profile = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [typeAdd, setTypeAdd] = useState<'character' | 'favoris' | 'editCharacter'>('favoris');
	const [selectedCharacter, setCharacter] = useState<Character | undefined>();

	const toggleModal = (type: 'character' | 'favoris' | 'editCharacter') => {
		setIsOpen(true);
		setTypeAdd(type);
	};
	const { data } = UseFetch<Character[]>(`${host}/characters`, {
		method: 'GET',
		credentials: 'include',
	});

	return (
		<div className={styles.profile}>
			<div className={styles.profile_column}>
				<div className={styles.profile_charactersList}>
					{data &&
						data.map((character) => (
							<div className={styles.characters_row} key={character.name}>
								<div>{character.name}</div>
								<img
									src={edit_icone}
									alt="Edit"
									onClick={() => {
										setCharacter(character);
										toggleModal('editCharacter');
									}}
								></img>
							</div>
						))}
				</div>
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
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					{typeAdd === 'character' ? (
						<CreateCharacter />
					) : typeAdd === 'editCharacter' && selectedCharacter ? (
						<EditCharacter character={selectedCharacter} setIsOpen={setIsOpen} />
					) : (
						<div>Favoris</div>
					)}
				</Modal>
			)}
		</div>
	);
};

export default Profile;
