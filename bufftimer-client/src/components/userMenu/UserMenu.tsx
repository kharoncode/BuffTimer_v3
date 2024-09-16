import EditFavoris from './EditFavoris';
import EditLife from './EditLife';
import EditPassword from './EditPassword';
import EditUser from './EditUser';
import styles from './userMenu.module.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import closeIcone from '@assets/icones/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers, fetchPlayersDiplo } from '@/pages/players/playersSlice';
import { AppDispatch, store } from '@/router/store';
import { useState } from 'react';
import { getUser } from '@/router/selectors';
import EditMessage from './EditMessage';
import { loginSlice } from '@/pages/login/loginSlice';

const Section = (props: { section: string | undefined }) => {
   const { section } = props;
   const navigate = useNavigate();

   return (
      <div className={styles.modale}>
         <img
            src={closeIcone}
            alt="Retour"
            className={styles.backButton}
            onClick={() => {
               navigate('/user/menu');
            }}
         />
         {section === 'editUser' ? (
            <EditUser />
         ) : section === 'editMessage' ? (
            <EditMessage />
         ) : section === 'editLife' ? (
            <EditLife />
         ) : section === 'editFavoris' ? (
            <EditFavoris />
         ) : section === 'editPassword' ? (
            <EditPassword />
         ) : (
            <Navigate to="/user/menu" />
         )}
      </div>
   );
};

export const UserMenu = () => {
   const { section } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();
   const [confirmation, setconfirmation] = useState(false);
   const { realms, realm } = useSelector(getUser);
   return section === 'menu' ? (
      <div className={styles.container}>
         <button
            className={styles.button}
            onClick={() => navigate('/user/editUser')}
         >
            Editer le Profile
         </button>
         <button
            className={styles.button}
            onClick={() => navigate('/user/editMessage')}
         >
            Changer son MdJ
         </button>
         <button
            className={styles.button}
            onClick={() => navigate('/user/editLife')}
         >
            Editer la Vie
         </button>
         <button
            className={styles.button}
            onClick={() => navigate('/user/editFavoris')}
         >
            Editer les Favoris
         </button>
         <button
            className={styles.button}
            onClick={() => navigate('/user/editPassword')}
         >
            Changer le Mot de Passe
         </button>
         <div className={styles.buttonContainer}>
            {confirmation ? (
               <button
                  className={styles.buttonConfirmation}
                  onClick={() => {
                     store.dispatch(
                        loginSlice.actions.updateTimer(Date.now() + 43200000)
                     );
                     if (realms.length === 1) {
                        dispatch(fetchPlayers(realm));
                     } else {
                        realms.map((el: string) =>
                           dispatch(fetchPlayersDiplo(el))
                        );
                     }
                     setconfirmation(false);
                  }}
               >
                  Confirmer ?
               </button>
            ) : (
               <button
                  className={styles.buttonReload}
                  onClick={() => {
                     setconfirmation(true);
                  }}
               >
                  Recharger les données des joueurs
               </button>
            )}
         </div>
      </div>
   ) : (
      <Section section={section} />
   );
};

export default UserMenu;
