import type { players } from './formatPlayer';

const formatFavoris = (list: string[], players: players) => {
   const favoris: players = {};
   if (list.length === 0) {
      return {};
   }
   list.map((el) => (favoris[el] = players[el]));
   return favoris;
};

export default formatFavoris;
