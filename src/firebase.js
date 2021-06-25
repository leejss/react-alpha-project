import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDHYTb-9IbWnlLeM8odlrVD-otpYZISoag",
  authDomain: "react-slack-156cc.firebaseapp.com",
  projectId: "react-slack-156cc",
  storageBucket: "react-slack-156cc.appspot.com",
  messagingSenderId: "65585034654",
  appId: "1:65585034654:web:39597998d930e6b00f128f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
