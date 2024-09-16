import { createSlice } from '@reduxjs/toolkit';

type playerState = {
   id: string;
};

const initialState: playerState = {
   id: '',
};

export const playerSlice = createSlice({
   name: 'player',
   initialState,
   reducers: {
      removeId: () => {
         return initialState;
      },
      addId: (state, action) => {
         return { ...state, id: action.payload };
      },
   },
});
