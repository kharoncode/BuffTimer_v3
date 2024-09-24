// import styles from './playerMenu.module.css';
// import { Navigate, useNavigate, useParams } from 'react-router-dom';
// import closeIcone from '@assets/icones/close.svg';
// import AddNewSpell from './AddNewSpell';
// import RemoveSpell from './RemoveSpell';
// import AddCurrentSpell from './AddCurrentSpell';
// import AddSkill from './AddSkill';
// import AddHeal from './AddHeal';

// const Section = (props: {
//    section: string | undefined;
//    id: string | undefined;
// }) => {
//    const { section, id } = props;
//    const path = `/player/menu/${id}`;
//    const navigate = useNavigate();
//    return (
//       <div className={styles.modale}>
//          <img
//             src={closeIcone}
//             alt="Retour"
//             className={styles.backButton}
//             onClick={() => {
//                navigate(path);
//             }}
//          />
//          {section === 'addNewSpell' ? (
//             <AddNewSpell />
//          ) : section === 'addCurrentSpell' ? (
//             <AddCurrentSpell />
//          ) : section === 'removeSpell' ? (
//             <RemoveSpell />
//          ) : section === 'addSkill' ? (
//             <AddSkill />
//          ) : section === 'addHeal' ? (
//             <AddHeal />
//          ) : (
//             <Navigate to={path} />
//          )}
//       </div>
//    );
// };

// export const PlayerMenu = () => {
//    const { section, id } = useParams();
//    const navigate = useNavigate();
//    return section === 'menu' ? (
//       <div className={styles.container}>
//          <button
//             className={styles.button}
//             onClick={() => navigate(`/player/addNewSpell/${id}`)}
//          >
//             Ajouter un nouveau sort
//          </button>
//          <button
//             className={styles.button}
//             onClick={() => navigate(`/player/addCurrentSpell/${id}`)}
//          >
//             Ajouter un sort en cours
//          </button>
//          <button
//             className={styles.button}
//             onClick={() => navigate(`/player/removeSpell/${id}`)}
//          >
//             Supprimer un sort
//          </button>
//          <button
//             className={styles.button}
//             onClick={() => navigate(`/player/addSkill/${id}`)}
//          >
//             Ajouter une compétence
//          </button>
//          <button
//             className={styles.button}
//             onClick={() => navigate(`/player/addHeal/${id}`)}
//          >
//             Modifier la vie
//          </button>
//       </div>
//    ) : (
//       <Section section={section} id={id} />
//    );
// };

// export default PlayerMenu;
