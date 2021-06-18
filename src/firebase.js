import firebase from 'firebase/app';
import { config } from './firebaseconfig.js';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// Add your Firebase credentials
firebase.initializeApp(config);

export default firebase;
