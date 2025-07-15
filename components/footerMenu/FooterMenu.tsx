import styles from '@/components/footerMenu/footerMenu.module.css'

const FooterMenu = (props: any) => {
    return (
        <>
            <div className={styles.space} />
            <div className={styles.box}>
                {props.children}
            </div>
        </>
    )
}

export default FooterMenu