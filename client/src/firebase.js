import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHM9DcOD4c8zkbPXqrFUqtnn7ZGc_FZEI",
  authDomain: "sibm-alumni-portal.firebaseapp.com",
  projectId: "sibm-alumni-portal",
  storageBucket: "sibm-alumni-portal.firebasestorage.app",
  messagingSenderId: "887268183328",
  appId: "1:887268183328:web:90ebb9bd0e94e502ee9b45"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);