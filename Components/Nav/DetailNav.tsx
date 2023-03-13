import Image from "next/image";
import Link from "next/link";
import React from "react";

const DetailNav = () => {
  return (
    <nav className="fixed top-0 left-0 z-10 w-full h-[91px]">
      <div className="max-w-[820px] mx-auto h-full flex bg-[#FAFCFB] border-b-2 border-gray-100 justify-between items-center px-6">
        <div className="nav-left flex space-x-4 ">
          <Link href={"/"}>
            <Image
              className="pt-2"
              src="/images/back.svg"
              alt="뒤로가기"
              width={17}
              height={17}
            />
          </Link>
          <div className="text-xl font-semibold">공고 요약</div>
          {/* <img src="/logo.png" alt="logo" /> */}
        </div>
        <div className="nav-right flex space-x-12">
          <Image
            src="/images/bookmark.svg"
            alt="공유하기"
            width={24}
            height={24}
          />
          <Image
            src="/images/share.svg"
            alt="공유하기"
            width={22}
            height={22}
          />
        </div>
      </div>
    </nav>
  );
};

export default DetailNav;
