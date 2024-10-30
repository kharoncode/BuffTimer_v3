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
						<iframe
							width="500"
							height="400"
							src={`https://www.youtube.com/embed/3LtkjbzNfyA`}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							title="Embedded youtube"
						/>
					</div>
				</article>
			</section>
		</div>
	);
}

export default Home;
