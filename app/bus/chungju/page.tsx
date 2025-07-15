'use client';

import {CustomOverlayMap, Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";
import styles from '@/app/bus/chungju/page.module.css'
import {SetStateAction, useEffect, useRef, useState} from "react";
import {BottomSheet} from "react-spring-bottom-sheet";
import BottomSheetContainer from "@/components/bottomSheetContainer/BottomSheetContainer";
import BottomSheetTitle from "@/components/bottomSheetTitle/BottomSheetTitle";
import BottomSheetBusInfo from "@/components/bottomSheetBusInfo/BottomSheetBusInfo";
import Twemoji from "@/components/twemoji/Twemoji";
import axios from "axios";
import BusInfoTitle from "@/components/busInfoTitle/BusInfoTitle";
import BusInfoList from "@/components/busInfoList/BusInfoList";
import BusInfoItem from "@/components/busInfoItem/BusInfoItem";
import {MdInfo} from "react-icons/md";
import {IoRefreshOutline} from "react-icons/io5";
import SelectCampusButton from "@/components/selectCampusButton/SelectCampusButton";
import MuiButton from "@/components/muiButton/MuiButton";
import BottomSheetBusRoute from "@/components/bottomSheetBusRoute/BottomSheetBusRoute";
import BottomSheetBusRouteItem from "@/components/bottomSheetBusRouteItem/BottomSheetBusRouteItem";

export default function Chungju() {

    // TODO
    // 실시간 버스위치(노선 클릭 시 보이는거) 항목에서 현재 버스 정류장이 똑같은게 2개 있으면 두개 다 표시되는 버그
    // 수정할 것.

    const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_API_URL) : (process.env.NEXT_PUBLIC_PROD_API_URL)
    const [dataRefreshText, setDataRefreshText] = useState('준비 중...')
    const [dataRefreshCountdown, setDataRefreshCountdown] = useState<number>(5)
    const [isDataRefreshed, setIsDataRefreshed] = useState<boolean>(false)
    const [busInfo, setBusInfo] = useState<{ [key: string]: any }>([]);
    const [markers, setMarkers] = useState<{ [key: string]: any }>([]);
    const [bottomSheet, setBottomSheet] = useState({
        busInfo: {
            open: false,
            data: {
                busId: '',
                busRoute: '',
                busLatestStop: '',
            }
        }
    });

    const changeBusInfoForm = (arr: Array<{ [key: string]: any }>) => {
        const result: { [key: string]: any } = {};
        arr.forEach(item => {
            const {busId, ...rest} = item;
            result[busId] = rest;
        });
        return result;
    };

    const clickBusInfo = (busId: string, busRoute: string, busLatestStop: string) => {
        setBottomSheet((data)=>(
            {...data, busInfo: {
                open: true,
                data: {
                    busId: busId,
                    busRoute: busRoute,
                    busLatestStop: busLatestStop,
                }
            }}
        ))
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: url + '/v1/bus/chungju/live/all',
        })
            .then(r=>{
                let {data} = r
                // let _data = changeBusInfoForm(data.data)
                setBusInfo(data.data)
                setIsDataRefreshed(true)
            })
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDataRefreshCountdown(prevCountdown => {
                if (prevCountdown === 0) {
                    // Refresh
                    if (!isDataRefreshed) {
                        setDataRefreshText('갱신 중...')
                        axios({
                            method: 'GET',
                            url: url + '/v1/bus/chungju/live/all',
                        })
                            .then(r=>{
                                let {data} = r
                                // let _data = changeBusInfoForm(data.data)
                                setBusInfo(data.data)
                                setIsDataRefreshed(true)
                                return 0
                            })
                    }
                    setDataRefreshText(`갱신 완료!`);
                    return 5;
                } else {
                    setIsDataRefreshed(false)
                    setDataRefreshText(`${prevCountdown}초 후 자동 갱신`);
                    return prevCountdown - 1;
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);

    }, []);


    return (
        <>
            <div className={styles.refresh}>
                {dataRefreshCountdown != 5 && (
                    <div className={styles.icon}>
                        <IoRefreshOutline size={15}/>
                    </div>
                )}
                <div className={styles.text} style={dataRefreshCountdown == 5 ? {marginLeft: 0}:{}}>
                    {dataRefreshText}
                </div>
            </div>
            <div className={styles.refresh_space} />
            <BusInfoTitle
                title={'운행 중'}
                status={'success'}
            />

            <BusInfoList>
                {
                    busInfo.map((item: { status: string; startNode: any; endNode: any; busStopName: any; busId: string, routeInfo: string }, key: string) => {
                        if (item?.status === 'RUNNING' || item?.status === 'WAIT_DATA' || item?.status === 'RUNNING_DATA_NOT_RECEIVED') {
                            return (
                                <BusInfoItem
                                    key={key+'RUNNING'}
                                    start={item.startNode}
                                    end={item.endNode}
                                    latestStop={(item.status == 'WAIT_DATA') ? (item?.startNode) : (item?.busStopName)} // 처음에 WAIT_DATA인 경우에는 기점으로 표시되게 할 것.
                                    notice={(item.status == 'WAIT_DATA' ? item.status : undefined) || (item.status == 'RUNNING_DATA_NOT_RECEIVED' ? item.status : undefined)}
                                    status={'success'}
                                    onClick={()=>{
                                        setBottomSheet((data)=>({
                                            ...data,
                                            busInfo: {
                                                ...data.busInfo,
                                                data: {
                                                    busId: item.busId,
                                                    busLatestStop: item.busStopName,
                                                    busRoute: item.routeInfo
                                                }
                                            }
                                        }))
                                        clickBusInfo(item.busId, item.routeInfo, item?.busStopName)
                                    }}
                                />
                            )
                        }
                    })
                }
                {
                    busInfo.filter((_data: any)=>(_data.status == 'RUNNING' || _data.status == 'WAIT_DATA')).length == 0 && (
                        <div className={styles.no_data}>
                            <div className={styles.icon}>
                                <MdInfo size={20}/>
                            </div>
                            <div className={styles.text}>
                                운행 중인 버스가 없습니다.
                            </div>
                        </div>
                    )
                }
            </BusInfoList>

            <BusInfoTitle
                title={'운행 대기'}
                status={'warn'}
            />

            <BusInfoList>
                {
                    busInfo.map((item: { busId: string, status: string; startNode: any; endNode: any; busStopName: any; routeInfo: any, startRunningTime: string }, key: string) => {
                        if (item?.status === 'WAIT') {
                            return (
                                <BusInfoItem
                                    key={key+'WAIT'}
                                    start={item.startNode}
                                    end={item.endNode}
                                    latestStop={item?.busStopName} // 처음에 WAIT_DATA인 경우에는 기점으로 표시되게 할 것.
                                    notice={'시간표에 따라 '+ item.startRunningTime +' 에 운행이 시작됩니다.'}
                                    status={'warn'}
                                    noticeColor={'warn'}
                                    onClick={()=>{
                                        setBottomSheet((data)=>({
                                            ...data,
                                            busInfo: {
                                                ...data.busInfo,
                                                data: {
                                                    busId: item.busId,
                                                    busLatestStop: item.busStopName,
                                                    busRoute: item.routeInfo
                                                }
                                            }
                                        }))
                                        clickBusInfo(item.busId, item.routeInfo, item.busStopName)
                                    }}
                                />
                            )
                        }
                    })
                }
                {
                    busInfo.filter((_data: any)=>(_data.status == 'WAIT')).length == 0 && (
                        <div className={styles.no_data}>
                            <div className={styles.icon}>
                                <MdInfo size={20}/>
                            </div>
                            <div className={styles.text}>
                                운행 대기 중인 버스가 없습니다.
                            </div>
                        </div>
                    )
                }
            </BusInfoList>

            <BusInfoTitle
                title={'운행 종료'}
                status={'error'}
            />

            <BusInfoList>
                {
                    busInfo.map((item: { busId: string, status: string; startNode: any; endNode: any; busStopName: any; routeInfo: any }, key: string) => {
                        if (item?.status === 'END') {
                            return (
                                <BusInfoItem
                                    key={key+'RUNNING'}
                                    start={item.startNode}
                                    end={item.endNode}
                                    latestStop={item?.busStopName} // WAIT_DATA인 경우, 기점을 표시함(backend).
                                    status={'error'}
                                    onClick={()=>{
                                        setBottomSheet((data)=>({
                                            ...data,
                                            busInfo: {
                                                ...data.busInfo,
                                                data: {
                                                    busId: item.busId,
                                                    busLatestStop: item.busStopName,
                                                    busRoute: item.routeInfo
                                                }
                                            }
                                        }))
                                        clickBusInfo(item.busId, item.routeInfo, item.busStopName)
                                    }}
                                />
                            )
                        }
                    })
                }
                {
                    busInfo.filter((_data: any)=>(_data.status == 'END')).length == 0 && (
                        <div className={styles.no_data}>
                            <div className={styles.icon}>
                                <MdInfo size={20}/>
                            </div>
                            <div className={styles.text}>
                                운행이 종료된 버스가 없습니다.
                            </div>
                        </div>
                    )
                }
            </BusInfoList>

            <BottomSheet
                open={bottomSheet.busInfo.open}
                onDismiss={()=>setBottomSheet(data=>({...data, busInfo: { ...data.busInfo, open: false }}))}
            >
                <BottomSheetContainer>
                    <BottomSheetTitle
                        title={<div className={styles.bottomSheetCustomTitle}>실시간 버스정보</div>}
                        description={bottomSheet.busInfo.data.busId}
                        fixed={true}
                    />
                    <BottomSheetBusRoute>
                        {bottomSheet.busInfo.data.busRoute.split('||').map((data: any, key: any)=>{
                            let _active
                            if (bottomSheet.busInfo.data?.busLatestStop == null || bottomSheet.busInfo.data?.busLatestStop == '') {
                                _active = false
                            }
                            else if (data.split('@')[0] == bottomSheet.busInfo.data.busLatestStop) {
                                _active = true
                            }
                            return (
                                <BottomSheetBusRouteItem
                                    key={key}
                                    name={data.split('@')[0]}
                                    code={data.split('@')[1]}
                                    active={_active}
                                    firstItem={key==0}
                                    lastItem={(bottomSheet.busInfo.data.busRoute.split('||').length - 1) == key}
                                />
                            )
                        })}
                    </BottomSheetBusRoute>
                    <MuiButton
                        bottomSheet={true}
                        onClick={()=>setBottomSheet(data=>({...data, busInfo: { ...data.busInfo, open: false }}))}
                        fixed={true}
                    >
                        닫기
                    </MuiButton>
                </BottomSheetContainer>
                <div className={styles.bottom_space} />
            </BottomSheet>
        </>
    )
}