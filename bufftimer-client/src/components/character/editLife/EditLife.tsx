import { ChangeEvent, useState } from 'react';
import LifeBar from '../lifeBar/lifeBar';
import styles from './editLife.module.scss';
import host from '@/services/host';

type Type_EditLife = {
	id: number;
	currentLife: number;
	maxLife: number;
	refresh: React.Dispatch<React.SetStateAction<number>>;
};

const EditLife = ({ id, currentLife, maxLife, refresh }: Type_EditLife) => {
	const [life, setLife] = useState({ currentLife: currentLife, maxLife: maxLife, pourcent: (currentLife * 100) / maxLife });

	const handleChangeRange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.currentTarget.value);
		const newCurrentLife = Math.round((value * maxLife) / 100);
		setLife({ ...life, currentLife: newCurrentLife, pourcent: value });
	};

	const handleSubmitRange = async () => {
		const resp = await fetch(`${host}/characters`, {
			method: 'PATCH',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id, update_character: { current_life: life.currentLife } }),
		});

		if (resp.ok) {
			refresh(life.currentLife);
		}
	};

	const handleSubmitHeal = async () => {
		const heal_el = document.getElementById('heal') as HTMLInputElement;
		if (heal_el) {
			const value = Number(heal_el.value);
			if (value > 0) {
				let newCurrentLife = life.currentLife + value;
				if (newCurrentLife > maxLife) {
					newCurrentLife = maxLife;
				}
				setLife({ ...life, currentLife: newCurrentLife });

				const resp = await fetch(`${host}/characters`, {
					method: 'PATCH',
					credentials: 'include',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ id: id, update_character: { current_life: newCurrentLife } }),
				});

				if (resp.ok) {
					refresh(life.currentLife);
				}
			}
		}
	};
	return (
		<div className={styles.container}>
			<h4>Modifier les PVs</h4>
			<div className={styles.inputContainer}>
				<label htmlFor="heal">Faire un soin</label>
				<input className={styles.inputContainer_heal} min={0} defaultValue={0} type="number" id="heal" name="heal" />
				<button className="btn" onClick={handleSubmitHeal}>
					Soigner
				</button>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="state">Modifier l'Etat</label>
				<LifeBar life={{ currentLife: life.currentLife, maxLife: life.maxLife }} />
				<input
					className={styles.inputContainer_range}
					type="range"
					id="state"
					name="state"
					list="markers"
					min={0}
					max={100}
					step={10}
					value={life.pourcent}
					onChange={handleChangeRange}
				/>
				<datalist id="markers">
					<option value="0" label="Mort"></option>
					<option value="10" label="Mortelle"></option>
					<option value="20"></option>
					<option value="30" label="Grave"></option>
					<option value="40"></option>
					<option value="50" label="Moyennes"></option>
					<option value="60"></option>
					<option value="70" label="Légères"></option>
					<option value="80"></option>
					<option value="90" label="Superficielle"></option>
					<option value="100" label="Aucune"></option>
				</datalist>
				<button className="btn" onClick={handleSubmitRange}>
					Valider
				</button>
			</div>
		</div>
	);
};

export default EditLife;
