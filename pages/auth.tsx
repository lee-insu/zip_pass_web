import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
import {auth} from "@/service/firebase";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useDispatch} from "react-redux";
import {login, logout} from "@/store/userSlice";
import Image from "next/image";
import Link from "next/link";
import {toast} from "react-toastify";
import {ToastContainer} from "react-toastify";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const addUserToFirestore = async (userCredential: UserCredential) => {
    const db = getFirestore();
    const userRef = doc(db, "users", userCredential.user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
      });
    }
  };

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      try {
        await addUserToFirestore(userCredential);
      } catch (error: unknown) {
        if (error instanceof Error) {
          switch ((error as any).code) {
            case "auth/network-request-failed":
              toast.error("인터넷이 끊겼어요");
              break;
            default:
              toast.error("로그인에 실패했어요.");
          }
        } else {
          toast.error("로그인에 실패했어요.");
        }
      }
      dispatch(
        login({
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName || "",
          email: userCredential.user.email || "",
          photoURL: userCredential.user.photoURL || "",
        })
      );
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        switch ((error as any).code) {
          case "auth/user-not-found":
            toast.error("가입된 이메일이 아니거나 틀렸어요");
            break;
          case "auth/wrong-password":
            toast.error("비밀번호가 틀렸어요");
            break;
          default:
            toast.error("로그인에 실패했어요.");
        }
      } else {
        toast.error("로그인에 실패했어요.");
      }
    }
  };

  useEffect(() => {
    return () => {
      if (isLoggedIn) {
        router.push("/");
      } else null;
    };
  }, [isLoggedIn, router]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <ToastContainer />
      <div className="flex justify-center my-3">
        <Image src="/images/logo.svg" alt="로고" width={180} height={60} />
      </div>
      <div className="flex justify-center">
        <div className="text-2xl font-bold text-center">집패스로</div>
        <div className="text-2xl font-light text-center">
          &nbsp;저렴하게 집 찾아요
        </div>
      </div>
      <div className="flex-1 flex items-start justify-center mt-12">
        <div className="w-full max-w-md p-4">
          <input
            id="email"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
          />
          <input
            id="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleEmailLogin}
            className={`w-full mb-4 p-2 text-white rounded-md ${
              email && password ? "bg-blue-500" : "bg-blue-300"
            }`}
            disabled={!email || !password}
          >
            이메일로 로그인
          </button>
          <div className="w-full text-center">
            <Link href="/term">
              <div className="text-blue-500">회원가입하기</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
