// import styles from './players.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPlayers, getUser, getUserTimer } from '@/router/selectors';
// import PlayersContainer from '@/components/playersContainer/PlayersContainer';
// import { useEffect } from 'react';
// import { AppDispatch, store } from '@/router/store';
// import { fetchPlayers, fetchPlayersDiplo } from './playersSlice';
// import { loginSlice } from '../login/loginSlice';

// export type modale = {
//    id: string;
//    isOpen: boolean;
// };

// function Players() {
//    const dispatch = useDispatch<AppDispatch>();
//    const { loading, players, error } = useSelector(getPlayers);
//    const { realm, realms } = useSelector(getUser);
//    const timer = useSelector(getUserTimer);

//    useEffect(() => {
//       if (Object.keys(players).length === 0) {
//          console.log('No PlayersList Loaded');
//          store.dispatch(loginSlice.actions.updateTimer(Date.now() + 43200000));
//          if (realms.length === 1) {
//             dispatch(fetchPlayers(realm));
//          } else {
//             realms.map((el: string) => dispatch(fetchPlayersDiplo(el)));
//          }
//       }
//    }, []); // eslint-disable-line

//    if (timer !== 0 && Number(timer) - Date.now() < 0) {
//       console.log('TimeOut : Reload');
//       store.dispatch(loginSlice.actions.updateTimer(Date.now() + 43200000));
//       if (realms.length === 1) {
//          dispatch(fetchPlayers(realm));
//       } else {
//          realms.map((el: string) => dispatch(fetchPlayersDiplo(el)));
//       }
//    }

//    return (
//       <div className={styles.container}>
//          {error ? (
//             <div>Error : {error}</div>
//          ) : loading ? (
//             <div className={styles.loaderContainer}>
//                <span className={styles.loader}></span>
//             </div>
//          ) : (
//             <PlayersContainer players={players} />
//          )}
//       </div>
//    );
// }

// export default Players;
