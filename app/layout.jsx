"use client";
import { RecoilRoot } from "recoil";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigations/NavigationHome";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"], weight: ['400', '700'], });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <RecoilRoot>
        <body className={inter.className}>
          <Navigation />
          {children}
        </body>
      </RecoilRoot>
    </html>
  );
}
