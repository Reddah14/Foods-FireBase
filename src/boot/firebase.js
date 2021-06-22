// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"


// Add the Firebase products that you want to use
import "firebase/auth";

import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAfGuYPQMImGi0ilu1KQbd_bPL1Z44ahiE",
  authDomain: "foods-33e67.firebaseapp.com",
  databaseURL: "https://foods-33e67-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "foods-33e67",
  storageBucket: "foods-33e67.appspot.com",
  messagingSenderId: "518305107273",
  appId: "1:518305107273:web:feea598abfb53013de1e98"
};
  
  // Initialize Firebase5
let firebaseApp = firebase.initializeApp(firebaseConfig);

  // creating vars to store the access references to firebase database & authentication API's

let firebaseDb = firebaseApp.database()
let firebaseAuth = firebaseApp.auth()

  // making available database and authentication API's

export { firebaseDb, firebaseAuth }