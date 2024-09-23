import styles from './modal.module.scss';

const Modal = ({ setIsOpen, children }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; children: JSX.Element }) => {
	return (
		<div className={styles.container}>
			<div className={styles.modal}>
				<div className={styles.modal_container}>
					<div className={styles.modal__close} onClick={() => setIsOpen(false)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
							<path
								fillRule="evenodd"
								d="m12 10.94 6.22-6.22a.75.75 0 0 1 1.147.956l-.087.104L13.06 12l6.22 6.22a.75.75 0 0 1-.956 1.147l-.104-.087L12 13.06l-6.22 6.22a.75.75 0 0 1-1.147-.956l.087-.104L10.94 12 4.72 5.78a.75.75 0 0 1 .956-1.147l.104.087L12 10.94Z"
							></path>
						</svg>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
