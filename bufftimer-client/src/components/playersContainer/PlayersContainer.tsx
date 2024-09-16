import styles from './playersContainer.module.css';
import PlayerCard from '../playerCard/PlayerCard';
import { players } from '@/utils/formatPlayer';

type data = {
   players: players;
};

const PlayersContainer = (data: data) => {
   const { players } = data;
   return (
      <div className={styles.playersContainer}>
         {Object.keys(players).map((key) => (
            <PlayerCard
               key={`${players[key].id}-player`}
               player={players[key]}
            />
         ))}
      </div>
   );
};

export default PlayersContainer;
