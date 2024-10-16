import { ChangeEvent, FormEvent, useState } from 'react';
import ErrorMessage from '../../error-message/ErrorMessage';
import styles from './signInForm.module.scss';
import host from '../../../services/host';
import { userCharacters, userData } from '@/router/slice/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/router/store';
import { checkAuth } from '@/router/slice/authSlice';

const SignInForm = ({ toggle }: { toggle: (bool: boolean) => void }) => {
	const [focus, setFocus] = useState({ login: false, password: false });
	const [formValid, setFormValid] = useState({ login: false, password: false });
	const [formValue, setFormValue] = useState({ login: '', password: '' });
	const [formError, setFormError] = useState({ login: false, password: false });

	const dispatch = useDispatch<AppDispatch>();

	const handleSet = (
		input: 'login' | 'password',
		status: boolean,
		set: React.Dispatch<
			React.SetStateAction<{
				login: boolean;
				password: boolean;
			}>
		>
	) => {
		set({ ...focus, [input]: formValue[input] === '' ? status : true });
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = event.target;
		setFormValue({ ...formValue, [name]: type === 'checkbox' ? checked : value });
		if (name === 'login') {
			setFormValid({ ...formValid, [name]: value.length > 2 ? true : false });
			setFormError({ ...formError, [name]: value.length < 3 ? true : false });
		} else if (name === 'password') {
			setFormValid({ ...formValid, [name]: value.length > 7 ? true : false });
			setFormError({ ...formError, [name]: value.length < 8 ? true : false });
		}
	};

	const isFormValid = () => {
		if (formValid.login && formValid.password) {
			return true;
		} else {
			return false;
		}
	};

	const resetForm = () => {
		setFormValue({ login: '', password: '' });
		setFormValid({ login: false, password: false });
		setFormError({ login: false, password: false });
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isFormValid()) {
			const resp = await fetch(`${host}/auth/login`, {
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
					onFocus={() => handleSet('login', true, setFocus)}
					onBlur={() => handleSet('login', false, setFocus)}
					type="text"
					id="login"
					name="login"
					value={formValue.login}
					onChange={handleChange}
					required
				/>
				{formError.login && <ErrorMessage content="Login is required (Lenght 3)" />}
				<label className={focus.login ? styles.focus : ''} htmlFor="login">
					Username
				</label>
			</div>
			<div className={styles.input_text__container}>
				<input
					onFocus={() => handleSet('password', true, setFocus)}
					onBlur={() => handleSet('password', false, setFocus)}
					type="password"
					id="password"
					name="password"
					value={formValue.password}
					required
					onChange={handleChange}
				/>
				{formError.password && <ErrorMessage content="Password is required (Lenght 8)" />}
				<label className={focus.password ? styles.focus : ''} htmlFor="password">
					Password
				</label>
			</div>
			<button className={`${styles.submit} ${isFormValid() && styles.submit_valid}`} type="submit">
				Connexion
			</button>
		</form>
	);
};

export default SignInForm;
