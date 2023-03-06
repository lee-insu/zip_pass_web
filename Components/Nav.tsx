import React from "react";

const Nav = () => {
  return (
    <nav className="w-full h-[91px] border-b-2 border-gray-100">
      <ul className="w-4/5 m-auto flex justify-between">
        <li className="nav-left">
          logo
          {/* <img src="/logo.png" alt="logo" /> */}
        </li>
        <li className="nav-right">
          bell
          {/* <img src="/bell.png" alt="bell" /> */}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
