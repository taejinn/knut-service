import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast";
import 'react-spring-bottom-sheet/dist/style.css';
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "교통대 도우미",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
    <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
    </head>
    <body className={inter.className}>
    <Analytics/>
    <GoogleAnalytics gaId="G-6X5TMW7NSY" />
    <Toaster position="top-center"
         reverseOrder={false}
         toastOptions={{
           duration: 2300,
           style: {
             borderRadius: '30px',
             background: '#333',
             color: '#fff',
           },
         }}
        />
        {children}
      </body>
    </html>
  );
}
