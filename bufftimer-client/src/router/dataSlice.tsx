import { data_type } from '@/services/type_data';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
	return fetch(`${import.meta.env.VITE_DATAURL}`, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((result) => result.json())
		.then((data) => {
			const result = data as data_type;
			return result;
		});
});

type dataPages = {
	[key: string]: {
		title: string;
		articles: {
			[key: string]: { id: string; title: string; article: string };
		};
	};
};

type dataSpells = {
	[key: string]: {
		name: string;
		category: string;
		arcane: number;
		time: number;
	};
};

type DataMagie = {
	gods: {
		[key: string]: {
			name: string;
			title: string;
			spheres: string;
			race: string;
		};
	};
	spheres: { [key: string]: { name: string; list: string } };
	spells: dataSpells;
};

type dataState = {
	loading: boolean;
	data: {
		pages: dataPages;
		magie: DataMagie;
		skills: { [key: string]: { name: string; time: number } };
	};
	error: null | string | undefined;
};

const initialState: dataState = {
	loading: false,
	data: {
		pages: {},
		magie: { gods: {}, spheres: {}, spells: {} },
		skills: {},
	},
	error: null,
};

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		resetLogin: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchData.pending, (state) => {
			console.log('pending');
			state.loading = true;
		});
		builder.addCase(fetchData.fulfilled, (state) => {
			console.log('fulfilled');
			state.loading = false;
			//state.data = action.payload;
			state.error = null;
		});
		builder.addCase(fetchData.rejected, (state, action) => {
			console.log('error');
			state.loading = false;
			state.error = action.error.message;
		});
	},
});
