import { useEffect, useRef, useState } from 'react';
import styles from './select.module.scss';

type SelectProps = {
	options: {
		value: number;
		label: string | undefined;
		styles?: string;
	}[];
	initOption: string;
	onChange: React.Dispatch<React.SetStateAction<number>>;
	reset: boolean;
};

const Select = ({ options, initOption, onChange, reset }: SelectProps) => {
	const selectRef = useRef<HTMLDivElement>(null);
	const initSelect = { value: 0, label: `--${initOption}--`, styles: '' };
	const [isOpen, setIsOpen] = useState(false);
	const [option, setOption] = useState<{
		value: number;
		label: string | undefined;
		styles?: string;
	}>(initSelect);

	const handleOptionChange = (option: { value: number; label: string | undefined; styles?: string }) => {
		setOption(option);
		setIsOpen(false);
		onChange(option.value);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		setOption(initSelect);
	}, [reset]);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.container} ref={selectRef}>
			<div onClick={() => setIsOpen((prev) => !prev)} className={`${styles.option} ${isOpen ? '' : option.styles}`}>
				{isOpen ? initSelect.label : option.label}
			</div>
			{isOpen && (
				<div className={styles.optionsContainer}>
					{options.map((option) => (
						<div onClick={() => handleOptionChange(option)} key={option.value} className={`${styles.option} ${option.styles}`}>
							{option.label}
						</div>
					))}
					<div className={styles.option_hover}></div>
				</div>
			)}
		</div>
	);
};

export default Select;
