import { useSelector } from 'react-redux';
import styles from './info.module.css';
import { getPlayersList } from '@/router/selectors';
import MessageCard from '@/components/messageCard/MessageCard';

const Info = () => {
   const players = useSelector(getPlayersList);
   return (
      <div className={styles.container}>
         {Object.keys(players).map((key) => (
            <MessageCard
               key={`${players[key].id}-message`}
               name={players[key].name}
               message={players[key].message}
               picture={players[key].picture}
            />
         ))}
      </div>
   );
};

export default Info;
