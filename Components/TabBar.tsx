import React from "react";

const TabBar = () => {
  return (
    <nav className="w-full h-[83px] border-t-2 border-gray-100">
      <ul className=" m-auto flex justify-between">
        <li className="tab-item w-1/2 h-[83px] bg-red-200">
          {/* <img src="/home.png" alt="home" /> */}
          전체
        </li>
        <li className="tab-item w-1/2 h-[83px] bg-blue-200">
          {/* <img src="/search.png" alt="search" /> */}홈
        </li>
      </ul>
    </nav>
  );
};

export default TabBar;
