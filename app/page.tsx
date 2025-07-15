'use client';

import styles from "./page.module.css";
import Header from "@/components/header/Header";
import GoToPageButton from "@/components/goToPageButton/GoToPageButton";
import Clock from "react-live-clock";
import {useEffect, useState} from "react";
import Footer from "@/components/footer/Footer";
import {BottomSheet} from "react-spring-bottom-sheet";
import BottomSheetContainer from "@/components/bottomSheetContainer/BottomSheetContainer";
import BottomSheetTitle from "@/components/bottomSheetTitle/BottomSheetTitle";
import SelectCampusButton from "@/components/selectCampusButton/SelectCampusButton";
import MuiButton from "@/components/muiButton/MuiButton";
import {useRouter} from "next/navigation";

export default function Home() {

    const router = useRouter()
    const [hydrated, setHydrated] = useState(false);
    const [bottomSheet, setBottomSheet] = useState({
        selectCampus: {
            open: false,
            service: '',
        }
    });
    const openSelectCampus = (service: string) => {
            setBottomSheet(data=>({
                ...data,
                selectCampus: {
                    open: true,
                    service: service
                }
            }))
    }
    useEffect(() => {
        setHydrated(true);
    }, []);

    return (
        <>
            <Header/>
            <div className={styles.time}>
                <div className={styles.text}>
                    현재 시간
                </div>
                <div className={styles.now}>
                    {hydrated ? <Clock format={'HH시 mm분 ss초'} ticking={true} timezone={'Rok'}/> : '00시 00분 00초'}
                </div>
            </div>
            <div className={styles.bar} />
            <div className={styles.main}>
                <div className={styles.big_text} id={styles.slogan}>
                    함께, 더 나은 미래로!
                </div>
            </div>
            <GoToPageButton
                icon={'🚍'}
                title={'교내 순환버스'}
                description={'실시간 위치 및 도착 시간 확인'}
                onClick={()=>{
                    openSelectCampus('bus')
                }}
            />
            <GoToPageButton
                icon={'🍱'}
                title={'교내 식당 식단표'}
                description={'매일 바뀌는 식단을 바로 확인'}
                onClick={()=>{
                    alert('준비 중 입니다.')
                    // openSelectCampus('menu')
                }}
            />
            <Footer />

            <BottomSheet
                open={bottomSheet.selectCampus.open}
                onDismiss={()=>setBottomSheet(data=>({...data, selectCampus: { ...data.selectCampus, open: false, service: '' }}))}
            >
                <BottomSheetContainer>
                    <BottomSheetTitle
                        title={'캠퍼스 선택'}
                        titleIcon={'🏢'}
                        description={'자신의 캠퍼스를 선택해주세요'}
                    />
                    <SelectCampusButton
                        icon={'🖥️'}
                        location={'충주 캠퍼스'}
                        address={'충청북도 충주시 대소원면 대학로 50'}
                        onClick={()=>router.push(`/${bottomSheet.selectCampus.service}/chungju`)}
                    />
                    <SelectCampusButton
                        icon={'🏥️'}
                        location={'증평 캠퍼스'}
                        address={'충청북도 증평군 증평읍 대학로 61'}
                        onClick={()=>{
                            alert('준비 중 입니다.')
                            return
                            // router.push(`/${bottomSheet.selectCampus.service}/jeungpyeong`)
                        }}
                    />
                    <SelectCampusButton
                        icon={'🚆️'}
                        location={'의왕 캠퍼스'}
                        address={'경기도 의왕시 철도박물관로 157'}
                        onClick={()=>{
                            alert('준비 중 입니다.')
                            return
                            // router.push(`/${bottomSheet.selectCampus.service}/uiwang`)
                        }}
                        end={true}
                    />
                    <MuiButton
                        bottomSheet={true}
                        onClick={()=>setBottomSheet(data=>({...data, selectCampus: { ...data.selectCampus, open: false, service: '' }}))}
                    >
                        닫기
                    </MuiButton>
                </BottomSheetContainer>
            </BottomSheet>
        </>
    );
}
