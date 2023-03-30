import {KakaoUser} from "./@types/User";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import axios from "axios";
import {config} from "dotenv";
import {UserRecord} from "firebase-admin/lib/auth/user-record";

config();

admin.initializeApp();

interface TokenResponse {
  token_type: string;
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope?: string;
}

const app = express();
app.use(cors({origin: true}));

const getToken = async (code: string): Promise<TokenResponse> => {
  const body = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_REST_API_KEY || "",
    redirect_uri: process.env.KAKAO_REDIRECT_URI || "",
    code,
  };
  const res = await axios.post(
    "https://kauth.kakao.com/oauth/token",
    new URLSearchParams(body)
  );

  return res.data;
};

const updateOrCreateUser = async (user: KakaoUser): Promise<UserRecord> => {
  const auth = admin.auth();

  const kakaoAccount = user.kakao_account;
  const properties = {
    uid: `kakao:${user.id}`,
    provider: "KAKAO",
    displayName: kakaoAccount?.profile?.nickname,
    email: kakaoAccount?.email,
  };

  try {
    return await auth.updateUser(properties.uid, properties);
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      return await auth.createUser(properties);
    }
    throw error;
  }
};

const getKakaoUser = async (token: string): Promise<KakaoUser> => {
  const res = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {Authorization: `Bearer ${token}`},
  });
  return res.data;
};

const saveProfileToDatabase = async (profile: KakaoUser) => {
  const db = admin.firestore();
  const userRef = db.collection("users").doc(`kakao:${profile.id}`);

  const userData = {
    uid: `kakao:${profile.id}`,
    provider: "KAKAO",
    displayName: profile.kakao_account?.profile?.nickname,
    email: profile.kakao_account?.email,
  };

  await userRef.set(userData);
};

app.post("/api/auth/kakao", async (req, res) => {
  const {code} = req.body;
  if (!code) {
    res.status(400).json({message: "Code is missing"});
    return;
  }

  try {
    const tokenResponse = await getToken(code);
    const kakaoUser = await getKakaoUser(tokenResponse.access_token);
    const authUser = await updateOrCreateUser(kakaoUser);
    const firebaseToken = await admin
      .auth()
      .createCustomToken(authUser.uid, {provider: "KAKAO"});

    // 사용자 정보를 데이터베이스에 저장합니다.
    await saveProfileToDatabase(kakaoUser);

    // 클라이언트에 Firebase 토큰과 함께 카카오 유저 정보를 전달합니다.
    res.status(200).json({firebaseToken, kakaoUser});
  } catch (error) {
    console.error("Error in Kakao authentication:", error);
    res.status(500).json({message: "Internal server error"});
  }
});

// ...

exports.auth = functions
  .runWith({secrets: ["SERVICE_ACCOUNT_KEY"]})
  .https.onRequest(app);
