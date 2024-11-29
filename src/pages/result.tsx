import Image from "next/image"
import Logo from "../img/logo.png"
import Background from "../img/background.png"

import styles from "../styles/result.module.css"

import { OptionsGame } from "@/components/optionsGames/optionsGame"

export default function Result() {

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