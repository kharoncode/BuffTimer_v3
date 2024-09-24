// import { useDispatch, useSelector } from 'react-redux';
// import styles from './editPlayer.module.css';
// import { FormEvent, useState } from 'react';
// import { getDataSkills, getPlayer } from '@/router/selectors';
// import { AppDispatch } from '@/router/store';
// import { uptadePlayersBuff } from '@/pages/players/playersSlice';

// const AddSkill = () => {
//    const { id } = useSelector(getPlayer);
//    const dispatch = useDispatch<AppDispatch>();
//    const [isLoading, setLoading] = useState(false);
//    const [select, setSelect] = useState('');
//    const skillsList = useSelector(getDataSkills);

//    const handleSubmit = (e: FormEvent<HTMLFormElement>, id: string) => {
//       e.preventDefault();
//       setLoading(true);
//       const skill = e.currentTarget.skillSelect.value;
//       const time = skillsList[skill].time + Date.now();
//       const result = {
//          id: id,
//          spell: skill,
//          date:
//             skill === 'musique'
//                ? time.toString()
//                : `${e.currentTarget.educationName.value} ${time}`,
//       };
//       dispatch(uptadePlayersBuff(result)).then(() => setLoading(false));
//    };

//    return (
//       <div className={styles.container}>
//          <form
//             className={styles.form}
//             onSubmit={(e) => {
//                handleSubmit(e, id);
//             }}
//          >
//             <h3>Ajouter une compétence</h3>
//             <select
//                className={styles.select}
//                name="skillSelect"
//                id="skillSelect"
//                onChange={(e) => setSelect(e.target.value)}
//             >
//                <option value="musique">Musique</option>
//                <option value="enseignement">Enseignement</option>
//             </select>
//             {select === 'enseignement' ? (
//                <div className={styles.inputContainer}>
//                   <label htmlFor={`educationName`}>
//                      Nom de la compétence enseignée
//                   </label>
//                   <input
//                      className={styles.inputText}
//                      type="text"
//                      id={`educationName`}
//                      required
//                   />
//                </div>
//             ) : (
//                <></>
//             )}

//             <button type="submit" className={styles.button}>
//                {isLoading ? 'Loading ...' : 'Ajouter une compétence'}
//             </button>
//          </form>
//       </div>
//    );
// };

// export default AddSkill;
