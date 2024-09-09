
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import PagesWrapper from "@/lib/components/PagesWrapper";

config.autoAddCss = false
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Who's Out",
  description: "Welcome to the game of Who's Out!",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Mouse+Memoirs&display=swap" rel="stylesheet"/>
      </head>
      <body className={`${inter.className} flex flex-col relative`}>
        <PagesWrapper children={children}/>
      </body>
    </html>
  );
}
