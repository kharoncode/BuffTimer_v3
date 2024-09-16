import { useDispatch, useSelector } from 'react-redux';
import styles from './editPlayer.module.css';
import { FormEvent, useState } from 'react';
import { getPlayer, getPlayers } from '@/router/selectors';
import { AppDispatch } from '@/router/store';
import { uptadeUserPlayerLife } from '@/pages/players/playersSlice';

const AddHeal = () => {
   const { id } = useSelector(getPlayer);
   const { players } = useSelector(getPlayers);
   const dispatch = useDispatch<AppDispatch>();
   const [isLoading, setLoading] = useState(false);
   const [select, setSelect] = useState('heal');
   const { currentLife, maxLife } = players[id].life;

   const handleSubmit = (e: FormEvent<HTMLFormElement>, id: string) => {
      e.preventDefault();
      setLoading(true);
      const life =
         select === 'heal'
            ? currentLife +
                 Number(
                    e.currentTarget.addLife.value > 0
                       ? e.currentTarget.addLife.value
                       : 0
                 ) >
              maxLife
               ? maxLife
               : currentLife +
                 Number(
                    e.currentTarget.addLife.value > 0
                       ? e.currentTarget.addLife.value
                       : 0
                 )
            : Math.round((Number(e.currentTarget.state.value) / 100) * maxLife);
      const result = {
         id: id,
         life: {
            currentLife: life,
            maxLife: maxLife,
         },
      };
      dispatch(uptadeUserPlayerLife(result)).then(() => setLoading(false));
   };

   return (
      <div className={styles.container}>
         <form
            className={styles.form}
            onSubmit={(e) => {
               handleSubmit(e, id);
            }}
         >
            <h3>Modifier la vie</h3>
            <select
               className={styles.select}
               name="healSelect"
               id="healSelect"
               onChange={(e) => setSelect(e.target.value)}
            >
               <option value="heal">Soigner</option>
               <option value="editLife">Changer l'état</option>
            </select>
            {select === 'heal' ? (
               <div className={styles.inputContainer}>
                  <label htmlFor={`addLife`}>Montant du soin</label>
                  <input
                     className={styles.inputText}
                     type="text"
                     id={`addLife`}
                     defaultValue={0}
                     required
                  />
               </div>
            ) : select === 'editLife' ? (
               <div>
                  <select className={styles.select} name="state" id="state">
                     <option value={90}>Superficielle </option>
                     <option value={70}>Légères</option>
                     <option value={50}>Moyennes</option>
                     <option value={30}>Grave</option>
                     <option value={10}>Mortelle</option>
                  </select>
               </div>
            ) : (
               <></>
            )}

            <button type="submit" className={styles.button}>
               {isLoading ? 'Loading ...' : 'Modifier'}
            </button>
         </form>
      </div>
   );
};

export default AddHeal;
