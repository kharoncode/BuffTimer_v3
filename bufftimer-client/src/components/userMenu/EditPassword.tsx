// import { useDispatch, useSelector } from 'react-redux';
// import styles from './editUser.module.css';
// import { FormEvent, useState } from 'react';
// import { getUser } from '@/router/selectors';
// import { AppDispatch } from '@/router/store';
// import { uptadeUserPassword } from '@/pages/login/loginSlice';

// const EditPassword = () => {
//    const dispatch = useDispatch<AppDispatch>();
//    const [isLoading, setLoading] = useState(false);
//    const [error, setError] = useState(false);
//    const { id } = useSelector(getUser);

//    const handleSubmitUpdateUserPassword = (e: FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       setLoading(true);
//       const newPassword = e.currentTarget.newPassword.value;
//       const passwordBis = e.currentTarget.passwordBis.value;
//       if (newPassword === passwordBis) {
//          const result = {
//             id: id,
//             password: newPassword,
//          };
//          dispatch(uptadeUserPassword(result)).then(() => setLoading(false));
//       } else {
//          setLoading(false);
//          setError(true);
//       }
//    };

//    return (
//       <div className={styles.container}>
//          <form
//             className={styles.form}
//             onSubmit={(e) => {
//                handleSubmitUpdateUserPassword(e);
//             }}
//          >
//             <h3>Modifier le Mot de Passe</h3>
//             <div className={styles.inputContainer}>
//                <label htmlFor={`newPassword`}>Nouveau Mot de Passe</label>
//                <input type="password" id={`newPassword`} required />
//             </div>
//             <div className={styles.inputContainer}>
//                <label htmlFor={`passwordBis`}>Confirmer le Mot de Passe</label>
//                <input type="password" id={`passwordBis`} required />
//             </div>
//             <button type="submit" className={styles.button}>
//                {isLoading ? 'Loading ...' : 'Envoyer'}
//             </button>
//          </form>
//          {error ? (
//             <div className={styles.error}>
//                Les mots de passes ne sont pas identique !
//             </div>
//          ) : (
//             ''
//          )}
//       </div>
//    );
// };

// export default EditPassword;
