import React from "react";
import DetailNav from "@/Components/Nav/DetailNav";

const Detail = () => {
  const percent = 80;
  return (
    <>
      <DetailNav />
      <div className="w-[88%] m-auto">
        <div className="my-9 space-y-0.5">
          <div className="text-xl font-bold">신청 기간</div>
          <div className="text-xl text-gray-600 font-medium">
            03월 5일 00시 ~ 03월 12일 00시
          </div>
        </div>
        <div className="mb-9">
          <div className="text-xl font-bold mb-2">당첨 확률</div>
          <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="absolute rounded-full inset-0 bg-green-500"
              style={{width: `${percent}%`}}
            ></div>
            <div className="absolute inset-0 text-gray-600 text-center flex items-center justify-center">
              {percent}%
            </div>
          </div>
        </div>
      </div>
      <p className=" w-full h-[16px] bg-[#F2F4F6]"></p>
      <div className="w-[88%] m-auto">
        <ul className="w-full h-full ">
          <li className="border-b border-gray-200 w-full h-20 flex items-center space-x-4">
            <p className="">주소</p>
            <p>서울시 마포구 동교로 64-5</p>
          </li>
          <li className="border-b border-gray-200 w-full h-20 flex items-center space-x-4">
            <p>보증금</p>
            <p>1억 2천</p>
          </li>
          <li className="border-b border-gray-200 w-full h-20 flex items-center space-x-4">
            <p>월세</p>
            <p>15만원</p>
          </li>
          <li className="border-b border-gray-200 w-full h-20 flex items-center space-x-4">
            <p>평수</p>
            <p>15평</p>
          </li>
        </ul>
      </div>
      <p className=" w-full h-[16px] bg-[#F2F4F6]"></p>
      <div className="w-[88%] m-auto">
        <div className="my-9 space-y-0.5"></div>
        <div className="font-semibold text-xl">공고 일정</div>
      </div>
    </>
  );
};

export default Detail;
