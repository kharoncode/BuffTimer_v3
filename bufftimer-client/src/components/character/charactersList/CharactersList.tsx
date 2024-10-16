import { Character } from '@/services/types/character';
import CharacterCard from '../characterCard/CharacterCard';
import styles from './charactersList.module.scss';

const CharactersList = ({ list, setRefresh }: { list: Character[]; setRefresh: React.Dispatch<React.SetStateAction<boolean>> }) => {
	return (
		<div className={styles.playersContainer}>
			{list.map((character) => (
				<CharacterCard key={character.id} character={character} setRefreshCharacter={setRefresh} />
			))}
		</div>
	);
};

export default CharactersList;
