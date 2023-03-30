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
        <title></title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          defer
        ></script>
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
