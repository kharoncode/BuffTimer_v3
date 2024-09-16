import styles from './messageCard.module.css';

type data = {
   name: string;
   message: string;
   picture: string;
};

const MessageCard = (data: data) => {
   const { name, message, picture } = data;
   return (
      <div className={styles.container}>
         <img className={styles.playerPicture} src={picture} alt={name} />
         <div className={styles.messageContainer}>
            <h4>{name}</h4>
            <p className={styles.message}>"{message}"</p>
         </div>
      </div>
   );
};

export default MessageCard;
