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
	const [isGroupListOpen, setIsGroupListOpen] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [refreshCharacter, setRefreshCharacter] = useState(false);
	const initialGroup = { group_id: 0, creator_id: 0, group_name: '' };
	const [groupSelected, setGroupSelected] = useState<Group>(initialGroup);
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

	const groupRefresh = () => {
		setRefresh((prev) => !prev);
		setGroupSelected(initialGroup);
	};

	useEffect(() => {
		setWindow('realm');
	}, [id]);

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
							<p onClick={() => setIsGroupListOpen((prev) => !prev)} className={windowContent === 'groupes' ? styles.active : ''}>
								Groupes
							</p>
							{isGroupListOpen && (
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
															setGroupSelected(group);
															setWindow('groupes');
														}}
													>
														{group.group_name}
													</div>
												</div>
											))
										) : (
											<div className={styles.no_group}>Pas de Groupe</div>
										)}
									</div>
								</div>
							)}
						</div>
						<div className={styles.dashboard_menu__item} onClick={() => setWindow('favoris')}>
							<p className={windowContent === 'favoris' ? styles.active : ''}>Favoris</p>
						</div>
					</div>
					<div className={styles.dashboard_window}>
						{windowContent === 'realm' && <CharactersList list={characterRealmList} setRefresh={setRefreshCharacter} />}
						{windowContent === 'groupes' && groupSelected.group_id !== 0 && (
							<GroupShow
								group_id={groupSelected.group_id}
								group_name={groupSelected.group_name}
								creator_id={groupSelected.creator_id}
								groupRefresh={groupRefresh}
							/>
						)}
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
