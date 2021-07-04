import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAak9zeRvHmJCtwfvBJYGRYjqHo90MKzXo",
  authDomain: "shoesecommerce.firebaseapp.com",
  projectId: "shoesecommerce",
  storageBucket: "shoesecommerce.appspot.com",
  messagingSenderId: "188454438580",
  appId: "1:188454438580:web:aa66c9fa8037364a36f9e1",
  measurementId: "G-SSV003BJMY",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const firestore = firebase.firestore();
