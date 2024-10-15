import Select from '@/components/select/Select';
import { enum_spell, enum_spell_data as esd } from '../../../../../bt_enum/enum_spell';
import styles from './editSpell.module.scss';
import { Spell } from '@/services/types/spell';
import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import host from '@/services/host';

type Type_EditSpell = {
	characterId: number;
	spellList: Spell[] | null;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditSpell = ({ characterId, spellList, setRefresh }: Type_EditSpell) => {
	const [searchParams] = useSearchParams();
	const casterId = Number(searchParams.get('id'));
	const casterSphere = searchParams
		.get('sphere')
		?.split('')
		.map((el) => Number(el));
	const [spell, setSpell] = useState(0);
	const [isCurrentSpell, setIsCurrentSpell] = useState(0);
	const [currentSpellTime, setCurrentSpellTime] = useState({ day: 0, hour: 0, minute: 1 });

	const options = Object.keys(enum_spell)
		.filter((key) => typeof enum_spell[key as keyof typeof enum_spell] === 'number')
		.filter((key) => casterSphere && casterSphere.includes(esd[Number(enum_spell[key as keyof typeof enum_spell])].sphere))
		.sort((a, b) => (a > b ? 1 : -1))
		.map((key) => {
			const value = Number(enum_spell[key as keyof typeof enum_spell]);
			const label = enum_spell.ToString(value as number);
			const style = styles[`addSpell_option__${esd[Number(value)].sphere}`];
			return { value: value, label: label, styles: style };
		});

	const handleChangeCurrentSpellTime = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setCurrentSpellTime({ ...currentSpellTime, [name]: Number(value) });
	};

	const handleSubmitSpell = async () => {
		if (spell != 0) {
			const data = {
				spell: { character_id: characterId, enum_spell: spell, expires_at: 0 },
				caster_id: casterId,
			};
			if (isCurrentSpell) {
				data.spell.expires_at =
					currentSpellTime.day * 86400000 + currentSpellTime.hour * 3600000 + currentSpellTime.minute * 60000 + Date.now();
			}
			const resp = await fetch(`${host}/character-spells`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (resp.ok) {
				setRefresh((prev) => !prev);
			}
		}
	};

	const handleDeleteActiveSpell = async (activeSpellId: number) => {
		const resp = await fetch(`${host}/character-spells`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: activeSpellId }),
		});

		if (resp.ok) {
			setRefresh((prev) => !prev);
		}
	};

	return (
		<div className={styles.container}>
			<h3>Ajouter/Editer des sorts</h3>
			{spellList && spellList.length !== 0 && (
				<div className={styles.spellList}>
					<h4>Liste des Sorts actifs</h4>
					{spellList.map((spell) => (
						<div className={styles.activeSpell} key={spell.id}>
							<h5 className={styles[`addSpell_option__${esd[spell.enum_spell].sphere}`]}>{enum_spell.ToString(spell.enum_spell)}</h5>
							<svg onClick={() => handleDeleteActiveSpell(spell.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
							</svg>
						</div>
					))}
				</div>
			)}
			<div className={styles.addSpell}>
				<h4>Ajouter un Sort</h4>
				<Select options={options} initOption="Selectionner un sort" onChange={setSpell} />
				<label htmlFor="isCurrentSpell">Sort en court ?</label>
				<select onChange={(event) => setIsCurrentSpell(Number(event.currentTarget.value))} name="isCurrentSpell" id="isCurrentSpell">
					<option value={0}>non</option>
					<option value={1}>oui</option>
				</select>
				{isCurrentSpell === 1 && (
					<div className={styles.inputLabel}>
						Entrez la durée:
						<div className={styles.inputContainer}>
							<label htmlFor="day">Jour</label>
							<input
								onChange={handleChangeCurrentSpellTime}
								className={styles.inputText}
								type="text"
								id="day"
								name="day"
								defaultValue={0}
							/>
						</div>
						<div className={styles.inputContainer}>
							<label htmlFor="hour">Heure</label>
							<input
								onChange={handleChangeCurrentSpellTime}
								className={styles.inputText}
								type="text"
								id="hour"
								name="hour"
								defaultValue={0}
							/>
						</div>
						<div className={styles.inputContainer}>
							<label htmlFor="minute">Minute</label>
							<input
								onChange={handleChangeCurrentSpellTime}
								className={styles.inputText}
								type="text"
								id="minute"
								name="minute"
								defaultValue={1}
							/>
						</div>
					</div>
				)}
				<button onClick={handleSubmitSpell} className={`${styles.submit} ${spell !== 0 && styles.submit_valid}`}>
					Ajouter
				</button>
			</div>
		</div>
	);
};

export default EditSpell;
