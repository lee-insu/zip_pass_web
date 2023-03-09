import React from "react";
import DetailNav from "@/Components/DetailNav";

const Detail = () => {
  return (
    <>
      <DetailNav />
      <div className="w-[88%] m-auto">
        <div className="my-9 space-y-0.5">
          <div className="text-xl font-bold">기간을 확인해요 &nbsp;😁</div>
          <div className="text-xl font-medium">03/05 ~ 03/55</div>
        </div>
        <div className="mb-9">
          <div>당첨 확률</div>
          <div>progress bar</div>
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
        <div className="my-9 space-y-0.5">상세 페이지</div>
      </div>
    </>
  );
};

export default Detail;
