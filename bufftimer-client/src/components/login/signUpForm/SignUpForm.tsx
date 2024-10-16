import { ChangeEvent, FormEvent, useState } from 'react';
import ErrorMessage from '../../error-message/ErrorMessage';
import styles from './signUpForm.module.scss';
import host from '../../../services/host';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/router/store';
import { checkAuth } from '@/router/slice/authSlice';
import { userCharacters, userData } from '@/router/slice/userSlice';

const SignUpForm = ({ toggle }: { toggle: (bool: boolean) => void }) => {
	const initialValue = { username: '', mail: '', password: '', password2: '', admin: false };
	const initialState = { username: false, mail: false, password: false, password2: false };
	const [focus, setFocus] = useState(initialState);
	const [formValid, setFormValid] = useState(initialState);
	const [formValue, setFormValue] = useState(initialValue);
	const [formError, setFormError] = useState(initialState);
	const [errorPassword, setErrorPassword] = useState(false);
	const dispatch = useDispatch<AppDispatch>();

	const handleSet = (input: 'username' | 'mail' | 'password' | 'password2', status: boolean) => {
		setFocus({ ...focus, [input]: formValue[input] === '' ? status : true });
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormValue({ ...formValue, [name]: value });
		if (name === 'username') {
			setFormValid({ ...formValid, [name]: value.length > 2 ? true : false });
			setFormError({ ...formError, [name]: value.length < 3 ? true : false });
		} else if (name === 'password' || name === 'password2') {
			setFormValid({ ...formValid, [name]: value.length > 7 ? true : false });
			setFormError({ ...formError, [name]: value.length < 8 ? true : false });
		} else if (name === 'mail') {
			const emailRegex = /^[^\s@]+@[^\s@]+$/;
			setFormValid({ ...formValid, [name]: emailRegex.test(value) });
			setFormError({ ...formError, [name]: !emailRegex.test(value) });
		}
	};

	const isFormValid = () => {
		if (formValid.username && formValid.password && formValid.mail) {
			return true;
		} else {
			return false;
		}
	};

	const resetForm = () => {
		setFormValue(initialValue);
		setFormValid(initialState);
		setFormError(initialState);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (formValue.password != formValue.password2) {
			setErrorPassword(true);
			setFormValid({ ...formValid, password: false });
			return;
		}
		if (isFormValid()) {
			const resp = await fetch(`${host}/auth/signup`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formValue),
			});

			if (resp.ok) {
				dispatch(checkAuth());
				dispatch(userData());
				dispatch(userCharacters());
				resetForm();
				toggle(false);
			}
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.input_text__container}>
				<input
					onFocus={() => handleSet('username', true)}
					onBlur={() => handleSet('username', false)}
					type="text"
					id="username"
					name="username"
					value={formValue.username}
					onChange={handleChange}
					required
				/>
				{formError.username && <ErrorMessage content="Nom est requis (min 3)" />}
				<label className={focus.username ? styles.focus : ''} htmlFor="username">
					Username
				</label>
			</div>
			<div className={styles.input_text__container}>
				<input
					onFocus={() => handleSet('mail', true)}
					onBlur={() => handleSet('mail', false)}
					type="email"
					id="mail"
					name="mail"
					value={formValue.mail}
					required
					onChange={handleChange}
				/>
				{formError.mail && <ErrorMessage content="E-Mail est requis (a@a)" />}
				<label className={focus.mail ? styles.focus : ''} htmlFor="mail">
					E-Mail
				</label>
			</div>
			<div className={styles.input_text__container}>
				<input
					onFocus={() => handleSet('password', true)}
					onBlur={() => handleSet('password', false)}
					type="password"
					id="password"
					name="password"
					value={formValue.password}
					required
					onChange={handleChange}
				/>
				{formError.password && <ErrorMessage content="Mot de passe est requis (min 8)" />}
				{errorPassword && <ErrorMessage content="Les mots de passe ne sont pas identiques" />}
				<label className={focus.password ? styles.focus : ''} htmlFor="password">
					Mot de Passe
				</label>
			</div>
			<div className={styles.input_text__container}>
				<input
					onFocus={() => handleSet('password2', true)}
					onBlur={() => handleSet('password2', false)}
					type="password"
					id="password2"
					name="password2"
					value={formValue.password2}
					required
					onChange={handleChange}
				/>
				{formError.password2 && <ErrorMessage content="Mot de passe est requis (min 8)" />}
				{errorPassword && <ErrorMessage content="Les mots de passe ne sont pas identiques" />}
				<label className={focus.password2 ? styles.focus : ''} htmlFor="password2">
					Mot de Passe (Confirmation)
				</label>
			</div>
			<button className={`${styles.submit} ${isFormValid() && styles.submit_valid}`} type="submit">
				Connexion
			</button>
		</form>
	);
};

export default SignUpForm;
