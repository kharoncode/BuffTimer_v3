import { store } from '@/router/store';

type submitData = { critic: boolean; int: number; spell: string };

export const spellDate = (data: submitData) => {
   const { int, critic, spell } = data;
   const time = Math.floor(
      store.getState().data.data.magie.spells[spell].time * int
   );
   const date = Date.now() + (critic ? time * 1.5 : time);
   return date;
};
