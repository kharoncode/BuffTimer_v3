import styles from './home.module.css';

function Home() {
	return (
		<div className={styles.container}>
			<h2>Bienvenue sur BuffTimer</h2>
			<section className={styles.section}>
				<article className={styles.article}>
					<h3>Qu'est-ce que 'BuffTimer' ?</h3>
					<p>
						"C'est une application pour visualiser facilement quel Buff est actif et sur qui. Il permet aussi de connaître l'état de santé
						des joueurs ainsi que leurs besoins."
					</p>
					<div className={styles.video}>
						<h3>
							<a href={'https://youtu.be/3LtkjbzNfyA'} target="_blank">
								Voici une vidéo de présentation du BuffTimer
							</a>
						</h3>
					</div>
				</article>
			</section>
		</div>
	);
}

export default Home;
