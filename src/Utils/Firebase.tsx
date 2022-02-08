// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGLUgFg0p0K4cFilb4zGbPp_pH0mJ9vnY",
  authDomain: "react-form-78613.firebaseapp.com",
  projectId: "react-form-78613",
  storageBucket: "react-form-78613.appspot.com",
  messagingSenderId: "471521195191",
  appId: "1:471521195191:web:110826d209dba1cb150932",
  measurementId: "G-4LCWS9TYFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db=getFirestore(app);
export const storage = getStorage(app);