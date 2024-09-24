import host from '@/services/host';
import { User } from '@/services/types/user';
import UseFetch from '@/utils/useFetch';

const Settings = () => {
	const { data } = UseFetch<User>(`${host}/users`, {
		method: 'GET',
		credentials: 'include',
	});
	return <div>{data && data.username}</div>;
};

export default Settings;
