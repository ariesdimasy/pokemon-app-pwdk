// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtPclHp5hMuraecF2wVKVKIlJlAxgWcTc",
  authDomain: "smartways-77495.firebaseapp.com",
  databaseURL: "https://smartways-77495.firebaseio.com",
  projectId: "smartways-77495",
  storageBucket: "smartways-77495.appspot.com",
  messagingSenderId: "1013397244640",
  appId: "1:1013397244640:web:df814ecbed2653a96ade85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
