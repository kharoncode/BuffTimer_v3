import { Monster } from '@/services/types/monster';
import host from '@/services/host';
import { useState } from 'react';
import Modal from '@/components/modal/Modal';
//import EditMonster from '../editMonster/EditMonster';
import styles from './monsterProfileCard.module.scss';
import { enum_mob_picture, enum_mob as em } from '../../../../../bt_enum/enum_mob';
import EditMonster from '../editMonster/EditMonster';

const MonsterProfileCard = ({ monster, onSuccess }: { monster: Monster; onSuccess: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const { id, name, enum_mob } = monster;
	const [isOpen, setIsOpen] = useState(false);

	const handleDelete = async () => {
		const resp = await fetch(`${host}/monsters`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id }),
		});

		if (resp.ok) {
			onSuccess((prev) => !prev);
		}
	};

	return (
		<>
			<div className={styles.container}>
				<img className={styles.picture_mob} src={enum_mob_picture[enum_mob]} alt={`Picture of ${em.ToString(enum_mob)}`} />
				<p className={styles.name}>{name}</p>
				<p>{`(${em.ToString(enum_mob)})`}</p>
				<div className={styles.option}>
					<svg
						className={`${styles.option_icone} ${styles.option_icone_edit}`}
						onClick={() => {
							setIsOpen(true);
						}}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
					</svg>
					<svg
						className={`${styles.option_icone} ${styles.option_icone_delete}`}
						onClick={handleDelete}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
					>
						<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
					</svg>
				</div>
			</div>
			{isOpen && (
				<Modal setIsOpen={setIsOpen}>
					<EditMonster monster={monster} setIsOpen={setIsOpen} onSuccess={onSuccess} />
				</Modal>
			)}
		</>
	);
};

export default MonsterProfileCard;
