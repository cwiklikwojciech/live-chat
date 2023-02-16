import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANC9LUcGunQb8zSNGMXW-14CRY691mnb0",
    authDomain: "live-chat-b865b.firebaseapp.com",
    projectId: "live-chat-b865b",
    storageBucket: "live-chat-b865b.appspot.com",
    messagingSenderId: "1069727679831",
    appId: "1:1069727679831:web:8cc4116987b3b01fd2aa12",
    measurementId: "G-69HXGHPQHH"
  };

  //init firebase

  firebase.initializeApp(firebaseConfig)

  const projectAuth = firebase.auth();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectAuth, projectFirestore, timestamp }