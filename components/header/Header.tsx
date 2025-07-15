import styles from '@/components/header/header.module.css'
import Twemoji from "@/components/twemoji/Twemoji";
import Image from "next/image";

const Header = (props: any) => {
    return (
        <>
            <div className={styles.header}>
                <Image className={styles.logo} src={'https://r2.knut.ptj.kr/BS10_시그니춰_국영문_가로형B_PNG.png'} alt={'국립한국교통대학교 심볼'} width={149} height={40} />
                <div className={styles.text}>
                    도우미
                </div>
            </div>
            <div className={styles.space} />
        </>
    )
}

export default Header