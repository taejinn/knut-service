import styles from '@/components/bottomSheetBusRouteItem/bottomSheetBusRouteItem.module.css'
import { IoMdBus } from "react-icons/io";

const BottomSheetBusRouteItem = (props:any) => {
    return (
        <>
            <div className={styles.box}>
                <div className={styles.circle}/>
                {props.active && (
                    <>
                        <div className={styles.now}/>
                        <div className={styles.now_text}>
                            최근 위치
                        </div>
                        <div className={styles.triangle}/>
                    </>
                )}
                {!props.firstItem && (
                    <div className={styles.top_line}/>
                )}
                {!props.lastItem && (
                    <div className={styles.bottom_line}/>
                )}
                <div className={styles.busstop}>
                    <div className={styles.name}>
                        {props.name}
                    </div>
                    <div className={styles.code}>
                        {props.code}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BottomSheetBusRouteItem