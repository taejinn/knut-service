import styles from '@/components/busInfoItem/busInfoItem.module.css'
import Twemoji from "@/components/twemoji/Twemoji";
import {MdInfo} from "react-icons/md";
import {useEffect, useState} from "react";

const BusInfoItem = (props: any) => {
    const [statusId, setStatusId] = useState<any>()
    const [noticeColor, setNoticeColor] = useState<any>(styles.default)
    const [noticeContent, setNoticeContent] = useState<string>('')
    useEffect(() => {
        if (props.status == 'success') setStatusId(styles.status_success)
        if (props.status == 'error') setStatusId(styles.status_error)
        if (props.status == 'warn') setStatusId(styles.status_warn)

        if (props.noticeColor == 'warn') setNoticeColor(styles.warn)

        if (props.notice == 'WAIT_DATA') {
            setNoticeContent('시간표상 출발했으나 실시간 위치 정보가 없습니다. 곧 정보가 입력됩니다.')
        }
        else if (props.notice == 'RUNNING_DATA_NOT_RECEIVED') {
            setNoticeContent('시간표상 운행 중이지만 버스의 위치정보를 불러올 수 없습니다.')
        }
        else {
            setNoticeContent(props.notice)
        }
    }, []);
    return (
        <>
            <div
                className={styles.container}
                onClick={props.onClick}
            >
                <div className={styles.box}>
                    <div className={styles.route}>
                        <div className={styles.route_status}>
                            <div className={styles.route_no}>
                                999
                            </div>
                            <div className={styles.status} id={statusId} />
                        </div>
                        <div className={styles.route_direction}>
                            <div className={styles.name}>
                                기점
                            </div>
                            <div className={styles.value}>
                                {props.start}
                            </div>
                        </div>
                        <div className={styles.route_direction}>
                            <div className={styles.name}>
                                종점
                            </div>
                            <div className={styles.value}>
                                {props.end}
                            </div>
                        </div>
                    </div>
                    <div className={styles.busstop}>
                        { props.latestStop && (
                            <>
                                <div className={styles.latest_busstop}>
                                    최근 정류장
                                </div>
                                <div className={styles.latest_busstop_now}>
                                    {props.latestStop}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {(props.notice != '' && props.notice != null) && (
                    <div className={styles.notice} id={noticeColor}>
                        <div className={styles.box}>
                            <div className={styles.icon}>
                            <MdInfo size={20}/>
                            </div>
                            <div className={styles.text}>
                                {noticeContent}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default BusInfoItem;