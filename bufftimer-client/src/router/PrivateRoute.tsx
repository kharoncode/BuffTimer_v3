import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/utils/useAuth';

function PrivateRoute() {
	const { isAuth, loading } = useAuth();
	if (!loading && !isAuth) {
		return <Navigate to="/" />;
	} else {
		return <Outlet />;
	}
}

export default PrivateRoute;
