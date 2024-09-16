import styles from './home.module.css';

function Home() {
   return (
      <div className={styles.container}>
         <h2>Bienvenu sur BuffTimer</h2>
         <section className={styles.section}>
            <article className={styles.article}>
               <h3>Qu'est-ce que 'BuffTimer' ?</h3>
               <p>
                  "C'est une application pour visualiser facilement quel Buff
                  est actif et sur qui. Il permet aussi de connaître l'état de
                  santé des joueurs ainsi que leurs besoins."
               </p>
            </article>
         </section>
      </div>
   );
}

export default Home;
