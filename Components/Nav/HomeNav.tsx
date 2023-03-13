import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeNav = () => {
  return (
    <nav className="fixed top-0 left-0 z-10 w-full h-[91px]">
      <div className="max-w-[820px] mx-auto h-full flex bg-[#FAFCFB] border-b-2 border-gray-100 justify-between items-center px-6">
        <div className="nav-left">
          <Image src="/images/logo.svg" alt="로고" width={112} height={26} />
        </div>
        <Link href={"/notification"}>
          <Image src="/images/bell.svg" alt="알림" width={24} height={24} />
        </Link>
      </div>
    </nav>
  );
};

export default HomeNav;
