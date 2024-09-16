import { RootState } from './store';

// useSelector
// login
export function getLogin(state: RootState) {
   return state?.login;
}

export const getAuth = (state: RootState) => {
   return getLogin(state).auth;
};

// players
export function getPlayers(state: RootState) {
   return state?.players;
}

export function getPlayersList(state: RootState) {
   return getPlayers(state).players;
}

// user
export function getUser(state: RootState) {
   return getLogin(state).user;
}

export function getUserFavoris(state: RootState) {
   return getUser(state).favoris;
}

export function getUserIntelligence(state: RootState) {
   return getUser(state).intelligence;
}

export function getUserRealm(state: RootState) {
   return getUser(state).realm;
}

export function getUserSpheres(state: RootState) {
   return getUser(state).spheres;
}

export function getUserTimer(state: RootState) {
   return getUser(state).timer;
}

//player
export function getPlayer(state: RootState) {
   return state?.player;
}

// data
export function getData(state: RootState) {
   return state?.data.data;
}

export function getDataPages(state: RootState) {
   return getData(state)?.pages;
}

export function getDataMagie(state: RootState) {
   return getData(state)?.magie;
}

export function getDataSpells(state: RootState) {
   return getDataMagie(state)?.spells;
}

export function getDataGods(state: RootState) {
   return getDataMagie(state)?.gods;
}

export function getDataSpheres(state: RootState) {
   return getDataMagie(state)?.spheres;
}

export function getDataSkills(state: RootState) {
   return getData(state)?.skills;
}
