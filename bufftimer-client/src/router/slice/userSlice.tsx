import host from '@/services/host';
import { Character } from '@/services/types/character';
import { User } from '@/services/types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const userData = createAsyncThunk('user/userData', async () => {
	return fetch(`${host}/users`, {
		credentials: 'include',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((result) => result.json())
		.then((data) => {
			const result = data as User;
			return result;
		});
});

export const userCharacters = createAsyncThunk('user/characters', async () => {
	return fetch(`${host}/characters/user`, {
		credentials: 'include',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((result) => result.json())
		.then((data) => {
			const result = data as Character[];
			return result;
		});
});

type DataState = {
	loading: boolean;
	data: { user: User; characters: Character[] };
	error: boolean | null | string | undefined;
};

const initialState: DataState = {
	loading: false,
	data: { user: { id: 0, username: '', mail: '', date: '', admin: false }, characters: [] },
	error: null,
};

export const userSlice = createSlice({
	name: 'checkAuth',
	initialState,
	reducers: {
		resetLogin: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(userData.pending, (state) => {
			console.log('pending');
			state.loading = true;
		});
		builder.addCase(userData.fulfilled, (state, action) => {
			console.log('fulfilled');
			state.loading = false;
			state.data.user = action.payload;
			state.error = null;
		});
		builder.addCase(userData.rejected, (state, action) => {
			console.log('error');
			state.loading = false;
			state.error = action.error.message;
		});
		builder.addCase(userCharacters.pending, (state) => {
			console.log('pending');
			state.loading = true;
		});
		builder.addCase(userCharacters.fulfilled, (state, action) => {
			console.log('fulfilled');
			state.loading = false;
			state.data.characters = action.payload;
			state.error = null;
		});
		builder.addCase(userCharacters.rejected, (state, action) => {
			console.log('error');
			state.loading = false;
			state.error = action.error.message;
		});
	},
});
