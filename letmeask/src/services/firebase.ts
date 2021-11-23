import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import * as dotenv from 'dotenv'
dotenv.config()

const firebaseConfig = {
    apiKey: "AIzaSyAJSlkE95oerZglzzVxVxpqS9gfYAICOyU",
    authDomain: "letmeask-333ca.firebaseapp.com",
    databaseURL: "https://letmeask-333ca-default-rtdb.firebaseio.com",
    projectId: "letmeask-333ca",
    storageBucket: "letmeask-333ca.appspot.com",
    messagingSenderId: "700374395086",
    appId: "1:700374395086:web:d9a9dcf16de4e6c119089f"
  };
  
   firebase.initializeApp(firebaseConfig);
  
  console.log(firebaseConfig)
   const auth = firebase.auth();
   const database = firebase.database();

   export { firebase, auth, database}