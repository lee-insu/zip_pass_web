import AccountNav from "@/Components/Nav/AccountNav";
import React from "react";

const Push = () => {
  return (
    <>
      <AccountNav />
      <div className="w-[88%] m-auto">
        <div className="my-9 space-y-0.5">
          <div className="text-center text-xl font-semibold text-gray-700">
            공고 알림은 앱을 다운 받아야 받을 수 있어요🥹
          </div>
        </div>
        <div className="mt-10">
          <ul className="w-full m-auto flex flex-col space-y-8">
            <li className="font-semibold text-lg bg-gray-100 text-center py-5 rounded-lg">
              {" "}
              저는 안드로이드에요
            </li>
            <li className="font-semibold text-lg border border-gray-400 text-center py-5 rounded-lg">
              {" "}
              저는 애플이에요
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Push;
