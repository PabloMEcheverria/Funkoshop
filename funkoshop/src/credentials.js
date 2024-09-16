// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtznpkOaG0hZfGhEaoY324teaC49MKVFY",
  authDomain: "funkoshop-page.firebaseapp.com",
  projectId: "funkoshop-page",
  storageBucket: "funkoshop-page.appspot.com",
  messagingSenderId: "172422564629",
  appId: "1:172422564629:web:b73ecf306fbcd5d1edb71c",
  measurementId: "G-0X3XSNKED8"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export default appFirebase;