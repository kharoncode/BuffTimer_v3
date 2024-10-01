import styles from './spellCard.module.css';
import styled from 'styled-components';
import { useState } from 'react';
import Timer from '../timer/Timer';

const SpellContainer = styled.div<{ color: string }>`
	position: relative;
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	width: 100%; /*  */
	height: 100%;
	background-color: ${({ color }) => color}; /*  */
	transition-duration: 0.3s; /*  */
	z-index: 100;
`;

const Container = styled.div<{ width: string; border: string }>`
	position: relative;
	display: flex;
	justify-content: center;
	${({ width }) => width}
	height: 30px;
	overflow: hidden;
	border: solid 2px;
	border-color: ${({ border }) => border};
	border-radius: 5px;
`;

type data = {
	id: string;
	playerId: string;
	name: string;
	category: string;
	date: number;
	isOpen: boolean;
};

const SpellCard: React.FC<data> = (data) => {
	const { id, name, category, date, isOpen } = data;
	const [isOver, setIsOver] = useState(false);
	if (isOver) {
		console.log('Is Over');
	}
	const deadLines = date - Date.now();

	const border =
		deadLines < 43200000 && deadLines > 28800000
			? 'yellow'
			: deadLines < 28800000 && deadLines > 7200000
			? 'rgb(255, 116, 0)'
			: deadLines < 7200000
			? 'rgb(255, 60, 55)'
			: 'transparent';

	const containerStyle = isOpen ? `width: 100%;` : ``;

	const color =
		category === 'justice'
			? 'rgba(255, 186, 83, 1)'
			: category === 'protection'
			? 'rgb(237, 244, 236)'
			: category === 'negation'
			? 'rgb(210, 210, 210)'
			: category === 'vitalite'
			? 'rgb(114, 244, 103)'
			: category === 'destruction'
			? 'rgb(255, 72, 23)'
			: 'rgb(241, 200, 247)';
	return (
		<Container width={containerStyle} border={border}>
			{isOpen ? (
				<SpellContainer color={color}>
					<img className={styles.spellPicture} src={`./pictures/spells/${id}.gif`} alt={`${name}`}></img>

					<div className={styles.title}>{name}</div>
					<Timer date={date} setIsOver={setIsOver} isOpen={isOpen} />
				</SpellContainer>
			) : (
				<span className={styles.spellPictureRound} title={`${name}`}>
					<img className={styles.spellPictureRound} src={`./pictures/spells/${id}.gif`} alt={`${name}`}></img>
					<Timer date={date} setIsOver={setIsOver} isOpen={isOpen} />
				</span>
			)}
		</Container>
	);
};

export default SpellCard;
