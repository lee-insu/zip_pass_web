import React from "react";
import axios from "axios";

interface KakaoLoginProps {
  appId: string;
}

const KakaoLogin: React.FC<KakaoLoginProps> = ({appId}) => {
  const kakaoLoginHandler = async () => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${appId}&redirect_uri=${encodeURIComponent(
        window.location.origin + "/api/auth/kakao"
      )}&response_type=code`;

      window.location.href = kakaoAuthUrl;

      const codeResponse = await axios.post("/api/auth/kakao", {
        code: encodeURIComponent(window.location.search.split("code=")[1]),
      });

      // 카카오 유저 정보와 Firebase 토큰을 받아옵니다.
      const {firebaseToken, kakaoUser} = codeResponse.data;
      console.log(firebaseToken);
    } catch (error: any) {
      console.error("Kakao Auth Error:", error.response?.data || error);
    }
  };

  return (
    <button onClick={kakaoLoginHandler} type="button">
      카카오로 로그인
    </button>
  );
};

export default KakaoLogin;
