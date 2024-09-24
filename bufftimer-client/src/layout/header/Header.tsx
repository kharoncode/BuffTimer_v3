import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';
import { useState } from 'react';
import LoginModal from '../../components/login/login-modal/LoginModal';
import host from '../../services/host';
import { useAuth } from '../../utils/useAuth';
import { User } from '../../services/types/user';
import UseFetch from '../../utils/useFetch';
import infoIcone from '@assets/icones/info.svg';
import { Character } from '@/services/types/character';
import CharacterHeader from '@/components/header/characterHeader/CharacterHeader';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { isAuth, setLogout } = useAuth();
	const { data: characters } = UseFetch<Character[]>(`${host}/characters`, {
		method: 'GET',
		credentials: 'include',
	});

	const logOut = async () => {
		await fetch(`${host}/auth/logout`, { method: 'POST', credentials: 'include' }).then((resp) => {
			if (resp.ok) {
				setLogout();
			}
		});
	};

	const ProfilLink: React.FC = () => {
		const { data: user } = UseFetch<User>(`${host}/users`, { credentials: 'include' });
		return (
			user && (
				<NavLink to="/auth/profile" className={`${styles.header_link} ${styles.welcome}`}>
					Welcome {user.username}
				</NavLink>
			)
		);
	};

	return (
		<header>
			<nav className={styles.header_nav}>
				<NavLink className={`${styles.header_logo} ${styles.header_link}`} to={'/'}>
					BuffTimer
				</NavLink>
				{isAuth && characters ? (
					<>
						{characters.map((character) => (
							<NavLink key={character.id} to={`/auth/character?id=${character.id}`} className={styles.header_authItem}>
								<CharacterHeader character={character} />
							</NavLink>
						))}

						<ProfilLink />
					</>
				) : (
					<></>
				)}
			</nav>
			{/* {isAuth && <UserComponent />} */}
			<div className={styles.header_right}>
				{isAuth && (
					<NavLink to="/auth/settings" className={styles.header_authItem}>
						<img src={infoIcone} alt="infoIcone" />
						<div className={styles.header_link}>Settings</div>
					</NavLink>
				)}
				{isAuth ? (
					<div className={styles.header_link} onClick={logOut}>
						Logout
					</div>
				) : (
					<div className={styles.header_link} onClick={() => setIsOpen(true)}>
						Login
					</div>
				)}
			</div>
			<LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</header>
	);
};

export default Header;
