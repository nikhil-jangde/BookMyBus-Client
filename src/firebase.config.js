// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCRg98nTt6VGyv5CJExGaKMscDcxR9dF28",
  authDomain: "otp-verification-a1e35.firebaseapp.com",
  projectId: "otp-verification-a1e35",
  storageBucket: "otp-verification-a1e35.appspot.com",
  messagingSenderId: "85748752251",
  appId: "1:85748752251:web:d5d477a6a80b1a8a05e7de",
  measurementId: "G-ZLVJSKQHHV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
export { firebaseApp, auth };