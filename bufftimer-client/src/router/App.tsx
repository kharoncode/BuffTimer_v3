import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/home/Home';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootLayout from '@/layout/rootLayout/RootLayout';
import NotFound from '@/layout/notFound/NotFound';
import PrivateRoute from './PrivateRoute';
import Profile from '@/pages/profile/Profile';
import Settings from '@/pages/settings/Settings';
import CharacterPage from '@/pages/characterPage/CharacterPage';

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
						{ path: '/auth/profile', element: <Profile /> },
						{ path: '/auth/character', element: <CharacterPage /> },
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
