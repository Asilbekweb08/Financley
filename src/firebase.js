// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9J8WQJg1hcZG8fT5nVYfwJayTS-V63sQ",
  authDomain: "signup-62fff.firebaseapp.com",
  projectId: "signup-62fff",
  storageBucket: "signup-62fff.firebasestorage.app",
  messagingSenderId: "582691358175",
  appId: "1:582691358175:web:58117d0ad734924f1df06a",
  measurementId: "G-9C5CKR3PBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };