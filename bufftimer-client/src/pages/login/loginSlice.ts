import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginDataType } from './Login';

export type user = {
	id: string;
	login: string;
	password?: string;
	email: string;
	name: string;
	intelligence: number;
	favoris: string[];
	realm: string;
	spheres: string;
	realms: string[];
	admin: string;
	timer: number;
	error?: string;
	diplomacy?: string;
};

export type user_data = {
	id: string;
	login: string;
	password?: string;
	email: string;
	name: string;
	intelligence: number;
	favoris: string;
	realm: string;
	spheres: string;
	realms: string;
	admin: string;
	timer: number;
	error?: string;
	diplomacy?: string;
};

type loginState = {
	loading: boolean;
	user: user;
	error: null | string | undefined;
	auth: boolean;
};

export const fetchUser = createAsyncThunk('login/fetchUser', async (log: loginDataType, { rejectWithValue }) => {
	//return fetch(`${import.meta.env.VITE_MOCKURL}users.json`, {
	return fetch(`${import.meta.env.VITE_API}/users`, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((result) => result.json())
		.then((data) => {
			const users = data as user_data[];
			const filter = users.filter(function (el: user_data) {
				return el.id === log.login && el.password === log.password;
			});
			if (filter.length !== 0) {
				const user: user = {
					id: filter[0].id,
					login: filter[0].login,
					email: filter[0].email,
					name: filter[0].name,
					intelligence: Number(filter[0].intelligence),
					favoris: [],
					realm: filter[0].realm,
					spheres: filter[0].spheres,
					realms: [filter[0].realm],
					admin: filter[0].admin,
					timer: 0,
				};
				if (filter[0].favoris !== null) {
					user.favoris = filter[0].favoris.split(' ');
				}
				if (filter[0].diplomacy && filter[0].diplomacy !== null) {
					filter[0].diplomacy.split(' ').map((el: string) => user.realms.push(el));
				}
				return user;
			} else {
				return rejectWithValue({
					error: 'Login Failed: Your user ID or password is incorrect',
				});
			}
		});
});

export type newData = {
	id: string;
	login: string;
	email: string;
	intelligence: number;
	spheres: string;
};

export const uptadeUser = createAsyncThunk('login/uptadeUser', async (newData: newData) => {
	const { id, login, email, intelligence, spheres } = newData;
	const body = {
		condition: { id: id },
		set: {
			email: email,
			login: login,
			intelligence: intelligence,
			spheres: spheres,
		},
	};
	return fetch(`${import.meta.env.VITE_API}/users`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		.then((result) => result.json())
		.then(() => {
			return {
				login: login,
				email: email,
				intelligence: intelligence,
				spheres: spheres,
			};
		});
});

type newPassword = {
	id: string;
	password: string;
};

export const uptadeUserPassword = createAsyncThunk('login/uptadeUserPassword', async (newPassword: newPassword) => {
	const { id, password } = newPassword;
	const body = {
		condition: { id: id },
		set: {
			password: password,
		},
	};
	return fetch(`${import.meta.env.VITE_API}/users`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
});

type favorisData = {
	id: string;
	list: string;
};

export const uptadeUserFavoris = createAsyncThunk('login/uptadeUserFavoris', async (favorisData: favorisData) => {
	const { id, list } = favorisData;
	const body = {
		condition: { id: id },
		set: {
			favoris: list,
		},
	};
	return fetch(`${import.meta.env.VITE_API}/users`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		.then((result) => result.json())
		.then(() => {
			if (list === '') {
				return [];
			} else {
				return list.split(' ');
			}
		});
});

const initialState: loginState = {
	loading: false,
	user: {
		id: '',
		login: '',
		name: '',
		email: '',
		intelligence: 0,
		favoris: [],
		realm: '',
		spheres: '',
		realms: [],
		admin: '',
		timer: 0,
	},
	error: null,
	auth: false,
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		resetLogin: () => {
			return initialState;
		},
		updateTimer: (state, action) => {
			return {
				...state,
				user: { ...state.user, timer: action.payload },
			};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.pending, (state) => {
			console.log('fetchUser:pending');
			state.loading = true;
		});
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			console.log('fetchUser:fulfilled');
			state.loading = false;
			state.user = action.payload;
			state.error = null;
			state.auth = true;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			console.log('fetchUser:error');
			state.loading = false;
			state.user = initialState.user;
			state.error = action.error.message;
			state.auth = false;
		});
		builder.addCase(uptadeUser.pending, (state) => {
			console.log('uptadeUser:pending');
			state.loading = true;
		});
		builder.addCase(uptadeUser.fulfilled, (state, action) => {
			const { login, email, intelligence, spheres } = action.payload;
			console.log('uptadeUser:fulfilled');
			state.loading = false;
			state.user.login = login;
			state.user.email = email;
			state.user.intelligence = intelligence;
			state.user.spheres = spheres;
			state.error = null;
		});
		builder.addCase(uptadeUser.rejected, (state, action) => {
			console.log('uptadeUser:error');
			state.loading = false;
			state.user = initialState.user;
			state.error = action.error.message;
		});
		builder.addCase(uptadeUserFavoris.pending, (state) => {
			console.log('uptadeUserFavoris:pending');
			state.loading = true;
		});
		builder.addCase(uptadeUserFavoris.fulfilled, (state, action) => {
			console.log('uptadeUserFavoris:fulfilled');
			state.loading = false;
			state.user.favoris = action.payload;
			state.error = null;
		});
		builder.addCase(uptadeUserFavoris.rejected, (state, action) => {
			console.log('uptadeUserFavoris:error');
			state.loading = false;
			state.user = initialState.user;
			state.error = action.error.message;
		});
	},
});
