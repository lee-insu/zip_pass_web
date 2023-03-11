import Link from "next/link";
import React from "react";

const NotiNav = () => {
  return (
    <nav className="fixed top-0 left-0 z-10 w-full h-[91px]">
      <div className="max-w-[820px] mx-auto h-full flex bg-white border-b-2 border-gray-100 justify-between items-center px-6">
        <div className="nav-left flex space-x-4">
          <Link href={"/"}>
            <div>^</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NotiNav;
