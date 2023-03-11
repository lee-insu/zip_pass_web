import Link from "next/link";
import React from "react";

const TabBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 z-10 w-full h-[83px]">
      <ul className="max-w-[820px] m-auto bg-white border-t-2 border-gray-100 bg-white flex justify-between">
        <Link className="tab-item w-1/2 h-[83px] bg-red-200" href={"/account"}>
          <li>
            {/* <img src="/home.png" alt="home" /> */}
            메뉴
          </li>
        </Link>
        <Link className="tab-item w-1/2 h-[83px] bg-blue-200" href={"/"}>
          <li>{/* <img src="/search.png" alt="search" /> */}공고</li>
        </Link>
      </ul>
    </nav>
  );
};

export default TabBar;
