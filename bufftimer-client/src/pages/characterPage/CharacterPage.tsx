import host from '@/services/host';
import { Character } from '@/services/types/character';
import UseFetch from '@/utils/useFetch';
import { Outlet, useParams } from 'react-router-dom';
import styles from './characterPage.module.scss';
import CharacterCard from '@/components/character/characterCard/CharacterCard';
import CharacterNav from '@/components/character/characterNav/CharacterNav';

const CharacterPage = () => {
	const params = useParams();
	const id = Number(params.id);

	const { data } = UseFetch<{ character: Character; characterRealmList: Character[] }>(`${host}/characters?id=${id}`, {
		method: 'GET',
		credentials: 'include',
	});

	if (data) {
		const { character } = data;

		return (
			<div className={styles.container}>
				<CharacterCard character={character} />
				<div className={styles.dashboard}>
					<CharacterNav />
					<div className={styles.dashboard_window}>
						<Outlet />
					</div>
				</div>
			</div>
		);
	}
};

export default CharacterPage;
