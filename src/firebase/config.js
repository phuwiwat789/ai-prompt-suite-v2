// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC82oWa8SfrYdidYrpNNAQ_bRdCHr3cYhE",
  authDomain: "ai-prompt-system.firebaseapp.com",
  projectId: "ai-prompt-system",
  storageBucket: "ai-prompt-system.firebasestorage.app",
  messagingSenderId: "429900246569",
  appId: "1:429900246569:web:4b94b2f1eb5e3594dff638",
  measurementId: "G-CCFMJPPVY4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;