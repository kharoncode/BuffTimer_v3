import Select from '@/components/select/Select';
import { enum_spell, enum_spell_data as esd } from '../../../../../bt_enum/enum_spell';
import styles from './editSpell.module.scss';
import { Spell } from '@/services/types/spell';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import host from '@/services/host';
import { useSelector } from 'react-redux';
import { getUserCharacters } from '@/router/selectors';

type Type_EditSpell = {
	characterId: number;
	spellList: Spell[];
	setRefresh: React.Dispatch<React.SetStateAction<Spell[]>>;
};

const EditSpell = ({ characterId, spellList, setRefresh }: Type_EditSpell) => {
	const params = useParams();
	const casterId = Number(params.id);

	const casterSphereRaw = useSelector(getUserCharacters).filter((character) => character.id === casterId)[0].sphere;
	const casterSphere = casterSphereRaw
		.toString()
		.split('')
		.map((el) => Number(el));

	const [spell, setSpell] = useState(0);
	const [isCurrentSpell, setIsCurrentSpell] = useState(0);
	const [currentSpellTime, setCurrentSpellTime] = useState({ day: 0, hour: 0, minute: 1 });
	const [isCritical, setIsCritical] = useState(false);
	const [selectReset, setSelectReset] = useState(false);

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

	const optionsAll = Object.keys(enum_spell)
		.filter((key) => typeof enum_spell[key as keyof typeof enum_spell] === 'number')
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
				isCritical: isCritical ? 1.5 : 1,
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
				const newSpell: Spell[] = await resp.json();
				setRefresh(() => {
					const newList = [...spellList];
					newList.push(newSpell[0]);
					return newList;
				});
				setSelectReset((prev) => !prev);
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
			setRefresh((prev) => prev.filter((spell) => spell.id != activeSpellId));
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
				<Select options={isCurrentSpell ? optionsAll : options} initOption="Selectionner un sort" onChange={setSpell} reset={selectReset} />
				<div className={styles.isCurrentSpell}>
					<label htmlFor="isCurrentSpell">Sort en court ?</label>
					<select onChange={(event) => setIsCurrentSpell(Number(event.currentTarget.value))} name="isCurrentSpell" id="isCurrentSpell">
						<option value={0}>non</option>
						<option value={1}>oui</option>
					</select>
				</div>
				{isCurrentSpell === 0 && (
					<div className={styles.critical}>
						<label htmlFor="critical">Réussite Critique</label>
						<input onChange={(event) => setIsCritical(event.currentTarget.checked)} type="checkbox" id="critical" name="critical" />
					</div>
				)}
				{isCurrentSpell === 1 && (
					<div className={styles.currentSpellForm}>
						Entrez la durée:
						<div className={styles.currentSpellForm_item}>
							<label htmlFor="day">Jour</label>
							<input
								onChange={handleChangeCurrentSpellTime}
								className={styles.inputText}
								type="number"
								min={0}
								id="day"
								name="day"
								defaultValue={0}
							/>
						</div>
						<div className={styles.currentSpellForm_item}>
							<label htmlFor="hour">Heure</label>
							<input
								onChange={handleChangeCurrentSpellTime}
								className={styles.inputText}
								type="number"
								min={0}
								id="hour"
								name="hour"
								defaultValue={0}
							/>
						</div>
						<div className={styles.currentSpellForm_item}>
							<label htmlFor="minute">Minute</label>
							<input
								onChange={handleChangeCurrentSpellTime}
								className={styles.inputText}
								type="number"
								min={0}
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
