import { initializeApp } from 'firebase/app'
import {getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAiGmH6pKr-pEYjKT27kKnaBZHskaWYVjw",
    authDomain: "projetonht.firebaseapp.com",
    projectId: "projetonht",
    storageBucket: "projetonht.appspot.com",
    messagingSenderId: "758326705153",
    appId: "1:758326705153:web:0c95b500b2875646135400",
    measurementId: "G-TE6PTTCDJQ"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const analytics = getAnalytics(firebaseApp);
  const auth = getAuth(firebaseApp);

  const db = getFirestore(firebaseApp);
  export { db, auth };