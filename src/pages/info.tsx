import Image from "next/image"
import Logo from "../img/logo.png"

import styles from "../styles/info.module.css"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Cover {
    image_id?: string 
};

interface Game {
    id: number;
    name: string;
    cover?: Cover;  
    summary?: string
};

export default function Info(){

    const router = useRouter();
    const [data, setData] = useState<Game>();

    useEffect(() => {
    
        try {
            const game: Game = {
                id: Number(router.query.id),
                name: router.query.name as string,
                cover: router.query.image ? { image_id: router.query.image as string } : undefined,
                summary: router.query.summary as string | undefined,
            };
            setData(game);
        } catch (error) {
            console.error("Erro ao fazer o parse dos dados:", error);
        }

        console.log(data)

    }, [])

    return(
        <div className={styles.body}>

            <div className={styles.info}>
                    {data?.cover?.image_id ? (
                        <Image
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${data.cover.image_id}.jpg`}
                            width={1920}
                            height={500}
                            alt={data.name || "Imagem do Jogo"}
                            className={styles.image}
                            priority
                        />
                        ) : (
                        <Image
                            src={Logo}
                            alt="Logo do nosso"
                            className={styles.image}
                        />
                    )}

                
                <p className={styles.launch}>Data de Lançamento <span>05/12/2019</span></p>

                <h6 className={styles.title}>{data?.name}</h6>


            </div>
                
            <main className={styles.main}>
                <div className={styles.languageWrapper}>
                    <div className={styles.language}>
                        <p>Idiomas: </p>
                        <hr />
                    </div>
                    <div className={styles.language}>
                        <p>Português (Brasil) </p>
                        <hr />
                    </div>
                    <div className={styles.language}>
                        <p>Inglês</p>
                        <hr />
                    </div>
                    <div className={styles.language}>
                        <p>Francês</p>
                        <hr />
                    </div>
                </div>
                
                {data?.summary && (
                    <div className={styles.synopsis}>
                        <h6>Sinopse</h6>
                        <hr />
                    
                        <div>
                            <p>{data?.summary}</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}   0