import styles from '@/components/busInfoList/busInfoList.module.css'

const BusInfoList = (props: any) => {
    return (
        <>
            <div className={styles.box}>
                {props.children}
            </div>
        </>
    )
}
export default BusInfoList