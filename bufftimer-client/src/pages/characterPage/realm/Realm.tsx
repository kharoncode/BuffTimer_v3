import CharactersList from '@/components/character/charactersList/CharactersList';
import host from '@/services/host';
import { Character } from '@/services/types/character';
import UseFetch from '@/utils/useFetch';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Realm = () => {
	const params = useParams();
	const id = Number(params.id);
	const [refreshCharacter, setRefreshCharacter] = useState(false);
	const { data } = UseFetch<{ character: Character; characterRealmList: Character[] }>(
		`${host}/characters?id=${id}`,
		{
			method: 'GET',
			credentials: 'include',
		},
		refreshCharacter
	);

	if (data) {
		const { characterRealmList } = data;
		return <CharactersList list={characterRealmList} setRefresh={setRefreshCharacter} />;
	}
};

export default Realm;
