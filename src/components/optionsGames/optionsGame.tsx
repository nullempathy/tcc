import styles from "./optionGames.module.css";
import Image from "next/image";
import NoGame from "../../img/logo.png"; 

interface Props {
  image?: string; 
  name: string;
}

export function OptionsGame({ image, name }: Props) {
  const imageUrl = image || NoGame;

  function renderImage(){

    if(image){
      return <Image
          className={styles.image}
          src={imageUrl}  
          alt={`Imagem do jogo ${name}`}
          width={320}
          height={190}
        />
    } else {
      return <Image
          className={styles.noImage}
          src={NoGame}  
          alt={`Imagem do jogo ${name}`}
          width={320}
          height={190}
          objectFit="cover"
        />
    }
  }

  return (
    <button className={styles.body}>
      <div className={styles.imageWrapper}>
        {renderImage()}
      </div>

      <div className={styles.name}>
        <p>{name}</p>
      </div>
    </button>
  );
}
