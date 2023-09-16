"use client";
import { RecoilRoot } from "recoil";
import { Inter } from "next/font/google";
import NavigationHome from "components/navigations/NavigationHome";

import "./globals.scss";

const inter = Inter({ subsets: ["latin"], weight: ['400', '700'], });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <RecoilRoot>
        <body className={inter.className}>
          <NavigationHome />
          {children}
        </body>
      </RecoilRoot>
    </html>
  );
}
