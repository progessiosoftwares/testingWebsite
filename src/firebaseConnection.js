import { initializeApp } from 'firebase/app'
import {getFirestore } from 'firebase/firestore'

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

  const db = getFirestore(firebaseApp);
  export { db };