import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyCUDE-fk13_oKJ-BKHYXH42xZMltFQwJEo",
  authDomain: "graduation-bcd1c.firebaseapp.com",
  databaseURL: "https://graduation-bcd1c-default-rtdb.firebaseio.com",
  projectId: "graduation-bcd1c",
  storageBucket: "graduation-bcd1c.appspot.com",
  messagingSenderId: "550861788472",
  appId: "1:550861788472:web:033b689670c50b333a5dcd",
  measurementId: "G-YZWVM7PQXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);