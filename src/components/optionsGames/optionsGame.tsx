import styles from "./optionGames.module.css"

import Image from "next/image";

interface Props{
    image: any;
    name: string;
}

export function OptionsGame(props: Props){
    return(
        <button className={styles.body}>
            <div>
                <Image className={styles.image} src={props.image} alt="Imagem do jogo" />
            </div>

            <div className={styles.name}>
                <p>{props.name}</p>
            </div>
        </button>
    )
}