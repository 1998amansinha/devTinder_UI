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
  apiKey: "AIzaSyC8ysZZYPQyad2jCW7FYMUxM1GnyPXxO-A",
  authDomain: "devtinder-b2832.firebaseapp.com",
  projectId: "devtinder-b2832",
  storageBucket: "devtinder-b2832.firebasestorage.app",
  messagingSenderId: "317079511997",
  appId: "1:317079511997:web:3bdc8efbbaada25ebd28d4",
  measurementId: "G-5CJTESHSJ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);

export default app;
