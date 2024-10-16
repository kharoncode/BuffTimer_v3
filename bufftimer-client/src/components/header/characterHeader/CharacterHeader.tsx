import { Character } from '@/services/types/character';
import styles from './characterHeader.module.scss';

const CharacterHeader = ({ character }: { character: Character }) => {
	//const life = Math.round((character.current_life * 100) / character.max_life);

	return (
		<div id={`${character.id}_header_character`} className={styles.container}>
			<img src={character.picture} alt={character.name} />
			{/* <div className={styles.container_life}>{life}%</div>
			{life < 40 && <div className={styles.container_warning}></div>} */}
		</div>
	);
};

export default CharacterHeader;
