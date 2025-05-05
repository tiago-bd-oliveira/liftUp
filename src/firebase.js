import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoNpV-IWkdNEh2oYZZYSF9a4oxs_27fx8",
  authDomain: "gymapp-project-36ae7.firebaseapp.com",
  projectId: "gymapp-project-36ae7",
  storageBucket: "gymapp-project-36ae7.appspot.com",  // Corrigi aqui: faltava ".appspot.com"
  messagingSenderId: "38765782680",
  appId: "1:38765782680:web:d11eeb601b086773f2d2ed",
  measurementId: "G-RLL72DH4MP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and db
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);