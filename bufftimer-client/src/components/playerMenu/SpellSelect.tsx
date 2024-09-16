import getUserSpellsList from '@/utils/getUserSpellsList';
import styles from './editPlayer.module.css';

export const SpellSelect = () => {
   const spheres = getUserSpellsList();
   return (
      <select className={styles.select} name={`spellsList$`} id={`spellList`}>
         {Object.keys(spheres)
            .sort()
            .map((key) => (
               <option key={key} value={key}>
                  {spheres[key].name}
               </option>
            ))}
      </select>
   );
};
