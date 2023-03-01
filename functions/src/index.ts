import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import axios from "axios";
import {config} from "dotenv";

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

app.post("/callback/kakao", async (req, res) => {
  const {code} = req.body;

  if (!code) {
    return res.status(400).json({
      code: 400,
      message: "code is required pm",
    });
  }

  const response = await getToken(code);
  return res.status(200).json(response);
});
exports.auth = functions.https.onRequest(app);
