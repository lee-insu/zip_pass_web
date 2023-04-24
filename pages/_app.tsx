import TabBar from "@/Components/TabBar";
import "@/styles/globals.css";
import Head from "next/head";
import type {AppProps} from "next/app";
import {useRouter} from "next/router";
import {Provider} from "react-redux";
import {store} from "../store/store";
import styles from "../styles/Home.module.css";

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();
  const shouldRenderTabBar =
    router.pathname !== "/detail/[id]" && router.pathname !== "/notification";

  return (
    <>
      <Head>
        <title>집패스-서울에서 저렴하게 살기</title>
        <meta name="description" content="서울에서 저렴하게 내 집 찾기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/zip_pass.ico" />
      </Head>
      <Provider store={store}>
        <div className={styles.container}>
          <div className={styles.main}>
            <div className={styles.content}>
              <Component {...pageProps} />
            </div>
            {shouldRenderTabBar && <TabBar />}
          </div>
        </div>
      </Provider>
    </>
  );
}
