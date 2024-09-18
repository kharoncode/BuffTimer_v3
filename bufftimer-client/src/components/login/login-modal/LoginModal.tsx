import { useState } from 'react';
import styles from './loginModal.module.scss';
import SignInForm from '../signInForm/SignInForm';
import SignUpForm from '../signUpForm/SignUpForm';

const LoginModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const [isNewUser, setIsNewUser] = useState(false);

	const toggleLog = (bool: boolean) => {
		setIsOpen(bool);
		setIsNewUser(false);
	};

	const toggleNewUser = () => {
		setIsNewUser(!isNewUser);
	};

	return (
		<div className={styles.container}>
			{isOpen && (
				<>
					<div className={styles.modal}>
						<div className={styles.modal_container}>
							<div className={styles.modal__close} onClick={() => toggleLog(false)}>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
									<path
										fillRule="evenodd"
										d="m12 10.94 6.22-6.22a.75.75 0 0 1 1.147.956l-.087.104L13.06 12l6.22 6.22a.75.75 0 0 1-.956 1.147l-.104-.087L12 13.06l-6.22 6.22a.75.75 0 0 1-1.147-.956l.087-.104L10.94 12 4.72 5.78a.75.75 0 0 1 .956-1.147l.104.087L12 10.94Z"
									></path>
								</svg>
							</div>
							{!isNewUser && <SignInForm toggle={toggleLog} />}
							{isNewUser && <SignUpForm toggle={toggleLog} />}
							<div onClick={() => toggleLog(false)} className={styles.line}></div>
							<div onClick={toggleNewUser} className={`btn ${styles.subscribe}`}>
								{isNewUser ? 'Se connecter ?' : "S'inscrire ?"}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default LoginModal;
