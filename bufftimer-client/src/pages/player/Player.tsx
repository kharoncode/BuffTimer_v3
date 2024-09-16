import styles from './player.module.css';
import { getPlayer, getPlayersList } from '@/router/selectors';
import { useSelector } from 'react-redux';
import PlayerCard from '@/components/playerCard/PlayerCard';
import { Navigate, Outlet } from 'react-router-dom';
import { players } from '@/utils/formatPlayer';

function Player() {
   const { id }: { id: string } = useSelector(getPlayer);
   const players: players = useSelector(getPlayersList);

   return players[id] === undefined ? (
      <Navigate to="/players" />
   ) : (
      <div className={styles.container}>
         <div className={styles.userCardContainer}>
            <PlayerCard player={players[id]} />
         </div>
         <Outlet />
      </div>
   );
}

export default Player;
