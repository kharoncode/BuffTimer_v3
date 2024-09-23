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

				<main>
					<Outlet />
				</main>
				<Footer />
			</AuthProvider>
		</>
	);
};

export default RootLayout;
