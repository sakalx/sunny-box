import * as firebase from 'firebase/app';

const initializeApp = firebase.initializeApp({
  apiKey: "AIzaSyD5TLcB5Q6GfEfsd3CaoQGzyU0JircNiBM",
  authDomain: "sterling-pound.firebaseapp.com",
  databaseURL: "https://sterling-pound.firebaseio.com",
  projectId: "sterling-pound",
  storageBucket: "sterling-pound.appspot.com",
  messagingSenderId: "1071905007348"
});

export default initializeApp;