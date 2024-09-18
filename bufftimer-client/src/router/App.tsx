import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//import { createBrowserRouter, Route, Routes, HashRouter, RouterProvider } from 'react-router-dom';
// import Header from '@/components/header/Header';
import Home from '@/pages/home/Home';
// //import { Login } from '@/pages/login/Login';
// import Favoris from '@/pages/favoris/Favoris';
// import Players from '@/pages/players/Players';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import Info from '@/pages/info/Info';
// import Player from '@/pages/player/Player';
// import User from '@/pages/user/User';
// import { UserMenu } from '@/components/userMenu/UserMenu';
// import { PlayerMenu } from '@/components/playerMenu/PlayerMenu';
import RootLayout from '@/layout/rootLayout/RootLayout';
import NotFound from '@/layout/notFound/NotFound';
import { Login } from '@/pages/login/Login';

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <RootLayout />,
			children: [
				{ path: '', element: <Home /> },
				{ path: '/login', element: <Login /> },
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
