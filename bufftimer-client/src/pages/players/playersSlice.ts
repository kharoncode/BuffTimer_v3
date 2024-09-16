import { formatPlayers } from '@/utils/formatPlayer';
import type { data, players } from '@/utils/formatPlayer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type playersState = {
	loading: boolean;
	players: players;
	error: null | string | undefined;
};

const URL: { [key: string]: string } = {
	rdk: import.meta.env.VITE_RDK_API,
	pe: import.meta.env.VITE_PE_API,
	ca: import.meta.env.VITE_CA_API,
	ek: import.meta.env.VITE_EK_API,
	hb: import.meta.env.VITE_HB_API,
};

export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async (realm: string) => {
	return fetch(`${URL[realm]}/players`, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((result) => result.json())
		.then((data) => {
			const result = data as data;
			return formatPlayers(result);
		});
});

export const fetchPlayersDiplo = createAsyncThunk('players/fetchPlayersDiplo', async (realm: string) => {
	// return fetch(
	//    `${import.meta.env.VITE_MOCKURL}/players/${realm}_players.json`,
	//    {
	return fetch(`${URL[realm]}/players`, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((result) => result.json())
		.then((data) => {
			const result = data as data;
			return formatPlayers(result);
		});
});

type newLife = {
	id: string;
	life: {
		currentLife: number;
		maxLife: number;
	};
};

export const uptadeUserPlayerLife = createAsyncThunk('players/uptadeUserPlayerLife', async (newLife: newLife) => {
	const { id, life } = newLife;
	const body = {
		condition: { id: id },
		set: {
			currentLife: life.currentLife,
			maxLife: life.maxLife,
		},
	};
	return fetch(`${import.meta.env.VITE_API}/players`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		.then((result) => result.json())
		.then(() => {
			return {
				id: id,
				life: {
					currentLife: life.currentLife,
					maxLife: life.maxLife,
				},
			};
		});
});

type newMessage = {
	id: string;
	message: string;
};

export const uptadeUserPlayerMessage = createAsyncThunk('players/uptadeUserPlayerMessage', async (newMessage: newMessage) => {
	const { id, message } = newMessage;
	const body = {
		condition: { id: id },
		set: {
			message: message,
		},
	};
	return fetch(`${import.meta.env.VITE_API}/players`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		.then((result) => result.json())
		.then(() => {
			return newMessage;
		});
});

export type newPicture = {
	id: string;
	picture: string;
};

export const uptadeUserPlayerPicture = createAsyncThunk('players/uptadeUserPlayerPicture', async (newPicture: newPicture) => {
	const { id, picture } = newPicture;
	const body = {
		condition: { id: id },
		set: {
			picture: picture,
		},
	};
	return fetch(`${import.meta.env.VITE_API}/players`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		.then((result) => result.json())
		.then(() => {
			return newPicture;
		});
});

type newSpell = {
	id: string;
	spell: string;
	date: string;
};

type setAdd = { [key: string]: string };

export const uptadePlayersBuff = createAsyncThunk('players/uptadePlayersBuff', async (newSpell: newSpell) => {
	const { id, spell, date } = newSpell;
	const set: setAdd = {};
	set[spell] = date;
	const body = {
		condition: { id: id },
		set: set,
	};
	return fetch(`${import.meta.env.VITE_API}/players`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		.then((result) => result.json())
		.then(() => {
			return newSpell;
		});
});

type spellsId = {
	id: string;
	list: string[];
};

type setDelete = { [key: string]: 'null' };

export const deletePlayerBuff = createAsyncThunk('players/deletePlayerBuff', async (removeSpell: spellsId) => {
	const { id, list } = removeSpell;
	const set: setDelete = {};
	list.map((el) => (set[el] = 'null'));
	const body = {
		condition: { id: id },
		set: set,
	};
	return fetch(`${import.meta.env.VITE_API}/players`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		.then((result) => result.json())
		.then(() => {
			return removeSpell;
		});
});

const initialState: playersState = {
	loading: false,
	players: {},
	error: null,
};

export const playersSlice = createSlice({
	name: 'players',
	initialState,
	reducers: {
		resetPlayers: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPlayers.pending, (state) => {
			console.log('fetchPlayers:pending');
			state.loading = true;
		});
		builder.addCase(fetchPlayers.fulfilled, (state, action) => {
			console.log('fetchPlayers:fulfilled');
			state.loading = false;
			state.players = action.payload;
			state.error = null;
		});
		builder.addCase(fetchPlayers.rejected, (state, action) => {
			console.log('fetchPlayers:error');
			state.loading = false;
			state.players = {};
			state.error = action.error.message;
		});
		builder.addCase(fetchPlayersDiplo.pending, (state) => {
			console.log('fetchPlayersDiplo:pending');
			state.loading = true;
		});
		builder.addCase(fetchPlayersDiplo.fulfilled, (state, action) => {
			console.log('fetchPlayersDiplo:fulfilled');
			state.loading = false;
			Object.keys(action.payload).map((key) => (state.players[key] = action.payload[key]));
			state.error = null;
		});
		builder.addCase(fetchPlayersDiplo.rejected, (state, action) => {
			console.log('fetchPlayersDiplo:error');
			state.loading = false;
			state.players = {};
			state.error = action.error.message;
		});
		builder.addCase(uptadeUserPlayerLife.pending, () => {
			console.log('uptadeUserPlayerLife:pending');
		});
		builder.addCase(uptadeUserPlayerLife.fulfilled, (state, action) => {
			console.log('uptadeUserPlayerLife:fulfilled');
			const { id, life } = action.payload;
			state.players[id].life = life;
			state.error = null;
		});
		builder.addCase(uptadeUserPlayerLife.rejected, (state, action) => {
			console.log('uptadeUserPlayerLife:error');
			state.error = action.error.message;
		});
		builder.addCase(uptadeUserPlayerMessage.pending, () => {
			console.log('uptadeUserPlayerMessage:pending');
		});
		builder.addCase(uptadeUserPlayerMessage.fulfilled, (state, action) => {
			console.log('uptadeUserPlayerMessage:fulfilled');
			const { id, message } = action.payload;
			state.players[id].message = message;
			state.error = null;
		});
		builder.addCase(uptadeUserPlayerMessage.rejected, (state, action) => {
			console.log('uptadeUserPlayerMessage:error');
			state.error = action.error.message;
		});
		builder.addCase(uptadeUserPlayerPicture.pending, () => {
			console.log('uptadeUserPlayerPicture:pending');
		});
		builder.addCase(uptadeUserPlayerPicture.fulfilled, (state, action) => {
			console.log('uptadeUserPlayerPicture:fulfilled');
			const { id, picture } = action.payload;
			state.players[id].picture = picture;
			state.error = null;
		});
		builder.addCase(uptadeUserPlayerPicture.rejected, (state, action) => {
			console.log('uptadeUserPlayerPicture:error');
			state.error = action.error.message;
		});
		builder.addCase(uptadePlayersBuff.pending, () => {
			console.log('uptadePlayersBuff:pending');
		});
		builder.addCase(uptadePlayersBuff.fulfilled, (state, action) => {
			console.log('uptadePlayersBuff:fulfilled');
			const { spell, id, date } = action.payload;
			if (spell !== 'enseignement') {
				state.players[id].spells[spell].date = date;
			} else {
				const enseignement = date.split(' ');
				state.players[id].spells[spell].date = enseignement[1];
				state.players[id].spells[spell].name = enseignement[0];
			}
			state.error = null;
		});
		builder.addCase(uptadePlayersBuff.rejected, (state, action) => {
			console.log('uptadePlayersBuff:error');
			state.error = action.error.message;
		});
		builder.addCase(deletePlayerBuff.pending, () => {
			console.log('deletePlayerBuff:pending');
		});
		builder.addCase(deletePlayerBuff.fulfilled, (state, action) => {
			console.log('deletePlayerBuff:fulfilled');
			const { id, list } = action.payload;
			list.map((el) => (state.players[id].spells[el].date = null));
			state.error = null;
		});
		builder.addCase(deletePlayerBuff.rejected, (state, action) => {
			console.log('deletePlayerBuff:error');
			state.error = action.error.message;
		});
	},
});
