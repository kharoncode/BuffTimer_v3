import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';
import { useState } from 'react';
import LoginModal from '../../components/login/login-modal/LoginModal';
import host from '../../services/host';
import { useAuth } from '../../utils/useAuth';
import { User } from '../../services/types/user';
import UseFetch from '../../utils/useFetch';
import playersIcone from '@assets/icones/players.svg';
import infoIcone from '@assets/icones/info.svg';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { isAuth, setLogout } = useAuth();

	const logOut = async () => {
		await fetch(`${host}/auth/logout`, { method: 'POST', credentials: 'include' }).then((resp) => {
			if (resp.ok) {
				setLogout();
			}
		});
	};

	const ProfilLink: React.FC = () => {
		const { data: user } = UseFetch<User[]>(`${host}/users`, { credentials: 'include' });
		return (
			user && (
				<NavLink to="/auth/profile" className={`${styles.header_link} ${styles.welcome}`}>
					Welcome {user[0].username}
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
				{isAuth ? (
					<>
						<NavLink to="/players" className={styles.header_authItem}>
							<img src={playersIcone} alt="playerIcone" />
							<div className={styles.header_link}>Personnages</div>
						</NavLink>
						<ProfilLink />
					</>
				) : (
					<></>
				)}
			</nav>
			{/* {isAuth && <UserComponent />} */}
			<div className={styles.header_right}>
				{isAuth && (
					<NavLink to="/info" className={styles.header_authItem}>
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
