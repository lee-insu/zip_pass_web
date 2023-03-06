import Link from "next/link";
import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {auth} from "../../service/firebase";
import {signInWithCustomToken} from "firebase/auth";

interface Auth {
  firebaseToken: string;
}

const Kakao = () => {
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code") || "";
    setCode(code);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res: AxiosResponse<Auth> = await axios.post(
          "https://us-central1-zippass-ae782.cloudfunctions.net/auth",
          {
            code,
          }
        );
        const {firebaseToken} = res.data;
        // custom token을 이용한 로그인
        console.log(firebaseToken);
        await signInWithCustomToken(auth, firebaseToken);
      } catch (error) {
        console.log(`err${error}`);
      }
    })();
  }, []);

  if (!code) {
    return <Link href={"/login"} />;
  }

  return <div>callback page</div>;
};

export default Kakao;
