import LifeBar from '@components/lifeBar/lifeBar';
import styles from './playerCard.module.css';
import type { player } from '@/utils/formatPlayer';
import editIcone from '@assets/icones/edit.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import SpellCard from '../spellCard/SpellCard';
import { store } from '@/router/store';
import { playerSlice } from '@/pages/player/playerSlice';

type data = {
   player: player;
};

const SpellContainer = styled.div<{ $flex: string }>`
   align-self: flex-end;
   width: 85%;
   display: flex;
   ${({ $flex }) => $flex}
   @media (max-width: 700px) {
      width: 100%;
   }
`;

const PlayerCard: React.FC<data> = (data: data) => {
   const navigate = useNavigate();
   const { player } = data;
   const [isOpen, setOpen] = useState(false);
   const style: string = isOpen
      ? `flex-direction: column;
   align-items: center;
   gap: 5px;`
      : `flex-direction: row;
   gap: 10px;`;

   return (
      <div id={`${player.id}Card`} className={styles.container}>
         <div className={styles.status}>
            <img
               src={editIcone}
               alt="Edit"
               className={styles.editButton}
               onClick={() => {
                  store.dispatch(playerSlice.actions.addId(player.id));
                  navigate(`/player/menu/${player.id}`);
               }}
            />
            <img
               className={styles.playerPicture}
               src={player.picture}
               alt={player.name}
            ></img>
            <div className={styles.title}>{player.name}</div>
            <LifeBar life={player.life} />
         </div>
         <SpellContainer
            onClick={() => {
               setOpen(!isOpen);
            }}
            $flex={style}
         >
            {Object.values(player.spells).map((el) =>
               el.date === null ? (
                  <></>
               ) : (
                  <SpellCard
                     key={`${player.id}-${el.id}-spell`}
                     id={el.id}
                     playerId={player.id}
                     name={el.name}
                     category={el.category}
                     date={Number(el.date)}
                     isOpen={isOpen}
                  />
               )
            )}
         </SpellContainer>
      </div>
   );
};

export default PlayerCard;
