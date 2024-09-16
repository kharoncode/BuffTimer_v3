import { useDispatch, useSelector } from 'react-redux';
import styles from './editPlayer.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { getPlayer, getPlayersList } from '@/router/selectors';
import { AppDispatch } from '@/router/store';
import { deletePlayerBuff } from '@/pages/players/playersSlice';
import { player, players, spell } from '@/utils/formatPlayer';

const RemoveSpell = () => {
   const { id } = useSelector(getPlayer);
   const dispatch = useDispatch<AppDispatch>();
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const players: players = useSelector(getPlayersList);
   const player: player = players[id];
   const activeSpellsList: spell[] = [];
   Object.values(player.spells).map((el) => {
      if (el.date !== null) {
         activeSpellsList.push(el);
      }
   });

   const [checkedList, setCheckedList] = useState<string[]>([]);

   const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.id;
      const isChecked = e.target.checked;

      if (isChecked) {
         setCheckedList([...checkedList, value]);
      } else {
         const filteredList = checkedList.filter(
            (item: string) => item !== value
         );
         setCheckedList(filteredList);
      }
   };

   const handleSubmit = (e: FormEvent<HTMLFormElement>, id: string) => {
      e.preventDefault();
      setLoading(true);
      if (checkedList.length !== 0) {
         const result = {
            id: id,
            list: checkedList,
         };
         dispatch(deletePlayerBuff(result)).then(() => {
            setLoading(false);
            setError(false);
         });
      } else {
         setLoading(false);
         setError(true);
      }
   };

   return (
      <div className={styles.container}>
         {activeSpellsList.length !== 0 ? (
            <form
               className={styles.form}
               onSubmit={(e) => {
                  handleSubmit(e, player.id);
               }}
            >
               <h3>Supprimer un sort</h3>
               <div className={styles.checkboxContainerSpell}>
                  {activeSpellsList.map((el) =>
                     el.date === null ? (
                        <></>
                     ) : (
                        <div
                           key={`${el.id}-checkbox`}
                           className={styles.checkboxSpell}
                        >
                           <label htmlFor={`${el.id}Input`}>{el.name}</label>
                           <input
                              type="checkbox"
                              id={`${el.id}`}
                              name="spellsCheckbox"
                              onChange={(e) => {
                                 handleSelect(e);
                              }}
                           />
                        </div>
                     )
                  )}
               </div>
               <button type="submit" className={styles.button}>
                  {isLoading ? 'Loading ...' : 'Envoyer'}
               </button>
               {error ? (
                  <div className={styles.error}>
                     Tu n'as sélectionné aucun sort à supprimer !
                  </div>
               ) : (
                  ''
               )}
            </form>
         ) : (
            <h3>{player.name} n'a pas de Buff</h3>
         )}
      </div>
   );
};

export default RemoveSpell;
