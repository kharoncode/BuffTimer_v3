import host from '@/services/host';
import styles from '../../../../components/profil/createCharacter/createCharacter.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import ErrorMessage from '@/components/error-message/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { store } from '@/router/store';
import { userSlice } from '@/router/slice/userSlice';
import { useSelector } from 'react-redux';
import { groupRefresh } from '@/router/selectors';

const GroupForm = ({ character_id, setIsOpen }: { character_id: number; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const navigate = useNavigate();
	const refresh = useSelector(groupRefresh);
	const initialValue = {
		name: '',
		creator_id: character_id,
	};
	const initialState = {
		name: false,
	};

	const [formValid, setFormValid] = useState(initialState);
	const [formValue, setFormValue] = useState(initialValue);
	const [formError, setFormError] = useState(initialState);

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target;

		setFormValue({ ...formValue, [name]: value });
		setFormValid({ ...formValid, [name]: value.length > 2 ? true : false });
		setFormError({ ...formError, [name]: value.length < 3 ? true : false });
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
			const resp = await fetch(`${host}/groups`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formValue),
			});

			if (resp.ok) {
				const data: { id: number }[] = await resp.json();
				resetForm();
				setIsOpen(false);
				store.dispatch(userSlice.actions.groupRefresh(!refresh));
				navigate(`/auth/character/${character_id}/group/${data[0].id}`);
			}
		}
	};
	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit}>
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

				<button className={`${styles.submit} ${isFormValid() && styles.submit_valid}`} type="submit">
					Ajouter
				</button>
			</form>
		</>
	);
};

export default GroupForm;
