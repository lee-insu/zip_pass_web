import {KakaoUser} from "./@types/User";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import axios from "axios";
import {config} from "dotenv";
import {UserRecord} from "firebase-admin/lib/auth/user-record";

config();

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

app.post("/callback/kakao", async (req, res) => {
  const {token} = req.body;
  const kakaoUser = await getKakaoUser(token);
  const authUser = await updateOrCreateUser(kakaoUser);
  const firebaseToken = await admin
    .auth()
    .createCustomToken(authUser.uid, {provider: "KAKAO"});

  res.status(200).json({firebaseToken});
});

exports.auth = functions
  .runWith({secrets: ["SERVICE_ACCOUNT_KEY"]})
  .https.onRequest(app);
