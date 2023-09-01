// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyDmOavlG8gOmdKAeyFjSiDHbGULl3jhK9o",
  // authDomain: "again-sticky-wall.firebaseapp.com",
  // projectId: "again-sticky-wall",
  // storageBucket: "again-sticky-wall.appspot.com",
  // messagingSenderId: "387525942186",
  // appId: "1:387525942186:web:c92469a6e7b305129fa9d3",
  // measurementId: "G-C4BST0CNQL"
  apiKey: "AIzaSyCD_doHWWvgktUL1Jir7cCrbyvlWagbeBA",
  authDomain: "final-sticky.firebaseapp.com",
  projectId: "final-sticky",
  storageBucket: "final-sticky.appspot.com",
  messagingSenderId: "730553497358",
  appId: "1:730553497358:web:b0fee15765e6499463c95f",
  measurementId: "G-4R1D2PK67P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { analytics, auth, firestore }