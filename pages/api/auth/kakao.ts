import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

const KakaoAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({message: "Method not allowed"});
    return;
  }

  const {code} = req.query;
  const appId = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  if (!code || !appId || !redirectUri) {
    res.status(400).json({message: "Bad request"});
    return;
  }

  try {
    const tokenRes = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: appId,
          redirect_uri: redirectUri,
          code: code as string,
        },
      }
    );

    const {access_token} = tokenRes.data;

    const profileRes = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const profile = profileRes.data;

    // 프로필 정보를 처리하고 사용자를 인증합니다.
    // 예를 들어, 데이터베이스에 사용자 정보를 저장하거나 세션에 사용자 정보를 저장할 수 있습니다.

    res.status(200).json({message: "Success", data: profile});
  } catch (error) {
    console.error("Kakao Auth Error:", error);
    res.status(500).json({message: "Internal server error"});
  }
};

export default KakaoAuth;
