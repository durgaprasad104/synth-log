// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiIi2N8n8cXtTP-306hwP5XShc06oAWlI",
  authDomain: "durgaprasad-75c47.firebaseapp.com",
  databaseURL: "https://durgaprasad-75c47-default-rtdb.firebaseio.com",
  projectId: "durgaprasad-75c47",
  storageBucket: "durgaprasad-75c47.appspot.com",
  messagingSenderId: "1098447558580",
  appId: "1:1098447558580:web:814db0358c9b0f265ac4e1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
