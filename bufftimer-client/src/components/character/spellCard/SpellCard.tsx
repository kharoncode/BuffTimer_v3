import styles from './spellCard.module.css';
import styled from 'styled-components';
import { useState } from 'react';
import Timer from '../timer/Timer';
import { enum_spell_data as esd, enum_spell as e_spell } from '../../../../../bt_enum/enum_spell';
import { enum_sphere as es } from '../../../../../bt_enum/enum_mystique';
import host from '@/services/host';
import { Spell } from '@/services/types/spell';

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
	id: number;
	character_id: number;
	enum_spell: number;
	created_at: number;
	expires_at: number;
	isOpen: boolean;
	setRefresh: React.Dispatch<React.SetStateAction<Spell[]>>;
};

const SpellCard: React.FC<data> = (data) => {
	const { id, enum_spell, expires_at, isOpen, setRefresh } = data;
	const [isOver, setIsOver] = useState(false);

	const handleDelete = async () => {
		const resp = await fetch(`${host}/character-spells`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id }),
		});

		if (resp.ok) {
			setRefresh((prev) => prev.filter((spell) => spell.id != id));
		}
	};

	if (isOver) {
		handleDelete();
	}
	const deadLines = expires_at - Date.now();

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
		esd[enum_spell].sphere === es.justice
			? 'rgba(255, 186, 83, 1)'
			: esd[enum_spell].sphere === es.protection
			? 'rgb(237, 244, 236)'
			: esd[enum_spell].sphere === es.negation
			? 'rgb(210, 210, 210)'
			: esd[enum_spell].sphere === es.vitalite
			? 'rgb(114, 244, 103)'
			: esd[enum_spell].sphere === es.destruction
			? 'rgb(255, 72, 23)'
			: 'rgb(241, 200, 247)';
	return (
		<Container width={containerStyle} border={border}>
			{isOpen ? (
				<SpellContainer color={color}>
					<img className={styles.spellPicture} src={`/pictures/spells/${enum_spell}.gif`} alt={e_spell.ToString(enum_spell)}></img>

					<div className={styles.title}>{e_spell.ToString(enum_spell)}</div>
					<Timer date={expires_at} setIsOver={setIsOver} isOpen={isOpen} />
				</SpellContainer>
			) : (
				<span className={styles.spellPictureRound} title={e_spell.ToString(enum_spell)}>
					<img
						className={styles.spellPictureRound}
						src={`/pictures/spells/${enum_spell}.gif`}
						alt={`${e_spell.ToString(enum_spell)}`}
					></img>
					<Timer date={expires_at} setIsOver={setIsOver} isOpen={isOpen} />
				</span>
			)}
		</Container>
	);
};

export default SpellCard;
