import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDDy5YxVeQxS0Or2wnr5EoNxpbXdqmTWcs",
  authDomain: "baseleal-9fb49.firebaseapp.com",
  projectId: "baseleal-9fb49",
  storageBucket: "baseleal-9fb49.appspot.com",
  messagingSenderId: "278126871771",
  appId: "1:278126871771:web:ec0586009d89ccbd6678fe"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCE2FOqPbMD0qnyTXfbSPCxoi-FOIc5yoI",
//   authDomain: "hotel-next-app-aa435.firebaseapp.com",
//   projectId: "hotel-next-app-aa435",
//   storageBucket: "hotel-next-app-aa435.firebasestorage.app",
//   messagingSenderId: "543448084924",
//   appId: "1:543448084924:web:1d092a5a0f548fa8f4bbb9",
//   measurementId: "G-5GYE8LBJ64"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);