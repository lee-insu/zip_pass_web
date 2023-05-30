import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotiNav = () => {
  return (
    <nav className="fixed top-0 left-0 z-10 w-full h-[64px]">
      <div className="max-w-[820px] mx-auto h-full flex bg-[#fff] border-b-2 border-gray-100 justify-between items-center px-6">
        <div className="nav-left flex space-x-4">
          <Link href={"/"}>
            <Image
              className="pt-2"
              src="/images/back.svg"
              alt="뒤로가기"
              width={17}
              height={17}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NotiNav;
