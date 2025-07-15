import styles from '@/components/bottomSheetBusInfo/bottomSheetBusInfo.module.css'
import {useEffect, useState} from "react";

const BottomSheetBusInfo = (props: any) => {

    const [statusMessage, setStatusMessage] = useState({id: '', text: ''})
    useEffect(() => {
        if (props.status == 'RUNNING') {
            setStatusMessage({
                id: styles.green,
                text: '● 운행 중'
            })
        }

        if (props.status == 'WAIT') {
            setStatusMessage({
                id: styles.orange,
                text: '▲ 대기 중'
            })
        }

        if (props.status == 'END') {
            setStatusMessage({
                id: styles.red,
                text: '◇ 운행 종료'
            })
        }
    }, [props]);

    return (
        <>
            <div className={styles.bus}>
            <div className={styles.info}>
                    <div className={styles.route}>
                        <div className={styles.number}>{props.number}</div>
                        <div className={styles.direction}>
                            <span className={styles.text}>기점:</span> {props.start}
                        </div>
                        <div className={styles.direction}>
                            <span className={styles.text}>종점:</span> {props.end}
                        </div>
                    </div>
                    <div className={styles.now}>
                        <div className={styles.bus_status} id={statusMessage.id}>{statusMessage.text}</div>
                        <div className={styles.bus_now_station}>{props.nowStation}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BottomSheetBusInfo