import styles from './timer.module.css';
import { useState, useEffect } from 'react';

type data = {
   date: number;
   setIsOver: React.Dispatch<React.SetStateAction<boolean>>;
   isOpen?: boolean;
};

const Timer: React.FC<data> = (data) => {
   const { date, setIsOver, isOpen } = data;
   const [days, setDays] = useState(0);
   const [hours, setHours] = useState(0);
   const [minutes, setMinutes] = useState(0);
   //const [seconds, setSeconds] = useState(0);
   const [last, setLast] = useState(false);

   useEffect(() => {
      const getTime = (date: number) => {
         const time = date - Date.now();
         if (time < 60000 && time > 0) {
            setLast(true);
         } else if (time < 0) {
            setIsOver(true);
         }

         setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
         setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
         setMinutes(Math.floor((time / 1000 / 60) % 60));
         //setSeconds(Math.floor((time / 1000) % 60));
      };
      getTime(date);
      const interval = setInterval(() => getTime(date), 60000);

      return () => {
         clearInterval(interval);
      };
   }, [date, setIsOver]);

   return isOpen ? (
      <div className={styles.container}>
         {last ? `< 1min` : `${days}d ${hours}h ${minutes}m`}
      </div>
   ) : (
      <></>
   );
};

export default Timer;
