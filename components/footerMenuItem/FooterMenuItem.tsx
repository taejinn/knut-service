'use client';

import styles from '@/components/footerMenuItem/footerMenuItem.module.css';
import { IoMdBus } from "react-icons/io";
import {usePathname, useRouter} from "next/navigation";

const FooterMenuItem = (props: any) => {
    const path = usePathname()
    const router = useRouter()

    return (
        <>
            <div
                className={styles.item}
                onClick={()=>{
                    if (props.path == path) return
                    router.push(props.path)
                }}
            >
                <div className={styles.icon}>
                    {path == props.path ? props.activeIcon : props.icon}
                </div>
                <div className={styles.name} id={path == props.path ? styles.active : ''}>
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default FooterMenuItem