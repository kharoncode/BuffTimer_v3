import { useState } from 'react';
import styles from './select.module.scss';

type SelectProps = {
	options: {
		value: number;
		label: string | undefined;
		styles?: string;
	}[];
	initOption: string;
	onChange: React.Dispatch<React.SetStateAction<number>>;
};

const Select = ({ options, initOption, onChange }: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [option, setOption] = useState<{
		value: number;
		label: string | undefined;
		styles?: string;
	}>({ value: 0, label: `--${initOption}--`, styles: '' });

	const handleOptionChange = (option: { value: number; label: string | undefined; styles?: string }) => {
		setOption(option);
		setIsOpen(false);
		onChange(option.value);
	};

	return (
		<div className={styles.container}>
			<div onClick={() => setIsOpen((prev) => !prev)} className={`${styles.option} ${option.styles}`}>
				{option.label}
			</div>
			{isOpen && (
				<div className={styles.optionsContainer}>
					{options.map((option) => (
						<div onClick={() => handleOptionChange(option)} key={option.value} className={`${styles.option} ${option.styles}`}>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Select;
