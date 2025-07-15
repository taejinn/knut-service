'use client';

import {CustomOverlayMap, Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";
import {SetStateAction, useEffect, useState} from "react";
import styles from "@/app/bus/chungju/map/page.module.css";
import axios from "axios";
import {IoRefreshOutline} from "react-icons/io5";
import BusInfoItem from "@/components/busInfoItem/BusInfoItem";

export default function Chungju() {
    const [loading, error] = useKakaoLoader({
        appkey: "d786cd4f264a8664337938ddbcab2deb"
    })
    const busStop = [
        {name: '교통대(철도뒷길시내방향)', lat: 36.96208810791515, lng: 127.87084587258568},
        {name: '교통대(철도뒷편대소원방향)', lat: 36.96216147141841, lng: 127.87097864370799},
        {name: '한국교통대(농협)', lat: 36.96299210742828, lng: 127.87013753340685},
        {name: '한국교통대(농협.건너편)', lat: 36.96256711417734, lng: 127.87156995974968},
        {name: '한국교통대(대학본부)', lat: 36.9708091, lng: 127.871788},
        {name: '한국교통대(대학본부건너편)', lat: 36.97068460, lng: 127.87187010},
        {name: '한국교통대(시내방향)', lat: 36.96449102873984, lng: 127.87093500119188},
        {name: '한국교통대(정문)', lat: 36.96670972028266, lng: 127.87187826628032},
        {name: '한국교통대(정문방향)', lat: 36.96424558030483, lng: 127.8712297700242},
        {name: '한국교통대(체육관)', lat: 36.96801874216403, lng: 127.87153946940171},
        {name: '한국교통대(체육관건너편)', lat: 36.96810510416379, lng: 127.87174258375636},
        {name: '한국교통대(회차지)', lat: 36.97243036737846, lng: 127.8704892254662},
        {name: '용두동', lat: 36.96194473, lng: 127.88113793295979},
        {name: '원달천', lat: 36.961886289126525, lng: 127.89764320987827},
        {name: '건국대사거리', lat: 36.967180110312235, lng: 127.90681791808804},
        {name: '충주역', lat: 36.97695145638341, lng: 127.91072140909687},
        {name: '시외버스터미널', lat: 36.981911927101315, lng: 127.91567743374685},
        {name: '터미널(하이마트건너편)', lat: 36.98055348853889, lng: 127.9142291731129},
        {name: '충주역', lat: 36.97590077161015, lng: 127.9099648643963},
        {name: '건국대사거리', lat: 36.965702603334904, lng: 127.90531254339008},
        {name: '원달천', lat: 36.96199404230484, lng: 127.89739464054408},
        {name: '용두동', lat: 36.962029713971226, lng: 127.88180987039252},
        {name: '터미널(시내방향)', lat: 36.982210691918745, lng: 127.91695297775532},
        {name: '칠금동 주민센터', lat: 36.98218990723127, lng: 127.91963985517002},
        {name: '대가미공원', lat: 36.98221336485615, lng: 127.92531764055177},
        {name: '중앙중학교', lat: 36.98220813455057, lng: 127.931171972681},
        {name: '연수동(세브란스산부인과)', lat: 36.98318798099391, lng: 127.93975361942694},
        {name: '세영리첼아파트', lat: 36.98490805758765, lng: 127.93958664447518},
        {name: '연수초교', lat: 36.987307812298994, lng: 127.93835815478431},
        {name: '주공2단지', lat: 36.98733629367924, lng: 127.9364630708759},
        {name: '연수동주민센터(건너편)', lat: 36.987368325933225, lng: 127.93325386038006},
        {name: '세원아파트(맞은편)', lat: 36.98738622889356, lng: 127.93097394002778},
        {name: '세원한아름아파트', lat: 36.98484940754156, lng: 127.92814348864798},
        {name: '법원사거리', lat: 36.98292577863082, lng: 127.92812854314873},
        {name: '법원', lat: 36.98248157769105, lng: 127.92529842587842},
        {name: '금릉소공원', lat: 36.98251779340889, lng: 127.92005936758704},
        {name: '터미널(시외방향)', lat: 36.98254164635128, lng: 127.91697660485255},
        {name: '시외버스터미널', lat: 36.98148790821404, lng: 127.91574535595035},
        {name: '차고지', lat: 36.971894134634105, lng: 127.91805326051836},
        {name: '우암정사', lat: 36.98105168031181, lng: 127.92811700891959},
        {name: '건대병원', lat: 36.97855810068925, lng: 127.9281063753038},
        {name: '대봉교', lat: 36.97702248276336, lng: 127.92686638691865},
        {name: '문화동', lat: 36.97259281716503, lng: 127.9214952399583},
        {name: '봉방사거리', lat: 36.97445110774909, lng: 127.91335039309523},
    ];
    const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_API_URL) : (process.env.NEXT_PUBLIC_PROD_API_URL);
    const [busInfo, setBusInfo] = useState<{ [key: string]: any }>([]);
    const [markers, setMarkers] = useState<{ [key: string]: any }>([]);
    const [dataRefreshText, setDataRefreshText] = useState('준비 중...');
    const [dataRefreshCountdown, setDataRefreshCountdown] = useState<number>(5);
    const [isDataRefreshed, setIsDataRefreshed] = useState<boolean>(false);
    const [geoLocation, setGeoLocation] = useState({
        lat: 0,
        lng: 0
    });
    const setBusLocationMarkers = (data: Array<{ [key: string]: any }>) => {
        let loc: SetStateAction<{ [key: string]: any; }> | { position: { lat: any; lng: any; }; }[] = [];
        data.map((item, key) => {
            if (item.status == 'RUNNING') {
                loc.push({ position: { lat: item.lat, lng: item.lng }, name: item.busStopName });
            }
        })
        setMarkers(loc);
        return;
    }
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setGeoLocation({lat: position.coords.latitude, lng: position.coords.longitude});
                }
            )
        }
    }, []);
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
                <div className={styles.text} style={dataRefreshCountdown == 5 ? {marginLeft: 0} : {}}>
                    {dataRefreshText}
                </div>
            </div>
            <Map
                center={{
                    lat: 36.9698407,
                    lng: 127.8717767,
                }}
                style={{
                    width: '100%',
                    height: '100vh',
                }}
                level={4}
                // onClick={(_, mouseEvent) => {
                //     const latlng = mouseEvent.latLng
                //     console.log({
                //         lat: latlng.getLat(),
                //         lng: latlng.getLng(),
                //     })
                // }}
            >
                <MapMarker
                    position={{lat: geoLocation.lat, lng: geoLocation.lng}}
                    image={{
                        src: "https://r2.knut.ptj.kr/map_marker.png",
                        size: {
                            width: 36,
                            height: 36,
                        },
                        options: {
                            offset: {
                                x: 18,
                                y: 18,
                            },
                        },
                    }}
                />
                <CustomOverlayMap position={{lat: geoLocation.lat, lng: geoLocation.lng}}>
                    <div className={styles.marker_bus} id={styles.geolocation}>
                        <div className={styles.name}>
                            내 위치
                        </div>
                    </div>
                </CustomOverlayMap>
                {busStop.map((item, index) => (
                    <div key={item.name + index + index}>
                        <MapMarker
                            key={item.name}
                            position={{
                                lat: item.lat,
                                lng: item.lng,
                            }}
                        />
                        <CustomOverlayMap
                            key={item.name + index}
                            position={{
                                lat: item.lat,
                                lng: item.lng,
                            }}
                        >
                            <div key={item.name + index + index} className={styles.marker_name}>
                                <div className={styles.name}>
                                    {item.name}
                                </div>
                            </div>
                        </CustomOverlayMap>
                    </div>
                ))}
                {
                    busInfo.map((item: { status: string; busId: string, busStopName: string, lat: number, lng: number }, key: string) => {
                        if (item?.status === 'RUNNING') {
                            return (
                                <div key={item.busId + key + key}>
                                    <MapMarker
                                        key={item.busId + key + key + key + key}
                                        position={{
                                            lat: item.lat,
                                            lng: item.lng,
                                        }}
                                    />
                                    <CustomOverlayMap
                                        key={item.busId + key}
                                        position={{
                                            lat: item.lat,
                                            lng: item.lng,
                                        }}
                                    >
                                        <div key={item.busId + key + key + key} className={styles.marker_bus}>
                                            <div className={styles.name}>
                                                999 ({item.busStopName})
                                            </div>
                                        </div>
                                    </CustomOverlayMap>
                                </div>
                            )
                        }
                    })
                }
            </Map>
        </>
    )

}