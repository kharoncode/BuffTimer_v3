import { ChangeEvent, FormEvent, useState } from 'react';
import styles from '../createCharacter/createCharacter.module.scss';
import host from '@/services/host';
import ErrorMessage from '@/components/error-message/ErrorMessage';

import { enum_realm } from '../../../../../bt_enum/enum_character';
import { enum_god, enum_sphere, enum_magic_type, enum_god_sphere } from '../../../../../bt_enum/enum_mystique';
import { Character } from '@/services/types/character';
import { useAuth } from '@/utils/useAuth';

const EditCharacter = ({
	character,
	setIsOpen,
	onSuccess,
}: {
	character: Character;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const initialState = {
		name: true,
		picture: true,
		enum_realm: true,
		intelligence: true,
		max_life: true,
		current_life: true,
		enum_god: true,
		enum_magic_type: true,
		sphere: true,
	};
	const initialErrorState = {
		name: false,
		picture: false,
		enum_realm: false,
		intelligence: false,
		max_life: false,
		current_life: false,
		enum_god: false,
		enum_magic_type: false,
		sphere: false,
	};

	const initialSphere = {
		[enum_sphere.destruction]: false,
		[enum_sphere.alteration]: false,
		[enum_sphere.justice]: false,
		[enum_sphere.negation]: false,
		[enum_sphere.protection]: false,
		[enum_sphere.vitalite]: false,
	};

	character.sphere
		.toString()
		.split('')
		.map((el) => (initialSphere[Number(el)] = true));

	const { getCharacterList } = useAuth();

	const [formValid, setFormValid] = useState(initialState);
	const [formValue, setFormValue] = useState(character);
	const [formError, setFormError] = useState(initialErrorState);
	const [formSphere, setFormSphere] = useState(initialSphere);

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		if (name === 'name') {
			setFormValue({ ...formValue, [name]: value });
			setFormValid({ ...formValid, [name]: value.length > 2 ? true : false });
			setFormError({ ...formError, [name]: value.length < 3 ? true : false });
		} else if (name === 'picture') {
			const pictureRegex = /^(https:\/\/.*\.(?:png|jpg|gif|jpeg))/;
			setFormValue({ ...formValue, [name]: value });
			setFormValid({ ...formValid, [name]: pictureRegex.test(value) });
			setFormError({ ...formError, [name]: !pictureRegex.test(value) });
		} else if (name === 'enum_realm') {
			if (Number(value) === enum_realm.rdk) {
				setFormValue({ ...formValue, enum_realm: Number(value), enum_god: enum_god.keldar, enum_magic_type: enum_magic_type.divine });
				const sphere = { ...initialSphere };
				enum_god_sphere[enum_god.keldar].map((el) => (sphere[el] = true));
				setFormSphere(sphere);
				setFormValid({ ...formValid, [name]: Number(value) != 0, enum_god: true, enum_magic_type: true, sphere: true });
			} else {
				setFormValid({ ...formValid, [name]: Number(value) != 0 });
				setFormValue({ ...formValue, [name]: Number(value) });
			}
		} else if (['intelligence', 'max_life', 'current_life'].includes(name)) {
			setFormValue({ ...formValue, [name]: Number(value) });
			setFormValid({ ...formValid, [name]: Number(value) > 0 ? true : false });
			setFormError({ ...formError, [name]: Number(value) < 1 ? true : false });
		} else if (name === 'enum_god') {
			if (Number(value) === enum_god.keldar) {
				const sphere = { ...initialSphere };
				enum_god_sphere[Number(value)].map((el) => (sphere[el] = true));
				setFormSphere(sphere);
				setFormValid({ ...formValid, [name]: Number(value) != 0, enum_magic_type: true, sphere: true });
				setFormValue({ ...formValue, enum_god: enum_god.keldar, enum_magic_type: enum_magic_type.divine });
			} else {
				setFormSphere(initialSphere);
				setFormValid({ ...formValid, [name]: Number(value) != 0, enum_magic_type: false });
				setFormValue({ ...formValue, enum_god: Number(value), enum_magic_type: 0 });
			}
		} else if (name === 'enum_magic_type') {
			setFormValue({ ...formValue, [name]: Number(value) });
			if (Number(value) === enum_magic_type.divine) {
				const sphere = { ...initialSphere };
				enum_god_sphere[formValue.enum_god].map((el) => (sphere[el] = true));
				setFormSphere(sphere);
				setFormValid({ ...formValid, [name]: Number(value) != 0, sphere: true });
			} else {
				setFormSphere(initialSphere);
				setFormValid({ ...formValid, [name]: Number(value) != 0, sphere: false });
			}
		} else if (name === 'sphere') {
			const sphere = { ...formSphere };
			sphere[Number(value)] = !sphere[Number(value)];
			setFormValid({
				...formValid,
				sphere: Object.values(sphere).filter((el) => el === true).length === 3,
			});
			setFormSphere({ ...formSphere, [Number(value)]: !formSphere[Number(value)] });
		}
	};

	const isFormValid = () => {
		return Object.values(formValid).every((value) => value === true);
	};

	// const resetForm = () => {
	// 	setFormValue(character);
	// 	setFormValid(initialState);
	// 	setFormError(initialState);
	// };

	const addSphere = () => {
		let sphere = '';
		Object.keys(formSphere).map((key) => {
			if (formSphere[Number(key)] === true) {
				sphere = sphere + key;
			}
		});
		return Number(sphere);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isFormValid()) {
			const data = { ...formValue, sphere: addSphere() };

			const resp = await fetch(`${host}/characters`, {
				method: 'PATCH',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: character.id, update_character: data }),
			});

			if (resp.ok) {
				setIsOpen(false);
				onSuccess((prev) => !prev);
				getCharacterList();
			}
		}
	};
	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit}>
				{formValue.picture !== '' && <img className={styles.picture} src={formValue.picture} alt="Picture" />}
				<div className={styles.input_text__container}>
					<label htmlFor="name">Nom</label>
					<input
						className={`${formError.name && styles.invalid}`}
						type="text"
						id="name"
						name="name"
						value={formValue.name}
						onChange={handleChange}
						required
					/>
					{formError.name && <ErrorMessage content="Nom est requis (min 3)" />}
				</div>
				<div className={styles.input_text__container}>
					<label htmlFor="picture">Image</label>
					<input
						className={`${formError.picture && styles.invalid}`}
						type="text"
						id="picture"
						name="picture"
						value={formValue.picture}
						required
						onChange={handleChange}
					/>
					{formError.picture && <ErrorMessage content="Une image est requise !" />}
				</div>
				<div className={styles.input_text__container}>
					<label htmlFor="enum_realm">Royaume</label>
					<select name="enum_realm" id="enum_realm" required onChange={handleChange} value={formValue.enum_realm}>
						<option value="">-- Sélectionner --</option>
						{Object.keys(enum_realm)
							.filter((key) => typeof enum_realm[key as keyof typeof enum_realm] === 'number')
							.map((key) => {
								const value = enum_realm[key as keyof typeof enum_realm];
								return (
									<option key={key} value={value as number}>
										{enum_realm.ToString(value as number)}
									</option>
								);
							})}
					</select>
					{formError.enum_realm && <ErrorMessage content="Un Royaume est requise !" />}
				</div>
				<div className={styles.input_text__container}>
					<label htmlFor="intelligence">Intelligence</label>
					<input
						className={`${formError.intelligence && styles.invalid}`}
						type="number"
						id="intelligence"
						name="intelligence"
						value={formValue.intelligence}
						required
						min={0}
						onChange={handleChange}
					/>
					{formError.intelligence && <ErrorMessage content="Vous n'êtes pas bête à ce point ?" />}
				</div>
				<div className={styles.container_life}>
					<div className={styles.input_text__container}>
						<label htmlFor="current_life">PV</label>
						<input
							className={`${formError.current_life && styles.invalid}`}
							type="number"
							id="current_life"
							name="current_life"
							value={formValue.current_life}
							required
							min={0}
							max={formValue.max_life}
							onChange={handleChange}
						/>
						{formError.current_life && <ErrorMessage content="A peine arrivé et déjà mort ?" />}
					</div>
					<div className={styles.input_text__container}>
						<label htmlFor="max_life">PV Max</label>
						<input
							className={`${formError.max_life && styles.invalid}`}
							type="number"
							id="max_life"
							name="max_life"
							value={formValue.max_life}
							required
							min={0}
							onChange={handleChange}
						/>
						{formError.max_life && <ErrorMessage content="A peine arrivé et déjà mort ?" />}
					</div>
				</div>

				<div className={styles.input_text__container}>
					<label htmlFor="enum_god">Dieu</label>
					<select
						name="enum_god"
						id="enum_god"
						required
						onChange={handleChange}
						value={formValue.enum_god}
						disabled={formValue.enum_realm === enum_realm.rdk}
					>
						<option value="">-- Sélectionner --</option>
						{Object.keys(enum_god)
							.filter((key) => typeof enum_god[key as keyof typeof enum_god] === 'number')
							.sort((a, b) => (a > b ? 1 : -1))
							.map((key) => {
								const value = enum_god[key as keyof typeof enum_god];
								return (
									<option key={key} value={value as number}>
										{enum_god.ToString(value as number)}
									</option>
								);
							})}
					</select>
					{formError.enum_god && <ErrorMessage content="Un Dieu est requise !" />}
				</div>
				<div className={styles.input_text__container}>
					<label htmlFor="enum_magic_type">Type de Magie</label>
					<select
						name="enum_magic_type"
						id="enum_magic_type"
						value={formValue.enum_magic_type}
						disabled={formValue.enum_god === enum_god.keldar}
						required
						onChange={handleChange}
					>
						<option value="">-- Sélectionner --</option>
						{Object.keys(enum_magic_type)
							.filter((key) => typeof enum_magic_type[key as keyof typeof enum_magic_type] === 'number')
							.map((key) => {
								const value = enum_magic_type[key as keyof typeof enum_magic_type];
								return (
									<option key={key} value={value as number}>
										{enum_magic_type.ToString(value as number)}
									</option>
								);
							})}
					</select>
					{formError.enum_magic_type && <ErrorMessage content="Un Royaume est requise !" />}
				</div>
				<div className={styles.input_text__container}>
					<label htmlFor="sphere">Spheres :</label>
					<div className={styles.input_checkbox}>
						{Object.keys(enum_sphere)
							.filter((key) => typeof enum_sphere[key as keyof typeof enum_sphere] === 'number')
							.sort((a, b) => (a > b ? 1 : -1))
							.map((key) => {
								const value = enum_sphere[key as keyof typeof enum_sphere] as number;
								return (
									<div className={styles.input_checkbox__container} key={key}>
										<label htmlFor={key}>{enum_sphere.ToString(value as number)}</label>
										<input
											id={key}
											name="sphere"
											type="checkbox"
											value={value}
											checked={formSphere[value]}
											onChange={handleChange}
											disabled={
												(Object.values(formSphere).filter((el) => el === true).length >= 3 && formSphere[value] === false) ||
												formValue.enum_god === 0 ||
												formValue.enum_magic_type != enum_magic_type.profane ||
												value === enum_sphere.protection
											}
										/>
									</div>
								);
							})}

						{formError.sphere && <ErrorMessage content="Choissisez vos sphères" />}
					</div>
				</div>
				<button className={`${styles.submit} ${isFormValid() && styles.submit_valid}`} type="submit">
					Editer
				</button>
			</form>
		</>
	);
};

export default EditCharacter;
