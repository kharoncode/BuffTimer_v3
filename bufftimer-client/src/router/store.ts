import { loginSlice } from '@/pages/login/loginSlice';
import { playersSlice } from '@/pages/players/playersSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { dataSlice } from './dataSlice';
import { playerSlice } from '@/pages/player/playerSlice';

const persistConfig = {
   key: 'root',
   storage,
};

const reducers = combineReducers({
   login: loginSlice.reducer,
   players: playersSlice.reducer,
   data: dataSlice.reducer,
   player: playerSlice.reducer,
});

const store = configureStore({
   reducer: persistReducer(persistConfig, reducers),
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof reducers>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const persistor = persistStore(store, null);

export { store, persistor };
