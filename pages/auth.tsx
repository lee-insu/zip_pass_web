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
    <div>
      <h1>Next.js & TypeScript Google Login</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default Auth;
