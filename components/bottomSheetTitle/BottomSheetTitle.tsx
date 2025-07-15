import styles from '@/components/bottomSheetTitle/bottomSheetTitle.module.css'
import Twemoji from "@/components/twemoji/Twemoji";

const BottomSheetTitle = (props: any) => {
    return (
        <>
            <div id={props.fixed ? styles.fixed : undefined}>
                <div className={styles.box}>
                    <div className={styles.title}>
                        {props.title}
                    </div>
                    <Twemoji options={{className: styles.icon}}>{props.titleIcon}</Twemoji>
                </div>
                <div className={styles.description}>
                    {props.description}
                </div>
            </div>
            <div className={props.fixed ? styles.fixedSpace : undefined}/>
        </>
    )
}

export default BottomSheetTitle