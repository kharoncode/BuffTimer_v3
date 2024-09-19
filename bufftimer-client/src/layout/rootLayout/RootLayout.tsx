import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
//import Header from '@/components/header/Header';
import { AuthProvider } from '../../utils/useAuth';

const RootLayout = () => {
	return (
		<>
			<AuthProvider>
				<Header />
			</AuthProvider>
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default RootLayout;
