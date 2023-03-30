import AccountNav from "@/Components/Nav/AccountNav";
import Image from "next/image";
import React from "react";
import {useDispatch} from "react-redux";
import {login, logout} from "@/store/userSlice";
import {auth} from "@/service/firebase";
import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import Link from "next/link";

const Account = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.log("done");
    }
  };

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
            <Image
              src="/images/enter.svg"
              alt="들어가기"
              width={24}
              height={24}
            />
          </li>
          <li className="flex justify-between text-lg font-medium text-gray-500">
            <p>청년 재테크 알림</p>
            <Image
              src="/images/enter.svg"
              alt="들어가기"
              width={24}
              height={24}
            />
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
            <Image
              src="/images/enter.svg"
              alt="들어가기"
              width={24}
              height={24}
            />
          </li>
          <li className="flex justify-between text-lg font-medium text-gray-500">
            <p>이런 정책 필요해요</p>
            <Image
              src="/images/enter.svg"
              alt="들어가기"
              width={24}
              height={24}
            />
          </li>
          <li className="flex justify-between text-lg font-medium text-gray-500">
            <p>도와주신 분들</p>
            <Image
              src="/images/enter.svg"
              alt="들어가기"
              width={24}
              height={24}
            />
          </li>
        </ul>

        <div className="mt-12 mb-6 space-y-0.5">
          <div className="text-xl font-semibold text-gray-800">계정</div>
        </div>
        <ul className="space-y-8 h-full w-full">
          {isLoggedIn ? (
            <li
              onClick={signOutUser}
              className="flex justify-between text-lg font-medium text-gray-500"
            >
              <p>로그아웃</p>
            </li>
          ) : (
            <li>
              <Link
                className="flex justify-between text-lg font-medium text-gray-500"
                href={"/auth"}
              >
                <p>로그인</p>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Account;
