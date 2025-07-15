import styles from '@/components/selectCampusButton/selectCampusButton.module.css'
import Twemoji from "@/components/twemoji/Twemoji";

const SelectCampusButton = (props: any) => {
    return (
        <>
            <div
                className={styles.button}
                style={
                    props.end ? {marginBottom: '0px'} : {}
                }
                onClick={props.onClick}
            >
                <Twemoji options={{className: styles.icon}}>{props.icon}</Twemoji>
                <div className={styles.box}>
                    <div className={styles.name}>{props.location}</div>
                    <div className={styles.address}>{props.address}</div>
                </div>
            </div>
        </>
    )
}

export default SelectCampusButton