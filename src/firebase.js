import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAb4m5miPGr1uhyMW06HjebCd4TpefCHAk",
  authDomain: "myblog-866f7.firebaseapp.com",
  projectId: "myblog-866f7",
  storageBucket: "myblog-866f7.firebasestorage.app",
  messagingSenderId: "224624326010",
  appId: "1:224624326010:web:306b5a8861c2b2a18092c3",
  measurementId: "G-QPKC65CR6J"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {auth , provider , db };