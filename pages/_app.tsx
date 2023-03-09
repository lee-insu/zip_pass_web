import TabBar from "@/Components/TabBar";
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import styles from "../styles/Home.module.css";

export default function App({Component, pageProps}: AppProps) {
  const shouldRenderTabBar = useRouter().pathname !== "/detail/[id]";

  useEffect(() => {
    // try {
    //   if (!window.Kakao.isInitialized()) {
    //     window.Kakao.init(process.env.NEXT_PUBLIC_VITE_KAKAO_JAVASCRIPT_KEY);
    //   }
    // } catch (error) {
    //   console.log("kakao error" + error);
    // }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
        {shouldRenderTabBar && <TabBar />}
      </div>
    </div>
  );
}
