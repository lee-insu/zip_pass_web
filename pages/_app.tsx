import Nav from "@/Components/Nav";
import TabBar from "@/Components/TabBar";
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {useEffect} from "react";
import styles from "../styles/Home.module.css";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({Component, pageProps}: AppProps) {
  useEffect(() => {
    try {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_VITE_KAKAO_JAVASCRIPT_KEY);
      }
    } catch (error) {
      console.log("kakao error" + error);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Nav />
        <Component {...pageProps} />
        <TabBar />
      </div>
    </div>
  );
}
