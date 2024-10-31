import { useState } from 'react';
import styles from './characterNav.module.scss';
import { enum_realm as er } from '../../../../../bt_enum/enum_character';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserCharacters, groupRefresh } from '@/router/selectors';
import UseFetch from '@/utils/useFetch';
import { Group } from '@/services/types/groups';
import host from '@/services/host';
import Modal from '@/components/modal/Modal';
import GroupForm from '@/pages/characterPage/groups/groupForm/GroupForm';
import { store } from '@/router/store';
import { userSlice } from '@/router/slice/userSlice';

const CharacterNav = () => {
	const params = useParams();
	const refresh = useSelector(groupRefresh);
	const id = Number(params.id);
	const character = useSelector(getUserCharacters).filter((charac) => charac.id === id)[0];
	const [isGroupListOpen, setIsGroupListOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [modalChildren, setModalChildren] = useState<'add' | 'delete'>('add');
	const [selectedGroup, setSelectedGroup] = useState(0);
	const { data: groups } = UseFetch<{ characterGroups: Group[]; otherGroups: Group[] }>(
		`${host}/groups?id=${id}`,
		{
			method: 'GET',
			credentials: 'include',
		},
		refresh
	);

	const setModal = (window: 'add' | 'delete') => {
		setModalChildren(window);
		setIsOpen(true);
	};

	const handleDeleteGroup = async (group_id: number) => {
		const resp = await fetch(`${host}/groups`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: group_id }),
		});

		if (resp.ok) {
			store.dispatch(userSlice.actions.groupRefresh(!refresh));
			setIsOpen(false);
		}
	};

	return (
		<div className={styles.dashboard_menu}>
			<NavLink to={`/auth/character/${id}/realm`} className={styles.dashboard_menu__item}>
				<img
					className={styles.dashboard_menu__item__title}
					src={`/pictures/realms/${character.enum_realm}.png`}
					alt={er.ToString(character.enum_realm)}
				/>
			</NavLink>
			<div className={styles.dashboard_menu__item_group + ' ' + styles.dashboard_menu__item}>
				<p onClick={() => setIsGroupListOpen((prev) => !prev)} className={styles.dashboard_menu__item__title}>
					Groupes
				</p>
				{isGroupListOpen && (
					<div className={styles.dashboard_menu__item_group_nav}>
						<div className={styles.dashboard_menu__item_group_container}>
							<h3>Vos Groupes :</h3>
							<button
								className={styles.dashboard_menu__item_group_btn}
								onClick={() => {
									setModal('add');
								}}
							>
								Ajouter
							</button>
							<div className={styles.dashboard_menu__item_group_list}>
								{groups && groups.characterGroups.length !== 0 ? (
									groups.characterGroups.map((group) => (
										<div className={styles.groupContainer} key={group.group_id}>
											<NavLink
												to={`/auth/character/${id}/group/${group.group_id}`}
												className={`${styles.groupCard} ${styles.groupCard_active}`}
											>
												{group.group_name}
											</NavLink>
											{group.creator_id === id && (
												<svg
													className={`${styles.option_icone} ${styles.option_icone_delete}`}
													onClick={() => {
														setSelectedGroup(group.group_id);
														setModal('delete');
													}}
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 448 512"
												>
													<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
												</svg>
											)}
										</div>
									))
								) : (
									<div className={styles.no_group}>Pas de Groupe</div>
								)}
							</div>
						</div>
						<div className={styles.dashboard_menu__item_group_container}>
							<h3>Les autres groupes :</h3>
							<div className={styles.dashboard_menu__item_group_list}>
								{groups && groups.otherGroups.length !== 0 ? (
									groups.otherGroups.map((group) => (
										<NavLink to={`/auth/character/${id}/group/${group.group_id}`} className={`${styles.groupCard}`} key={group.group_id}>
											{group.group_name}
										</NavLink>
									))
								) : (
									<div className={styles.no_group}>Pas de Groupe</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
			<NavLink to={`/auth/character/${id}/favoris`} className={styles.dashboard_menu__item}>
				<p className={styles.dashboard_menu__item__title}>Favoris</p>
			</NavLink>
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					{modalChildren === 'add' ? (
						<GroupForm character_id={character.id} setIsOpen={setIsOpen} />
					) : (
						<button onClick={() => handleDeleteGroup(selectedGroup)} className="btn">
							Supprimer le groupe
						</button>
					)}
				</Modal>
			)}
		</div>
	);
};

export default CharacterNav;
