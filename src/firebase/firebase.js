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

  database.ref().set({
      name : "Sumanth Damarla",
      age : 28,
      isSingle : true,
      location : {
          city : "Vijayawada",
          state : "Andhra Pradesh",
          country : "India"
      }
  });

  database.ref("age").set(29);
  database.ref("location/city").set("Hyderabad");

  database.ref("attributes").set({
    height : 70,
    weight : 92
  });