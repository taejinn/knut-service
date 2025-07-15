import styles from '@/components/busInfoTitle/busInfoTitle.module.css'
import Twemoji from "@/components/twemoji/Twemoji";
import {useEffect, useState} from "react";

const BusInfoTitle = (props: any) => {
    const [statusId, setStatusId] = useState<any>()
    useEffect(() => {
        if (props.status == 'success') setStatusId(styles.status_success)
        if (props.status == 'error') setStatusId(styles.status_error)
        if (props.status == 'warn') setStatusId(styles.status_warn)
    }, []);

    return (
        <>
            <div className={styles.title}>
                <div className={styles.text}>
                    {props.title}
                </div>
                <div className={styles.status} id={statusId} />
                {/*<Twemoji options={{className: styles.icon}}>{props.icon}</Twemoji>*/}
            </div>
        </>
    )

}

export default BusInfoTitle