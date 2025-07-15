import type {Metadata} from "next";
import FooterMenu from "@/components/footerMenu/FooterMenu";
import FooterMenuItem from "@/components/footerMenuItem/FooterMenuItem";
import {IoMap, IoMapOutline, IoTime, IoTimeOutline} from "react-icons/io5";

export const metadata: Metadata = {
    title: "교통대 도우미 | 교내 순환버스 | 충주캠퍼스",
    description: "",
};

// @ts-ignore
export default function ClientLayout({ children }) {
    return (
        <>
            {children}
            <FooterMenu>
                <FooterMenuItem
                    path={'/bus/chungju'}
                    activeIcon={<IoTime size={20} />}
                    icon={<IoTimeOutline size={20} />}
                >
                    시간표
                </FooterMenuItem>
                <FooterMenuItem
                    path={'/bus/chungju/map'}
                    activeIcon={<IoMap size={20} />}
                    icon={<IoMapOutline size={20} />}
                >
                    실시간 위치
                </FooterMenuItem>
            </FooterMenu>
        </>
    )
};