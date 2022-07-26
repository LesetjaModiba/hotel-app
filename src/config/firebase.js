// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSEGJteyV47dSOQmfs451M6Oiqmd6aHpY",
  authDomain: "hotel-app-3f6ab.firebaseapp.com",
  projectId: "hotel-app-3f6ab",
  storageBucket: "hotel-app-3f6ab.appspot.com",
  messagingSenderId: "1059865068765",
  appId: "1:1059865068765:web:16d8b06403412175048734",
  measurementId: "G-CRVTQ9CFHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);
export {db,auth}