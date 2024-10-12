import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtznpkOaG0hZfGhEaoY324teaC49MKVFY",
  authDomain: "funkoshop-page.firebaseapp.com",
  projectId: "funkoshop-page",
  storageBucket: "funkoshop-page.appspot.com",
  messagingSenderId: "172422564629",
  appId: "1:172422564629:web:b73ecf306fbcd5d1edb71c",
  measurementId: "G-0X3XSNKED8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics }