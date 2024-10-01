import { Character } from '@/services/types/character';
import CharacterCard from '../characterCard/CharacterCard';
import styles from './charactersList.module.scss';

const CharactersList = ({ list }: { list: Character[] }) => {
	return (
		<div className={styles.playersContainer}>
			{list.map((character) => (
				<CharacterCard key={character.id} character={character} />
			))}
		</div>
	);
};

export default CharactersList;
