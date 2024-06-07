// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwd63TxWQnUBfJ3VxLfyGf6pBZdDtirW4",
  authDomain: "notes-app-2e192.firebaseapp.com",
  projectId: "notes-app-2e192",
  storageBucket: "notes-app-2e192.appspot.com",
  messagingSenderId: "496075499287",
  appId: "1:496075499287:web:eb33ec88ae070e170f3952",
  measurementId: "G-PCCT6M87T0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const notesRef = collection(db, "Notes");
