  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBJUh7mKUgyaSdgThWh-wNHRZUtvKrWapA",
    authDomain: "movie-pwa-b5e5b.firebaseapp.com",
    databaseURL: "https://movie-pwa-b5e5b.firebaseio.com",
    projectId: "movie-pwa-b5e5b",
    storageBucket: "movie-pwa-b5e5b.appspot.com",
    messagingSenderId: "333975339844",
    appId: "1:333975339844:web:8713ce7c5bf5694bf4cd11",
    measurementId: "G-S3W740ZSML"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  const auth = firebase.auth();
  const db = firebase.firestore();
  const functions = firebase.functions();
  const storage = firebase.storage();
