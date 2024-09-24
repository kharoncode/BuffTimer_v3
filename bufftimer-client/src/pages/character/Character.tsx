import host from '@/services/host';
import { Character as Character_type } from '@/services/types/character';
import UseFetch from '@/utils/useFetch';
import { useSearchParams } from 'react-router-dom';

const Character = () => {
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');
	const { data } = UseFetch<Character_type>(`${host}/characters?id=${id}`, {
		method: 'GET',
		credentials: 'include',
	});
	return <div>{data && data.name}</div>;
};

export default Character;
