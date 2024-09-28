import { Character } from '@/services/types/character';
import edit_icone from '@assets/icones/edit.svg';
import { enum_realm as er } from '../../../../../bt_enum/enum_character';

const CharacterProfileCard = ({ character: character }: { character: Character }) => {
	const { name, picture, enum_realm } = character;
	return (
		<div>
			<img src={picture} alt={`Picture of ${name}`} />
			<p>{name}</p>
			<p>{er.ToString(enum_realm)}</p>
			<img
				src={edit_icone}
				alt="Edit"
				onClick={() => {
					console.log(name);
				}}
			></img>
		</div>
	);
};

export default CharacterProfileCard;
