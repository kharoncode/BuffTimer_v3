import styles from './errorMesssage.module.scss';

const ErrorMessage = ({ content }: { content: string }) => {
	return (
		<div className={styles.error}>
			<span>{content}</span>
			<span>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					<path
						fillRule="evenodd"
						d="M12 1.5c5.799 0 10.5 4.701 10.5 10.5S17.799 22.5 12 22.5 1.5 17.799 1.5 12 6.201 1.5 12 1.5Zm0 14.438a1.148 1.148 0 1 0 0 2.296 1.148 1.148 0 0 0 0-2.297Zm0-10.172c-.362 0-.656.255-.656.571v6.857c0 .316.294.572.656.572.362 0 .656-.256.656-.572V6.337c0-.316-.294-.571-.656-.571Z"
					></path>
				</svg>
			</span>
		</div>
	);
};

export default ErrorMessage;
