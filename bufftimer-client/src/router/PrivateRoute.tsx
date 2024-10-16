import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkAuth } from './selectors';

function PrivateRoute() {
	const isAuth = useSelector(checkAuth);
	if (!isAuth) {
		return <Navigate to="/" />;
	} else {
		return <Outlet />;
	}
}

export default PrivateRoute;
