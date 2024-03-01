"use client";
import { RecoilRoot } from "recoil";
import NavigationHome from "components/navigations/NavigationHome";
import "./globals.scss";
import ContextHome from "@/stores/contextHome";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <RecoilRoot>
        <body>
          <NavigationHome />
          <ContextHome/>
          {children}
        </body>
      </RecoilRoot>
    </html>
  );
}
