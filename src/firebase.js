import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtdl7ED1lTQUmK8R0Bz82ptEl_fB2OnVE",
  authDomain: "realtor-react-b9262.firebaseapp.com",
  projectId: "realtor-react-b9262",
  storageBucket: "realtor-react-b9262.appspot.com",
  messagingSenderId: "714933179491",
  appId: "1:714933179491:web:a70c3156d3c62860259456"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();