// import { useDispatch, useSelector } from 'react-redux';
// import styles from './editPlayer.module.css';
// import { FormEvent, useState } from 'react';
// import {
//    getPlayer,
//    getPlayersList,
//    getUserIntelligence,
// } from '@/router/selectors';
// import { AppDispatch } from '@/router/store';
// import { uptadePlayersBuff } from '@/pages/players/playersSlice';
// import { spellDate } from './playerMenuFactory';
// import { SpellSelect } from './SpellSelect';
// import type { player, players } from '@/utils/formatPlayer';

// const AddNewSpell = () => {
//    const { id } = useSelector(getPlayer);
//    const dispatch = useDispatch<AppDispatch>();
//    const intelligence = useSelector(getUserIntelligence);
//    const [isLoading, setLoading] = useState(false);
//    const players: players = useSelector(getPlayersList);
//    const player: player = players[id];

//    const handleSubmit = (e: FormEvent<HTMLFormElement>, id: string) => {
//       e.preventDefault();
//       setLoading(true);
//       const spell = e.currentTarget.spellList.value;
//       const submitData = {
//          spell: spell,
//          int: intelligence,
//          critic: e.currentTarget.critic.checked,
//       };
//       const result = {
//          id: id,
//          spell: spell,
//          date: spellDate(submitData).toString(),
//       };
//       dispatch(uptadePlayersBuff(result)).then(() => setLoading(false));
//    };

//    return (
//       <div className={styles.container}>
//          <form
//             className={styles.form}
//             onSubmit={(e) => {
//                handleSubmit(e, player.id);
//             }}
//          >
//             <h3>Ajouter un nouveau sort</h3>
//             <SpellSelect />
//             <div className={styles.checkbox}>
//                <label htmlFor={`critic`}>Réussite Critique ?</label>
//                <input type="checkbox" id={`critic`} />
//             </div>
//             <button type="submit" className={styles.button}>
//                {isLoading ? 'Loading ...' : 'Ajouter un sort'}
//             </button>
//          </form>
//       </div>
//    );
// };

// export default AddNewSpell;
