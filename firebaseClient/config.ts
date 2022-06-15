import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCm82rUbH8FrLy47DN2_tvz9gFnlHfX_eY",
  authDomain: "toolbox-5f17e.firebaseapp.com",
  projectId: "toolbox-5f17e",
  storageBucket: "toolbox-5f17e.appspot.com",
  messagingSenderId: "48213045540",
  appId: "1:48213045540:web:8d71b7eb47c3d0211c83b1",
  measurementId: "G-6FZLXYLWEX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
