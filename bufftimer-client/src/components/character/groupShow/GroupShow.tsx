import host from '@/services/host';
import { Group_Show } from '@/services/types/groups';
import UseFetch from '@/utils/useFetch';
//import { useState } from 'react';
import styles from './groupShow.module.scss';
import CharacterCard from '../characterCard/CharacterCard';

const GroupShow = ({ id, name }: { id: number; name: string }) => {
	//const [refresh, setRefresh] = useState(false);
	const { data } = UseFetch<Group_Show>(
		`${host}/groups/list?id=${id}`,
		{
			method: 'GET',
			credentials: 'include',
		}
		//refresh
	);
	return (
		<div className={styles.container}>
			<h3>{name}</h3>
			{data && (
				<div className={styles.arene}>
					<div className={styles.arene_team}>
						<p>Good</p>
						{data.characters.map((character) => (
							<CharacterCard key={`${character.id}_character`} character={character} />
						))}
					</div>
					<div className={styles.arene_middle}>VS</div>
					<div className={styles.arene_team}>
						<p>Bad</p>
						<div>
							<p>Characters</p>
							{data.enemies.characters.length !== 0 &&
								data.enemies.characters.map((character) => <CharacterCard key={`${character.id}_character`} character={character} />)}
						</div>
						<div>
							<p>Monsters</p>
							{data.enemies.monsters.length !== 0 &&
								data.enemies.monsters.map((monster) => <div key={`${monster.id}_monster`}>{monster.name}</div>)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GroupShow;
