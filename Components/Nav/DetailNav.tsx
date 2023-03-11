import Link from "next/link";
import React from "react";

const DetailNav = () => {
  return (
    <nav className="fixed top-0 left-0 z-10 w-full h-[91px]">
      <div className="max-w-[820px] mx-auto h-full flex bg-white border-b-2 border-gray-100 justify-between items-center px-6">
        <div className="nav-left flex space-x-4">
          <Link href={"/"}>
            <div>^</div>
          </Link>
          <div className="text-lg">핵심만 요약</div>
          {/* <img src="/logo.png" alt="logo" /> */}
        </div>
        <div className="nav-right flex space-x-12">
          <p>1</p>
          <p>1</p>
          <p>1</p>
          {/* <img src="/bell.png" alt="bell" /> */}
        </div>
      </div>
    </nav>
  );
};

export default DetailNav;
