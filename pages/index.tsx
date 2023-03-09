import HomeNav from "@/Components/HomeNav";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Index.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <HomeNav />
        <div className={styles.container}>
          <div className="w-[88%] m-auto">
            <div className="my-9">
              <div className="text-xl font-bold">공고 리스트</div>
            </div>

            <ul className="space-y-4 h-full w-full">
              <li className="rounded-xl border border-none bg-[#F2F4F6] h-160 flex items-center">
                <div className="rounded-lg w-24 h-32 bg-[#15AA2C] m-4 "></div>
                <div className="flex flex-col justify-start">
                  <p className="text-xl font-bold">당첨 확률</p>
                  <p className="text-base">서울시 마포구 동교로 64-5</p>
                  <p className="text-base">보증금 1억 2천</p>
                  <p className="text-base">월세 15만원</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    </>
  );
}
