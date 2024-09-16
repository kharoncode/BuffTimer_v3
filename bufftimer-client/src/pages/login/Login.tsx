import { type FormEvent, type FunctionComponent } from 'react';
import styles from './login.module.css';
import { fetchUser } from './loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/router/store';
import { useNavigate } from 'react-router-dom';
import { getLogin } from '@/router/selectors';
import { fetchData } from '@/router/dataSlice';

export type loginDataType = {
   login: string;
   password: string;
};

export const Login: FunctionComponent = () => {
   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();
   const { loading, error } = useSelector(getLogin);

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const login: string = e.currentTarget.login.value.trim();
      const password: string = e.currentTarget.password.value.trim();
      const dataLog: loginDataType = { login, password };
      dispatch(fetchUser(dataLog)).then((data) => {
         if (data.meta.requestStatus === 'fulfilled') {
            dispatch(fetchData());
            navigate('/players');
         }
      });
   };

   return (
      <main className={styles.main}>
         {loading ? (
            <div className={styles.loaderContainer}>
               <span className={styles.loader}></span>
            </div>
         ) : (
            <div className={styles.container}>
               <h2>Connexion</h2>
               <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                  <div className={styles.inputContainer}>
                     <label htmlFor="login">Login</label>
                     <input type="text" id="login" name="login" />
                  </div>
                  <div className={styles.inputContainer}>
                     <label htmlFor="password">Mot de Passe</label>
                     <input type="password" id="password" name="password" />
                  </div>
                  <button type="submit" className={styles.button}>
                     Connect
                  </button>
                  {error ? (
                     <div className={styles.error}>
                        Login ou Mot de passe incorrect !
                     </div>
                  ) : (
                     ''
                  )}
               </form>
            </div>
         )}
      </main>
   );
};
