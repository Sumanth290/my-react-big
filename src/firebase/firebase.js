import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyCKcTmIneqxHepiZ1vYUpxpHk2hnbSUfeE",
    authDomain: "sumanth-expensify.firebaseapp.com",
    databaseURL: "https://sumanth-expensify.firebaseio.com",
    projectId: "sumanth-expensify",
    storageBucket: "sumanth-expensify.appspot.com",
    messagingSenderId: "877184972407"
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  export {firebase,database as default};