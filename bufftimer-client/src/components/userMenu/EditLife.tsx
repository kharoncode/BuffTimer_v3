// import { useDispatch, useSelector } from 'react-redux';
// import styles from './editUser.module.css';
// import { FormEvent, useState } from 'react';
// import { getPlayersList, getUser } from '@/router/selectors';
// import { AppDispatch } from '@/router/store';
// import { uptadeUserPlayerLife } from '@/pages/players/playersSlice';

// const EditLife = () => {
//    const dispatch = useDispatch<AppDispatch>();
//    const [isLoading, setLoading] = useState(false);
//    const { id } = useSelector(getUser);
//    const players = useSelector(getPlayersList);
//    const { life } = players[id];

//    const handleSubmitUpdateUserLife = (e: FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       setLoading(true);
//       const result = {
//          id: id,
//          life: {
//             currentLife: parseInt(e.currentTarget.currentLife.value),
//             maxLife: parseInt(e.currentTarget.maxLife.value),
//          },
//       };
//       dispatch(uptadeUserPlayerLife(result)).then(() => setLoading(false));
//    };

//    return (
//       <div className={styles.container}>
//          <form
//             className={styles.form}
//             onSubmit={(e) => {
//                handleSubmitUpdateUserLife(e);
//             }}
//          >
//             <h3>Modifier la vie</h3>

//             <div className={styles.inputContainer}>
//                <label htmlFor={`currentLife`}>PV :</label>
//                <input
//                   className={styles.inputLife}
//                   type="text"
//                   id={`currentLife`}
//                   required
//                   defaultValue={life.currentLife}
//                />
//             </div>
//             <div className={styles.inputContainer}>
//                <label htmlFor={`maxLife`}>PV Max :</label>
//                <input
//                   className={styles.inputLife}
//                   type="text"
//                   id={`maxLife`}
//                   required
//                   defaultValue={life.maxLife}
//                />
//             </div>
//             <button type="submit" className={styles.button}>
//                {isLoading ? 'Loading ...' : 'Envoyer'}
//             </button>
//          </form>
//       </div>
//    );
// };

// export default EditLife;
