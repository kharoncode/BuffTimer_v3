import host from '@/services/host';
import { Character } from '@/services/types/character';
import UseFetch from '@/utils/useFetch';
import { useSearchParams } from 'react-router-dom';
import styles from './characterPage.module.scss';
import { enum_realm as er } from '../../../../bt_enum/enum_character';
import CharactersList from '@/components/character/charactersList/CharactersList';
import CharacterCard from '@/components/character/characterCard/CharacterCard';
import { useEffect, useState } from 'react';
import Favoris from '@/components/favoris/Favoris';
import { Group } from '@/services/types/groups';
import Modal from '@/components/modal/Modal';
import GroupForm from '@/components/character/groups/groupForm/GroupForm';
import GroupShow from '@/components/character/groups/groupShow/GroupShow';

const CharacterPage = () => {
	const [searchParams] = useSearchParams();
	const [windowContent, setWindow] = useState<'realm' | 'groupes' | 'favoris'>('realm');
	const [isOpen, setIsOpen] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [refreshCharacter, setRefreshCharacter] = useState(false);
	const [groupSelected, setGroupSelected] = useState({ id: 0, name: '' });
	const id = searchParams.get('id');
	const { data } = UseFetch<{ character: Character; characterRealmList: Character[] }>(
		`${host}/characters?id=${id}`,
		{
			method: 'GET',
			credentials: 'include',
		},
		refreshCharacter
	);

	const { data: groupList } = UseFetch<Group[]>(
		`${host}/groups?id=${id}`,
		{
			method: 'GET',
			credentials: 'include',
		},
		refresh
	);

	useEffect(() => {
		setWindow('realm');
	}, [id]);

	const handleDelete = async (group_id: number) => {
		const resp = await fetch(`${host}/groups`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: group_id }),
		});

		if (resp.ok) {
			setRefresh((prev) => !prev);
			setGroupSelected({ id: 0, name: '' });
		}
	};

	if (data) {
		const { character, characterRealmList } = data;

		return (
			<div className={styles.container}>
				<CharacterCard character={character} setRefreshCharacter={setRefreshCharacter} />
				<div className={styles.dashboard}>
					<div className={styles.dashboard_menu}>
						<div className={styles.dashboard_menu__item} onClick={() => setWindow('realm')}>
							<img src={`/pictures/realms/${character.enum_realm}.png`} alt={er.ToString(character.enum_realm)} />
						</div>
						<div className={styles.dashboard_menu__item + ' ' + styles.dashboard_menu__item_group}>
							<p className={windowContent === 'groupes' ? styles.active : ''}>Groupes</p>
							<div className={styles.dashboard_menu__item_group_nav}>
								<button className="btn" onClick={() => setIsOpen(true)}>
									Ajouter
								</button>
								<div className={styles.dashboard_menu__item_group_list}>
									{groupList && groupList.length !== 0 ? (
										groupList.map((group) => (
											<div className={styles.groupCard} key={group.group_id}>
												<div
													onClick={() => {
														setGroupSelected({ id: group.group_id, name: group.group_name });
														setWindow('groupes');
													}}
												>
													{group.group_name}
												</div>
												{group.creator_id === character.id && (
													<div className={styles.option}>
														<svg
															className={`${styles.option_icone} ${styles.option_icone_delete}`}
															onClick={() => handleDelete(group.group_id)}
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 448 512"
														>
															<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
														</svg>
													</div>
												)}
											</div>
										))
									) : (
										<div className={styles.no_group}>Pas de Groupe</div>
									)}
								</div>
							</div>
						</div>
						<div className={styles.dashboard_menu__item} onClick={() => setWindow('favoris')}>
							<p className={windowContent === 'favoris' ? styles.active : ''}>Favoris</p>
						</div>
					</div>
					<div className={styles.dashboard_window}>
						{windowContent === 'realm' && <CharactersList list={characterRealmList} setRefresh={setRefreshCharacter} />}
						{windowContent === 'groupes' && groupSelected.id !== 0 && <GroupShow group_id={groupSelected.id} name={groupSelected.name} />}
						{windowContent === 'favoris' && <Favoris id={character.id} />}
					</div>
				</div>
				{isOpen && (
					<Modal setIsOpen={setIsOpen}>
						<GroupForm character_id={character.id} setIsOpen={setIsOpen} onSuccess={setRefresh} />
					</Modal>
				)}
			</div>
		);
	}
};

export default CharacterPage;
