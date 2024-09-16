import { store } from '../router/store';

const getUserSpellsList = () => {
   const userSpellsIdList: string[] = [];
   const userSpellsList: { [key: string]: { [key: string]: string } } = {};
   const dataSpheres = store.getState().data.data.magie.spheres;
   const dataSpells = store.getState().data.data.magie.spells;
   const userSpheres = store.getState().login.user.spheres;

   userSpheres.split(' ').map((el: string) => {
      dataSpheres[el].list
         .split(' ')
         .map((spell: string) => userSpellsIdList.push(spell));
   });
   userSpellsIdList.map((el) => (userSpellsList[el] = dataSpells[el]));

   return userSpellsList;
};

export default getUserSpellsList;
