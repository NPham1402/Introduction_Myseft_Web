const firebaseConfig = {
  apiKey: "AIzaSyBBqMaTZ7WC0TcHabKw-dxWWsoYVN1oM9M",
  authDomain: "introduction-website-5684a.firebaseapp.com",
  databaseURL:
    "https://introduction-website-5684a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "introduction-website-5684a",
  storageBucket: "introduction-website-5684a.appspot.com",
  messagingSenderId: "333115909795",
  appId: "1:333115909795:web:697c5c03f30c918a118116",
  measurementId: "G-DG5FFH94LV",
};
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID,
// };
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
export { database };
