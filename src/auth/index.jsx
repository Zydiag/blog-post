import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyBSCHNMEzHPN02MZNmgZforlQpNBY_rjgE',
  authDomain: 'blogpost-e64e4.firebaseapp.com',
  projectId: 'blogpost-e64e4',
  storageBucket: 'blogpost-e64e4.appspot.com',
  messagingSenderId: '464341394932',
  appId: '1:464341394932:web:bbdac513c9c39ed9bd45a1',
  measurementId: 'G-HRT8EJKSEM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const postRef = collection(db, 'posts');
