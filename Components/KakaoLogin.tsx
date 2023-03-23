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
        window.location.origin + "/api/auth/kakao" // 공백을 제거합니다.
      )}&response_type=code`;

      window.location.href = kakaoAuthUrl;
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
