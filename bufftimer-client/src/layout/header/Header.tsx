import { NavLink, useNavigate } from 'react-router-dom';
import styles from './header.module.scss';
import { useEffect, useState } from 'react';
import LoginModal from '../../components/login/login-modal/LoginModal';
import host from '../../services/host';
import infoIcone from '@assets/icones/info.svg';
import CharacterHeader from '@/components/header/characterHeader/CharacterHeader';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, getUser, getUserCharacters } from '@/router/selectors';
import { authSlice, checkAuth as cA } from '@/router/slice/authSlice';
import { AppDispatch, store } from '@/router/store';
import { userCharacters, userSlice } from '@/router/slice/userSlice';

const Header = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const user = useSelector(getUser);
	const isAuth = useSelector(checkAuth);
	const characterList = useSelector(getUserCharacters);

	const [isOpen, setIsOpen] = useState(false);

	const logOut = async () => {
		const resp = await fetch(`${host}/auth/logout`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
		});
		if (resp.ok) {
			dispatch(cA());
			store.dispatch(authSlice.actions.resetLogin());
			store.dispatch(userSlice.actions.resetLogin());
			navigate('/');
		}
	};

	useEffect(() => {
		console.log('Init Header');
		dispatch(cA());
		dispatch(userCharacters());
	}, []);

	return (
		<header>
			<nav className={styles.header_nav}>
				<NavLink className={`${styles.header_logo} ${styles.header_link}`} to={'/'}>
					BuffTimer
				</NavLink>
				{isAuth ? (
					<>
						{characterList.map((character) => (
							<NavLink
								key={character.id}
								to={`/auth/character?id=${character.id}&sphere=${character.sphere}`}
								className={styles.header_authItem}
							>
								<CharacterHeader character={character} />
							</NavLink>
						))}

						<NavLink to="/auth/profile" className={`${styles.header_link} ${styles.welcome}`}>
							Welcome {user.username}
						</NavLink>
					</>
				) : (
					<></>
				)}
			</nav>
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
