import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import host from '../services/host';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
	isAuth: boolean;
	setLogin: () => void;
	setLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await fetch(`${host}/auth/check-auth`, { credentials: 'include' });
				if (response.ok) {
					const data = (await response.json()) as { isAuth: boolean };
					setIsAuth(data.isAuth);
				}
			} catch (error) {
				console.error('Failed to check authentication:', error);
			}
		};

		checkAuth();
	}, []);

	const setLogin = () => setIsAuth(true);
	const setLogout = () => {
		setIsAuth(false);
		navigate('/');
	};

	return <AuthContext.Provider value={{ isAuth, setLogin, setLogout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
