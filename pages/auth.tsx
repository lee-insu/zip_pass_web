import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {
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

const Auth = () => {
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

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      try {
        await addUserToFirestore(userCredential);
      } catch (error) {
        console.error("Error adding user to Firestore: ", error);
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
    } catch (error) {
      console.error("Error signing in with Google: ", error);
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
      <div
        className="flex-1 flex items-center justify-center"
        style={{marginTop: "calc(10% - 10rem)"}}
      >
        <div className="text-2xl font-bold text-center">집패스로</div>
        <div className="text-2xl font-light text-center">
          &nbsp;저렴하게 집 찾아요
        </div>
      </div>
      <div
        className="flex-1 flex items-center justify-center"
        style={{marginTop: "calc(10% - 15rem)"}}
      >
        <div className="w-full max-w-md p-4">
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center w-full px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          >
            <Image
              src="/images/google_logo.svg"
              alt="Google Icon"
              width={20}
              height={20}
            />
            <span className="ml-4">구글 계정으로 로그인/가입</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
