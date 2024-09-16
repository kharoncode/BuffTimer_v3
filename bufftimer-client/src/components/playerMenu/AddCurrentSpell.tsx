import { useDispatch, useSelector } from 'react-redux';
import styles from './editPlayer.module.css';
import { FormEvent, useState } from 'react';
import { getPlayer, getPlayersList } from '@/router/selectors';
import { AppDispatch } from '@/router/store';
import { uptadePlayersBuff } from '@/pages/players/playersSlice';
import { SpellSelect } from './SpellSelect';
import type { player, players } from '@/utils/formatPlayer';

const AddCurrentSpell = () => {
   const { id } = useSelector(getPlayer);
   const dispatch = useDispatch<AppDispatch>();
   const [isLoading, setLoading] = useState(false);
   const players: players = useSelector(getPlayersList);
   const player: player = players[id];

   const handleSubmit = (e: FormEvent<HTMLFormElement>, id: string) => {
      e.preventDefault();
      setLoading(true);
      const spell = e.currentTarget.spellList.value;
      const day = parseInt(e.currentTarget.day.value) * 86400000;
      const houre = parseInt(e.currentTarget.hour.value) * 3600000;
      const minute = parseInt(e.currentTarget.minute.value) * 60000;
      const result = {
         id: id,
         spell: spell,
         date: (day + houre + minute + Date.now()).toString(),
      };
      dispatch(uptadePlayersBuff(result)).then(() => setLoading(false));
   };

   return (
      <div className={styles.container}>
         <form
            className={styles.form}
            onSubmit={(e) => {
               handleSubmit(e, player.id);
            }}
         >
            <h3>Ajouter un sort en cours</h3>
            <SpellSelect />
            <div className={styles.inputLabel}>
               Entrez la durée:
               <div className={styles.inputContainer}>
                  <label htmlFor={`day`}>Jour</label>
                  <input
                     className={styles.inputText}
                     type="text"
                     id={`day`}
                     required
                     defaultValue={0}
                  />
               </div>
               <div className={styles.inputContainer}>
                  <label htmlFor={`hour`}>Heure</label>
                  <input
                     className={styles.inputText}
                     type="text"
                     id={`hour`}
                     required
                     defaultValue={0}
                  />
               </div>
               <div className={styles.inputContainer}>
                  <label htmlFor={`minute`}>Minute</label>
                  <input
                     className={styles.inputText}
                     type="text"
                     id={`minute`}
                     required
                     defaultValue={1}
                  />
               </div>
            </div>
            <button type="submit" className={styles.button}>
               {isLoading ? 'Loading ...' : 'Ajouter un sort'}
            </button>
         </form>
      </div>
   );
};

export default AddCurrentSpell;
