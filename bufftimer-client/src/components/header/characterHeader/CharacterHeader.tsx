import { Character } from '@/services/types/character';
import styles from './characterHeader.module.scss';

const CharacterHeader = ({ character }: { character: Character }) => {
	const character_el = document.getElementById(`${character.id}_header_character`);
	const life = Math.round((character.current_life * 100) / character.max_life);
	if (character_el) {
		const color =
			life < 20
				? 'rgb(255, 60, 55)'
				: life < 40
				? 'rgb(255, 116, 0)'
				: life < 60
				? 'rgb(255, 198, 0)'
				: life < 80
				? 'rgb(167, 191, 0)'
				: 'rgba(102, 255, 87, 1)';
		character_el.style.borderColor = color;
	}

	return (
		<div id={`${character.id}_header_character`} className={styles.container}>
			<img src={character.picture} alt={character.name} />
			<div className={styles.container_life}>{life}%</div>
			{life < 40 && <div className={styles.container_warning}></div>}
		</div>
	);
};

export default CharacterHeader;
