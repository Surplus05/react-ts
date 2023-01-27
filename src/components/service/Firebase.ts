import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "main-pf.firebaseapp.com",
  databaseURL:
    "https://main-pf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "main-pf",
  storageBucket: "main-pf.appspot.com",
  messagingSenderId: "887193058114",
  appId: "1:887193058114:web:fd626f860ca2e5125826db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
