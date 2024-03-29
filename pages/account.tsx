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
import {useRouter} from "next/router";
import {cpSync} from "fs";
import {useAuth} from "@/hooks/useAuth";

const Account = () => {
  const {user, loading} = useAuth();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const router = useRouter();

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {}
  };

  const loginStatus = () => {
    if (isLoggedIn) {
      router.push("/personal");
    } else {
      router.push("/auth");
    }
  };

  if (loading) {
    return (
      <div className="w-full text-center font-bold">정보 불러오는 중...</div>
    );
  }

  return (
    <>
      <AccountNav />
      <div className="w-[88%] m-auto">
        <div className="my-9 space-y-0.5">
          <div className="text-xl font-semibold text-gray-700">
            여러분을 위한 공고 알림{" "}
          </div>
        </div>
        <ul className="space-y-8 h-full w-full">
          <li>
            <Link
              className="flex justify-between text-lg font-medium text-gray-500"
              href={"/push"}
            >
              <p>공고 알림 설정</p>
              <Image
                src="/images/enter.svg"
                alt="들어가기"
                width={24}
                height={24}
              />
            </Link>
          </li>
          <li
            onClick={loginStatus}
            className="flex justify-between text-lg font-medium text-gray-500"
          >
            <p>내 상황에 맞는 집 찾기</p>
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
          <li>
            <Link
              className="flex justify-between text-lg font-medium text-gray-500"
              href={"http://pf.kakao.com/_yxdidxj"}
            >
              <p>피드백 & 아이디어 (카톡 플친)</p>

              <Image
                src="/images/enter.svg"
                alt="들어가기"
                width={24}
                height={24}
              />
            </Link>
          </li>
          {/* <li className="flex justify-between text-lg font-medium text-gray-500">
            <p>이런 정책 필요해요</p>
            <Image
              src="/images/enter.svg"
              alt="들어가기"
              width={24}
              height={24}
            />
          </li> */}
          {/* <li className="flex justify-between text-lg font-medium text-gray-500">
            <p>도와주신 분들</p>
            <Image
              src="/images/enter.svg"
              alt="들어가기"
              width={24}
              height={24}
            />
          </li> */}
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
