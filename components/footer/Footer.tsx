import styles from '@/components/footer/footer.module.css'

const Footer = () => {
    return (
        <>
            <div className={styles.footer}>
                <div className={styles.text}>
                    본 서비스는 국립한국교통대학교 학우분들을 위해 개발되었습니다.
                </div>
            </div>
        </>
    )
}

export default Footer