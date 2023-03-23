import KakaoLogin from "@/Components/KakaoLogin";
import Link from "next/link";
import React from "react";

const Auth = () => {
  const appId = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

  if (!appId) {
    return <div>Error: KAKAO_APP_KEY is not set in environment variables.</div>;
  }

  return (
    <div>
      <h1>Next.js & TypeScript Kakao Login</h1>
      <KakaoLogin appId={appId} />
    </div>
  );
};

export default Auth;
