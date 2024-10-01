import host from '@/services/host';
import { Group } from '@/services/types/groups';
import UseFetch from '@/utils/useFetch';
import styles from './groupsList.module.scss';
import Modal from '@/components/modal/Modal';
import { useEffect, useState } from 'react';
import GroupForm from '../groupForm/GroupForm';
import GroupShow from '../groupShow/GroupShow';

const GroupsList = ({ id }: { id: number }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [groupSelected, setGroupSelected] = useState(0);
	const { data } = UseFetch<Group[]>(
		`${host}/groups?id=${id}`,
		{
			method: 'GET',
			credentials: 'include',
		},
		refresh
	);

	useEffect(() => {
		setGroupSelected(0);
	}, [id]);

	const handleDelete = async () => {
		const resp = await fetch(`${host}/groups`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id }),
		});

		if (resp.ok) {
			setRefresh((prev) => !prev);
		}
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.container_nav}>
					<button className="btn" onClick={() => setIsOpen(true)}>
						Ajouter un group
					</button>
					<div className={styles.container_list}>
						{data && data.length !== 0 ? (
							data.map((group) => (
								<div onClick={() => setGroupSelected(group.group_id)} key={group.group_id}>
									<p>{group.group_name}</p>
									<svg
										className={`${styles.option_icone} ${styles.option_icone_delete}`}
										onClick={handleDelete}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 448 512"
									>
										<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
									</svg>
								</div>
							))
						) : (
							<p>Pas de Groupes</p>
						)}
					</div>
				</div>
				<div className={styles.container_right}>
					{data && groupSelected !== 0 && (
						<GroupShow id={groupSelected} name={data?.filter((el) => el.group_id === groupSelected)[0].group_name} />
					)}
				</div>
			</div>
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					<GroupForm character_id={id} setIsOpen={setIsOpen} onSuccess={setRefresh} />
				</Modal>
			)}
		</>
	);
};

export default GroupsList;
