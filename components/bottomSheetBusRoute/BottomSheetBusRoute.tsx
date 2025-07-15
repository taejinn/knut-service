import styles from '@/components/bottomSheetBusRoute/bottomSheetBusRoute.module.css'

const BottomSheetBusRoute = (props: any) => {
    return (
        <>
            {/*<div className={styles.route}>*/}
            {/*    <div className={styles.name}>*/}
            {/*        실시간 갱신 중*/}
            {/*    </div>*/}
            {/*    <div className={styles.status} id={styles.status_success}/>*/}
            {/*</div>*/}
            <div className={styles.items}>
                {props.children}
            </div>
        </>
    )
}

export default BottomSheetBusRoute