import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React from "react";

const TabBar = () => {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 z-10 w-full h-[64px]">
      <ul className="max-w-[820px] m-auto bg-white border-t-2 border-gray-100 bg-white flex justify-between">
        <Link className="tab-item w-1/2 h-[83px] bg-white" href={"/account"}>
          <li className="w-full pt-2 flex flex-col justify-center items-center">
            <Image
              src={
                router.pathname === "/account"
                  ? "/images/menu.svg"
                  : "/images/menu_gray.svg"
              }
              alt="메뉴"
              width={24}
              height={24}
            />
            <p
              className={
                router.pathname === "/account"
                  ? "text-xs"
                  : "text-xs text-gray-300"
              }
            >
              메뉴
            </p>
          </li>
        </Link>
        <Link className="tab-item w-1/2 h-[83px] bg-white" href={"/"}>
          <li className="w-full pt-2 flex flex-col justify-center items-center">
            <Image
              src={
                router.pathname === "/"
                  ? "/images/home.svg"
                  : "/images/home_gray.svg"
              }
              alt="홈"
              width={24}
              height={24}
            />
            <p
              className={
                router.pathname === "/" ? "text-xs" : "text-xs text-gray-300"
              }
            >
              홈
            </p>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default TabBar;
