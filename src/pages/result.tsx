import Image from "next/image"
import Logo from "../img/logo.png"
import Background from "../img/background.png"

import styles from "../styles/result.module.css"

import { OptionsGame } from "@/components/optionsGames/optionsGame"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Result() {

    const router = useRouter();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      if (router.query.data) {
        try {
          const parsedData = JSON.parse(router.query.data as string);
          setData(parsedData);
        } catch (error) {
          console.error("Erro ao fazer o parse dos dados:", error);
        }
      }
    }, [router.query.data]);

    return(
        <div className={styles.background}>
            <Image src={Background} alt="" id={styles.background} />
            <div className={styles.body}>
                <div className={styles.wrapper}>
                    <div className={styles.logo}>
                        <Image className={styles.logoImage} src={Logo} alt="Logo do nosso site"></Image>
                        <div style={{width: "19rem"}}>
                            <p className={styles.info}>Clique em cima do banner para saber mais informações</p>
                        </div>
                    </div>

                    <div className={styles.games}>
                        <OptionsGame name="Grand theft auto" image={Background}/>
                        <OptionsGame name="Red Dead Redemption 2" image={Background}/>
                        <OptionsGame name="Grand theft auto" image={Background}/>
                        <OptionsGame name="Grand theft auto" image={Background}/>
                    </div>
                </div>
            </div>
        </div>
    )
}