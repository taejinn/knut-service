import styles from '@/components/bottomSheetContainer/bottomSheetContainer.module.css'

const BottomSheetContainer = (props: any) => {
    return (
        <>
            <div className={styles.container}>
                {props.children}
            </div>
            {/*<div className={styles.space}/>*/}
        </>
    )
}

export default BottomSheetContainer