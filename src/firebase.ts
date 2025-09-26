// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS7YhBbUJaxoikU84iD6wgHP-ogj19ER4",
  authDomain: "my-first-project-9eb51.firebaseapp.com",
  databaseURL: "https://my-first-project-9eb51-default-rtdb.firebaseio.com",
  projectId: "my-first-project-9eb51",
  storageBucket: "my-first-project-9eb51.appspot.com",
  messagingSenderId: "642948669694",
  appId: "1:642948669694:web:3a493a875f98c53a9285af",
  measurementId: "G-NJQTY8J2K7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
