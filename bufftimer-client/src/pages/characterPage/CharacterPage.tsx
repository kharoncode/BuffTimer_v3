import host from '@/services/host';
import { Character } from '@/services/types/character';
import UseFetch from '@/utils/useFetch';
import { useSearchParams } from 'react-router-dom';
import styles from './characterPage.module.scss';
import { enum_realm as er } from '../../../../bt_enum/enum_character';
import CharactersList from '@/components/character/charactersList/CharactersList';
import CharacterCard from '@/components/character/characterCard/CharacterCard';
import { useEffect, useState } from 'react';
import GroupsList from '@/components/character/groupsList/GroupsList';

const CharacterPage = () => {
	const [searchParams] = useSearchParams();
	const [windowContent, setWindow] = useState<'realm' | 'groupes' | 'favoris'>('realm');
	const id = searchParams.get('id');
	const { data } = UseFetch<{ character: Character; characterRealmList: Character[] }>(`${host}/characters?id=${id}`, {
		method: 'GET',
		credentials: 'include',
	});

	useEffect(() => {
		setWindow('realm');
	}, [id]);

	if (data) {
		const { character, characterRealmList } = data;

		return (
			<div className={styles.container}>
				<CharacterCard character={character} />
				<div className={styles.dashboard}>
					<div className={styles.dashboard_menu}>
						<div className={styles.dashboard_menu__item} onClick={() => setWindow('realm')}>
							<img src={`/pictures/realms/${character.enum_realm}.png`} alt={er.ToString(character.enum_realm)} />
							<p className={windowContent === 'realm' ? styles.active : ''}>{er.ToString(character.enum_realm)}</p>
						</div>
						<div className={styles.dashboard_menu__item} onClick={() => setWindow('groupes')}>
							<p className={windowContent === 'groupes' ? styles.active : ''}>Groupes</p>
						</div>
						<div className={styles.dashboard_menu__item} onClick={() => setWindow('favoris')}>
							<p className={windowContent === 'favoris' ? styles.active : ''}>Favoris</p>
						</div>
					</div>
					<div className={styles.dashboard_window}>
						{windowContent === 'realm' && <CharactersList list={characterRealmList} />}
						{windowContent === 'groupes' && <GroupsList id={character.id} />}
						{windowContent === 'favoris' && <div>Favoris</div>}
					</div>
				</div>
			</div>
		);
	}
};

export default CharacterPage;
