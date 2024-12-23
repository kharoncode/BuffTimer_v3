import { RootState } from './store';

// useSelector
export function getAuth(state: RootState) {
	return state?.auth;
}

export function checkAuth(state: RootState) {
	return getAuth(state).data.isAuth;
}

export function getUser(state: RootState) {
	return state?.user.data.user;
}

export function getUserCharacters(state: RootState) {
	return state?.user.data.characters;
}

// profilSelector
export const isSpellView = (state: RootState) => {
	return state.user.data.profil.isSpellView;
};
export const groupRefresh = (state: RootState) => {
	return state.user.data.profil.groupRefresh;
};

// players
// export function getPlayers(state: RootState) {
// 	return state?.players;
// }

// export function getPlayersList(state: RootState) {
// 	return getPlayers(state).players;
// }

// // user
// export function getUser(state: RootState) {
// 	return getLogin(state).user;
// }

// export function getUserFavoris(state: RootState) {
// 	return getUser(state).favoris;
// }

// export function getUserIntelligence(state: RootState) {
// 	return getUser(state).intelligence;
// }

// export function getUserRealm(state: RootState) {
// 	return getUser(state).realm;
// }

// export function getUserSpheres(state: RootState) {
// 	return getUser(state).spheres;
// }

// export function getUserTimer(state: RootState) {
// 	return getUser(state).timer;
// }

// //player
// export function getPlayer(state: RootState) {
// 	return state?.player;
// }

// data
// export function getData(state: RootState) {
// 	return state?.data.data;
// }

// export function getDataPages(state: RootState) {
// 	return getData(state)?.pages;
// }

// export function getDataMagie(state: RootState) {
// 	return getData(state)?.magie;
// }

// export function getDataSpells(state: RootState) {
// 	return getDataMagie(state)?.spells;
// }

// export function getDataGods(state: RootState) {
// 	return getDataMagie(state)?.gods;
// }

// export function getDataSpheres(state: RootState) {
// 	return getDataMagie(state)?.spheres;
// }

// export function getDataSkills(state: RootState) {
// 	return getData(state)?.skills;
// }
