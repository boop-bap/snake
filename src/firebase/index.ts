import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc, getDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIwjhCx39nZoPtc6Cv0pIk6CmivQRQfvA",

  authDomain: "snake-one.firebaseapp.com",

  projectId: "snake-one",

  storageBucket: "snake-one.appspot.com",

  messagingSenderId: "192320646319",

  appId: "1:192320646319:web:ae197cbfc1eb25752e385a",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, setDoc, getDoc, doc };
