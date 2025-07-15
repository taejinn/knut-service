import styles from '@/components/goToPageButton/goToPageButton.module.css'
import Twemoji from "@/components/twemoji/Twemoji";

const GoToPageButton = (props: any) => {
    return (
        <>
            <div className={styles.box}>
                <div className={styles.button} onClick={props.onClick}>
                    <div className={styles.icon}>
                        <Twemoji options={{className: styles.icon_size}}>{props.icon}</Twemoji>
                    </div>
                    <div className={styles.text_box}>
                        <div className={styles.title}>
                            {props.title}
                        </div>
                        <div className={styles.description}>
                            {props.description}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GoToPageButton