import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH,
  projectId: process.env.NEXT_PUBLIC_PROJECT,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER,
  appId: process.env.NEXT_PUBLIC_APP,
  measurementId: process.env.NEXT_PUBLIC_ID,
};

const app = initializeApp(firebaseConfig);
let analytics: any;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { analytics, firebaseConfig, app };
