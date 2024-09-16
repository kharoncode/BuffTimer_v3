import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import { useSelector } from 'react-redux';
import { getAuth, getUser } from '@/router/selectors';
import { store } from '@/router/store';
import { loginSlice } from '@/pages/login/loginSlice';
import { playersSlice } from '@/pages/players/playersSlice';
import userIcone from '@assets/icones/user.svg';
import logoutIcone from '@assets/icones/logout.svg';
import loginIcone from '@assets/icones/login.svg';
import playersIcone from '@assets/icones/players.svg';
import favorisIcone from '@assets/icones/favoris.svg';
import infoIcone from '@assets/icones/info.svg';
import home from '@assets/icones/home.svg';

function Header() {
   const navigate = useNavigate();

   const auth: boolean = useSelector(getAuth);
   const user = useSelector(getUser);

   const logOut = () => {
      store.dispatch(loginSlice.actions.resetLogin());
      store.dispatch(playersSlice.actions.resetPlayers());
      navigate('/login');
   };
   return (
      <header className={styles.header}>
         <nav className={`${styles.menu}`}>
            <Link to="/" className={styles.authItem}>
               <h1>
                  <img src={home} alt="BUFFTIMER" className={styles.phone} />
                  <p className={styles.desktop}>BUFFTIMER</p>
               </h1>
            </Link>
            {auth ? (
               <div className={styles.categories}>
                  <Link to="/players" className={styles.authItem}>
                     <img src={playersIcone} alt="playerIcone" />
                     <p className={styles.desktop}>Joueurs</p>
                  </Link>
                  <Link to="/favoris" className={styles.authItem}>
                     <img src={favorisIcone} alt="favorisIcone" />
                     <p className={styles.desktop}>Favoris</p>
                  </Link>
                  <Link to="/info" className={styles.authItem}>
                     <img src={infoIcone} alt="infoIcone" />
                     <p className={styles.desktop}>Info</p>
                  </Link>
               </div>
            ) : (
               <></>
            )}
         </nav>

         {auth ? (
            <div className={styles.auth}>
               <Link to="/user/menu" className={styles.authItem}>
                  <img src={userIcone} alt="Profile" />
                  <p className={styles.desktop}>{user.name}</p>
               </Link>
               <div className={styles.authItem} onClick={() => logOut()}>
                  <img src={logoutIcone} alt="" />
                  <p className={styles.desktop}>LogOut</p>
               </div>
            </div>
         ) : (
            <div className={styles.auth}>
               <Link to="/login" className={styles.authItem}>
                  <img src={loginIcone} alt="LogLogo" />
                  <p className={styles.desktop}>LogIn</p>
               </Link>
            </div>
         )}
      </header>
   );
}

export default Header;
