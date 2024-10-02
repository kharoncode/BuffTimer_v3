import { ChangeEvent, FormEvent, useState } from 'react';
import styles from '../createCharacter/createCharacter.module.scss';
import host from '@/services/host';
import ErrorMessage from '@/components/error-message/ErrorMessage';
import { enum_mob, enum_mob_picture } from '../../../../../bt_enum/enum_mob';

const CreateMonster = ({
	setIsOpen,
	onSuccess,
}: {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const initialValue = {
		name: '',
		enum_mob: 0,
	};
	const initialState = {
		name: false,
		enum_mob: false,
	};

	const [formValid, setFormValid] = useState(initialState);
	const [formValue, setFormValue] = useState(initialValue);
	const [formError, setFormError] = useState(initialState);

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		if (name === 'name') {
			setFormValue({ ...formValue, [name]: value });
			setFormValid({ ...formValid, [name]: value.length > 2 ? true : false });
			setFormError({ ...formError, [name]: value.length < 3 ? true : false });
		} else if (name === 'enum_mob') {
			setFormValue({ ...formValue, [name]: Number(value) });
			setFormValid({ ...formValid, [name]: Number(value) != 0 });
			setFormError({ ...formError, [name]: Number(value) < 1 ? true : false });
		}
	};

	const isFormValid = () => {
		return Object.values(formValid).every((value) => value === true);
	};

	const resetForm = () => {
		setFormValue(initialValue);
		setFormValid(initialState);
		setFormError(initialState);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isFormValid()) {
			const resp = await fetch(`${host}/monsters`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formValue),
			});

			if (resp.ok) {
				resetForm();
				setIsOpen(false);
				onSuccess((prev) => !prev);
			}
		}
	};
	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit}>
				{formValue.enum_mob !== 0 && (
					<img
						className={styles.picture_mob}
						src={enum_mob_picture[formValue.enum_mob]}
						alt={`Picture of ${enum_mob.ToString(formValue.enum_mob)}`}
					/>
				)}
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
					<label htmlFor="enum_mob">Type de Monstre</label>
					<select name="enum_mob" id="enum_mob" value={formValue.enum_mob} required onChange={handleChange}>
						<option value="">-- Sélectionner --</option>
						{Object.keys(enum_mob)
							.filter((key) => typeof enum_mob[key as keyof typeof enum_mob] === 'number')
							.sort((a, b) => (a > b ? 1 : -1))
							.map((key) => {
								const value = enum_mob[key as keyof typeof enum_mob];
								return (
									<option key={key} value={value as number}>
										{enum_mob.ToString(value as number)}
									</option>
								);
							})}
					</select>
					{formError.enum_mob && <ErrorMessage content="Le type de monstre est requise !" />}
				</div>

				<button className={`${styles.submit} ${isFormValid() && styles.submit_valid}`} type="submit">
					Ajouter
				</button>
			</form>
		</>
	);
};

export default CreateMonster;
