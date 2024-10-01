import host from '@/services/host';
import { Character as Character_type } from '@/services/types/character';
import UseFetch from '@/utils/useFetch';
import { useSearchParams } from 'react-router-dom';
import styles from './character.module.scss';
import { enum_realm as er } from '../../../../bt_enum/enum_character';
import CharactersList from '@/components/character/charactersList/CharactersList';
import CharacterCard from '@/components/character/characterCard/CharacterCard';
import { useState } from 'react';

const Character = () => {
	const [searchParams] = useSearchParams();
	const [windowContent, setWindow] = useState<'realm' | 'groupes' | 'favoris'>('realm');
	const id = searchParams.get('id');
	const { data } = UseFetch<Character_type>(`${host}/characters?id=${id}`, {
		method: 'GET',
		credentials: 'include',
	});

	const { data: characterRealmList } = UseFetch<Character_type[]>(`${host}/characters/all?realm=${data?.enum_realm}`, {
		method: 'GET',
		credentials: 'include',
	});

	return (
		data && (
			<div className={styles.container}>
				<CharacterCard character={data} />
				<div className={styles.dashboard}>
					<div className={styles.dashboard_menu}>
						<img
							onClick={() => setWindow('realm')}
							className={styles.dashboard_menu__item}
							src={`/pictures/realms/${data.enum_realm}.png`}
							alt={er.ToString(data.enum_realm)}
						/>
						<div className={styles.dashboard_menu__item} onClick={() => setWindow('groupes')}>
							Groupes
						</div>
						<div className={styles.dashboard_menu__item} onClick={() => setWindow('favoris')}>
							Favoris
						</div>
					</div>
					<div className={styles.dashboard_window}>
						{windowContent === 'realm' && characterRealmList && <CharactersList list={characterRealmList} />}
						{windowContent === 'groupes' && <div>Groupes</div>}
						{windowContent === 'favoris' && <div>Favoris</div>}
					</div>
				</div>
			</div>
		)
	);
};

export default Character;
