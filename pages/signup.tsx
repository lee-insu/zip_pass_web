import React, {useState} from "react";
import {useRouter} from "next/router";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  updateProfile as updateUserProfile,
} from "firebase/auth";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import {auth} from "@/service/firebase";
import {useDispatch} from "react-redux";
import {login} from "@/store/userSlice";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const addUserToFirestore = async (userCredential: UserCredential) => {
    const db = getFirestore();
    const userRef = doc(db, "users", userCredential.user.uid);

    await setDoc(userRef, {
      uid: userCredential.user.uid,
      displayName: userCredential.user.displayName,
      email: userCredential.user.email,
      photoURL: userCredential.user.photoURL,
    });
  };

  const handleSignup = async () => {
    try {
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
    } catch (error) {
      console.error("Error signing up with email: ", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <div className="w-full max-w-md p-4">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="닉네임"
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

      <div className="w-full max-w-md p-4">
        <Link href="/auth">
          <div className="text-blue-500">로그인 페이지로 돌아가기</div>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
