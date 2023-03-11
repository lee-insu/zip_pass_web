import AccountNav from "@/Components/Nav/AccountNav";
import React from "react";

const Account = () => {
  return (
    <>
      <AccountNav />
      <div className="w-[88%] m-auto">
        <div className="my-9 space-y-0.5">
          <div className="text-xl font-semibold text-gray-700">
            이인수님을 위한 공고 알림{" "}
          </div>
        </div>
        <ul className="space-y-8 h-full w-full">
          <li className="flex justify-between text-lg font-medium text-gray-500">
            <p>공고 유형별 알림</p>
            <p>^</p>
          </li>
          <li className="flex justify-between text-lg font-medium text-gray-500">
            <p>청년 재테크 알림</p>
            <p>^</p>
          </li>
        </ul>

        <div className="mt-12 mb-9 space-y-0.5">
          <div className="text-xl font-semibold text-gray-800">
            개선점을 알려주세요{" "}
          </div>
        </div>

        <ul className="space-y-8 h-full w-full">
          <li className="flex justify-between text-lg font-medium text-gray-500">
            <p>피드백 & 아이디어</p>
            <p>^</p>
          </li>
          <li className="flex justify-between text-lg font-medium text-gray-500">
            <p>이런 정책 필요해요</p>
            <p>^</p>
          </li>
        </ul>

        <div className="mt-12 mb-6 space-y-0.5">
          <div className="text-xl font-semibold text-gray-800">계정</div>
        </div>
        <ul className="space-y-8 h-full w-full">
          <li className="flex justify-between text-lg font-medium text-gray-500">
            <p>로그아웃</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Account;
