import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-92361.firebaseapp.com",
  projectId: "mern-estate-92361",
  storageBucket: "mern-estate-92361.appspot.com",
  messagingSenderId: "346048424611",
  appId: "1:346048424611:web:078d5cf7e6ff1ac6cd6d16",
}

export const app = initializeApp(firebaseConfig)
