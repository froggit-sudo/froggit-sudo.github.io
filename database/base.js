// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCYYNh4lJtTS83xhbrTcsKFazXLlmPfOc8",
    authDomain: "dynamic-links-3b384.firebaseapp.com",
    databaseURL: "https://dynamic-links-3b384-default-rtdb.firebaseio.com",
    projectId: "dynamic-links-3b384",
    storageBucket: "dynamic-links-3b384.appspot.com",
    messagingSenderId: "585762420059",
    appId: "1:585762420059:web:3f5a8d1cd84962ee7e567e",
    measurementId: "G-1Y0P04VJ95"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const database = firebase.database();
const people = database.ref("people");