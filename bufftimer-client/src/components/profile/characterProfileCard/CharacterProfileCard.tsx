import { Character } from '@/services/types/character';
import { enum_realm as er } from '../../../../../bt_enum/enum_character';
import host from '@/services/host';
import { useState } from 'react';
import Modal from '@/components/modal/Modal';
import EditCharacter from '../editCharacter/EditCharacter';
import styles from './characterProfileCard.module.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/router/store';
import { userCharacters } from '@/router/slice/userSlice';

const CharacterProfileCard = ({
	character,
	onSuccess,
}: {
	character: Character;
	onSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { name, id, picture, enum_realm, sphere } = character;
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch<AppDispatch>();

	const handleDelete = async () => {
		const resp = await fetch(`${host}/characters`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id }),
		});

		if (resp.ok) {
			onSuccess((prev) => !prev);
			dispatch(userCharacters());
		}
	};

	return (
		<>
			<div className={styles.container}>
				<img className={styles.realm} src={`/pictures/realms/${enum_realm}.png`} alt={er.ToString(enum_realm)} />
				<NavLink to={`/auth/character?id=${id}&sphere=${sphere}`}>
					<img className={styles.picture} src={picture} alt={`Picture of ${name}`} />
				</NavLink>
				<p className={styles.name}>{name}</p>

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
					<EditCharacter character={character} setIsOpen={setIsOpen} onSuccess={onSuccess} />
				</Modal>
			)}
		</>
	);
};

export default CharacterProfileCard;
