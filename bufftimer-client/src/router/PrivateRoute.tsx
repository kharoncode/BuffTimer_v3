import { Navigate, Outlet } from 'react-router-dom';
import { getAuth } from '@router/selectors';
import { useSelector } from 'react-redux';

function PrivateRoute() {
	const auth: boolean = useSelector(getAuth);
	if (!auth) {
		return <Navigate to="/" />;
	} else {
		return <Outlet />;
	}
}

export default PrivateRoute;
