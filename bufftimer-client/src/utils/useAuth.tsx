import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import host from '../services/host';
import { useNavigate } from 'react-router-dom';
import { Character } from '@/services/types/character';

type AuthContextType = {
	isAuth: boolean;
	loading: boolean;
	setLogin: () => void;
	setLogout: () => void;
	characterList: Character[];
	getCharacterList: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [loading, setLoading] = useState(true);
	const [refresh, setRefresh] = useState(false);
	const [characterList, setCharacterList] = useState<Character[]>([]);
	const navigate = useNavigate();

	const getCharacterList = async () => {
		try {
			const resp = await fetch(`${host}/characters/user`, {
				method: 'GET',
				credentials: 'include',
			});

			if (resp.ok) {
				const data = (await resp.json()) as Character[];
				setCharacterList(data);
			}
		} catch (error) {
			console.error('Failed to check characters', error);
		}
	};

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
			} finally {
				setLoading(false);
			}
		};

		getCharacterList();

		checkAuth();
	}, [refresh]);

	const setLogin = () => {
		setIsAuth(true);
		setRefresh((prev) => !prev);
	};
	const setLogout = () => {
		setIsAuth(false);
		navigate('/');
	};

	return (
		<AuthContext.Provider value={{ isAuth, loading, setLogin, setLogout, characterList, getCharacterList }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
