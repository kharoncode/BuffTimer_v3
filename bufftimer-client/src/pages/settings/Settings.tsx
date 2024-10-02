import host from '@/services/host';
import { User } from '@/services/types/user';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './settings.module.scss';
import ErrorMessage from '@/components/error-message/ErrorMessage';

const Settings = () => {
	// const { data: user } = UseFetch<User>(`${host}/users`, {
	// 	method: 'GET',
	// 	credentials: 'include',
	// });

	const initUser = {
		id: 0,
		username: '',
		mail: '',
		password: '',
	};

	const [formValue, setFormValue] = useState(initUser);
	const [formPasswordValue, setFormPasswordValue] = useState({ oldPassword: '', newPassword: '', newPassword2: '' });

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const resp = await fetch(`${host}/users`, {
					method: 'GET',
					credentials: 'include',
				});
				const data = (await resp.json()) as User;
				setFormValue({ ...data, password: '' });
			} catch (error) {
				console.log(error);
			}
		};

		fetchUser();
	}, []);

	const initialState = {
		username: true,
		mail: true,
		password: true,
	};
	const initialErrorState = {
		username: false,
		mail: false,
		password: false,
	};

	const initialPasswordState = {
		oldPassword: false,
		newPassword: false,
		newPassword2: false,
	};

	const [formValid, setFormValid] = useState(initialState);
	const [formPasswordValid, setFormPasswordValid] = useState(initialPasswordState);
	const [formError, setFormError] = useState(initialErrorState);
	const [formPasswordError, setFormPasswordError] = useState(initialPasswordState);
	const [errorPassword, setErrorPassword] = useState(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		if (name === 'username') {
			setFormValue({ ...formValue, [name]: value });
			setFormValid({ ...formValid, [name]: value.length > 2 ? true : false });
			setFormError({ ...formError, [name]: value.length < 3 ? true : false });
		} else if (name === 'password') {
			setFormValue({ ...formValue, [name]: value });
			setFormValid({ ...formValid, [name]: value.length > 7 ? true : false });
			setFormError({ ...formError, [name]: value.length < 8 ? true : false });
		} else if (['oldPassword', 'newPassword', 'newPassword2'].includes(name)) {
			setFormPasswordValue({ ...formPasswordValue, [name]: value });
			setFormPasswordValid({ ...formPasswordValid, [name]: value.length > 7 ? true : false });
			setFormPasswordError({ ...formPasswordError, [name]: value.length < 8 ? true : false });
		} else if (name === 'mail') {
			const emailRegex = /^[^\s@]+@[^\s@]+$/;
			setFormValue({ ...formValue, [name]: value });
			setFormValid({ ...formValid, [name]: emailRegex.test(value) });
			setFormError({ ...formError, [name]: !emailRegex.test(value) });
		}
	};

	const isFormValid = () => {
		return Object.values(formValid).every((value) => value === true);
	};
	const isFormPasswordValid = () => {
		return Object.values(formPasswordValid).every((value) => value === true);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isFormValid()) {
			const data = {
				username: formValue.username,
				mail: formValue.mail,
			};

			const resp = await fetch(`${host}/users`, {
				method: 'PATCH',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password: formValue.password, updated_user: data }),
			});

			if (resp.ok) {
				console.log(resp);
			}
		}
	};

	const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (formPasswordValue.newPassword != formPasswordValue.newPassword2) {
			setErrorPassword(true);
			setFormValid({ ...formValid, password: false });
			return;
		}
		if (isFormPasswordValid()) {
			const data = {
				password: formPasswordValue.newPassword,
			};

			const resp = await fetch(`${host}/users`, {
				method: 'PATCH',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password: formPasswordValue.oldPassword, updated_user: data }),
			});

			if (resp.ok) {
				setFormPasswordValue({ oldPassword: '', newPassword: '', newPassword2: '' });
			}
		}
	};
	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.input_text__container}>
					<label htmlFor="username">Nom de l'utilisateur</label>
					<input
						className={`${formError.username && styles.invalid}`}
						type="text"
						id="username"
						name="username"
						value={formValue.username}
						onChange={handleChange}
						required
						autoComplete="username"
					/>
					{formError.username && <ErrorMessage content="Nom est requis (min 3)" />}
				</div>
				<div className={styles.input_text__container}>
					<label htmlFor="mail">E-Mail</label>
					<input type="email" id="mail" name="mail" value={formValue.mail} required autoComplete="mail" onChange={handleChange} />
					{formError.mail && <ErrorMessage content="E-Mail est requis (a@a)" />}
				</div>
				<div className={styles.input_text__container}>
					<label htmlFor="password">Mot de Passe</label>
					<input type="password" id="password" name="password" required autoComplete="current-password" onChange={handleChange} />
					{formPasswordError.newPassword && <ErrorMessage content="Mot de passe est requis (min 8)" />}
				</div>
				<button className={`${styles.submit} ${isFormValid() && styles.submit_valid}`} type="submit">
					Editer
				</button>
			</form>
			<form className={styles.form} onSubmit={handlePasswordSubmit}>
				<div className={styles.input_text__container}>
					<label htmlFor="oldPassword">Ancien Mot de Passe</label>
					<input type="password" id="oldPassword" name="oldPassword" required autoComplete="current-password" onChange={handleChange} />
					{formPasswordError.oldPassword && <ErrorMessage content="Mot de passe est requis (min 8)" />}
				</div>
				<div className={styles.input_text__container}>
					<label htmlFor="newPassword">Nouveau Mot de Passe</label>
					<input type="password" id="newPassword" name="newPassword" required autoComplete="new-password" onChange={handleChange} />
					{formPasswordError.newPassword && <ErrorMessage content="Mot de passe est requis (min 8)" />}
					{errorPassword && <ErrorMessage content="Les mots de passe ne sont pas identiques" />}
				</div>
				<div className={styles.input_text__container}>
					<label htmlFor="newPassword2">Nouveau Mot de Passe (Confirmation)</label>
					<input type="password" id="newPassword2" name="newPassword2" required autoComplete="new-password" onChange={handleChange} />
					{formPasswordError.newPassword2 && <ErrorMessage content="Mot de passe est requis (min 8)" />}
					{errorPassword && <ErrorMessage content="Les mots de passe ne sont pas identiques" />}
				</div>
				<button className={`${styles.submit} ${isFormPasswordValid() && styles.submit_valid}`} type="submit">
					Editer
				</button>
			</form>
		</div>
	);
};

export default Settings;
