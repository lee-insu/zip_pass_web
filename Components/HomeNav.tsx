import React from "react";

const HomeNav = () => {
  return (
    <nav className="fixed top-0 left-0 z-10 w-full h-[91px]">
      <div className="max-w-[820px] mx-auto h-full flex bg-white border-b-2 border-gray-100 justify-between items-center px-6">
        <div className="nav-left">
          logo
          {/* <img src="/logo.png" alt="logo" /> */}
        </div>
        <div className="nav-right">
          bell
          {/* <img src="/bell.png" alt="bell" /> */}
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
