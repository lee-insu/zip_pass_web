import React, {useState} from "react";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

import {
  createUserWithEmailAndPassword,
  UserCredential,
  updateProfile as updateUserProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";
import {auth} from "@/service/firebase";
import {useDispatch} from "react-redux";
import {login} from "@/store/userSlice";
import {ToastContainer} from "react-toastify";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const marketingAgreed = router.query.marketingAgreed === "true";

  const findUserByEmail = async (email: string) => {
    const db = getFirestore();
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const userSnapshot = await getDocs(userQuery);
    return userSnapshot.docs.length > 0;
  };

  const addUserToFirestore = async (userCredential: UserCredential) => {
    const db = getFirestore();
    const userRef = doc(db, "users", userCredential.user.uid);

    await setDoc(userRef, {
      uid: userCredential.user.uid,
      displayName: userCredential.user.displayName,
      email: userCredential.user.email,
      photoURL: userCredential.user.photoURL,
      marketing: marketingAgreed,
    });
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      if (await findUserByEmail(email)) {
        toast.error("이미 사용 중인 이메일이에요.");
        setEmail("");
        setLoading(false);
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateUserProfile(userCredential.user, {displayName});
      await addUserToFirestore(userCredential);
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
          case "auth/invalid-email":
            toast.error("이메일 형식이 틀렸어요");
            setEmail("");
            break;
          case "auth/weak-password":
            toast.error("비밀번호가 너무 짧아요");
            setPassword("");
            break;
          default:
            toast.error("회원가입에 실패했어요.");
        }
      } else {
        toast.error("회원가입에 실패했어요.");
      }

      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col justify-between mx-4">
      <ToastContainer />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 flex items-center justify-center">
          <div className="border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}
      <div className="w-full text-center text-2xl font-bold"> 회원가입</div>
      <div className="max-w-md mx-auto mt-10 p-4">
        <input
          type="email"
          placeholder="이메일을 적어주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="영문, 숫자로 8자 이상 적어주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="닉네임을 적어주세요"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSignup}
          className="w-full mb-4 p-2 bg-blue-500 text-white rounded-md"
        >
          회원가입
        </button>
      </div>

      <div className="max-w-md mx-auto mb-10 p-4">
        <Link href="/auth">
          <div className="text-blue-500">로그인 페이지로 돌아가기</div>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
