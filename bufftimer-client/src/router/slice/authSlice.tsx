import host from '@/services/host';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
	return fetch(`${host}/auth/check-auth`, {
		credentials: 'include',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((result) => result.json())
		.then((data) => {
			const result = data as { isAuth: boolean };
			return result;
		});
});

type DataState = {
	loading: boolean;
	data: { isAuth: boolean };
	error: boolean | null | string | undefined;
};

const initialState: DataState = {
	loading: false,
	data: { isAuth: false },
	error: null,
};

export const authSlice = createSlice({
	name: 'checkAuth',
	initialState,
	reducers: {
		resetLogin: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(checkAuth.pending, (state) => {
			console.log('pending');
			state.loading = true;
		});
		builder.addCase(checkAuth.fulfilled, (state, action) => {
			console.log('fulfilled');
			const data = action.payload;
			state.loading = false;
			state.data = { ...state.data, isAuth: data.isAuth };
			state.error = null;
		});
		builder.addCase(checkAuth.rejected, (state, action) => {
			console.log('error');
			state.loading = false;
			state.error = action.error.message;
		});
	},
});
