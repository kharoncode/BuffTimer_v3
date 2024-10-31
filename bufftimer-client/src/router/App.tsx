import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/home/Home';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootLayout from '@/layout/rootLayout/RootLayout';
import NotFound from '@/layout/notFound/NotFound';
import PrivateRoute from './PrivateRoute';
import Profil from '@/pages/profil/Profil';
import Settings from '@/pages/settings/Settings';
import CharacterPage from '@/pages/characterPage/CharacterPage';
import Realm from '@/pages/characterPage/realm/Realm';
import Favoris from '@/pages/characterPage/favoris/Favoris';
import GroupShow from '@/pages/characterPage/groups/groupShow/GroupShow';

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <RootLayout />,
			children: [
				{ path: '', element: <Home /> },
				{
					path: '/auth',
					element: <PrivateRoute />,
					children: [
						{ path: '/auth/profil', element: <Profil /> },
						{
							path: '/auth/character/:id',
							element: <CharacterPage />,
							children: [
								{ path: '/auth/character/:id/realm', element: <Realm /> },
								{ path: '/auth/character/:id/group/:group_id', element: <GroupShow /> },
								{ path: '/auth/character/:id/favoris', element: <Favoris /> },
							],
						},
						{ path: '/auth/settings', element: <Settings /> },
					],
				},
				{ path: '/*', element: <NotFound /> },
			],
		},
	]);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	);
};

export default App;
