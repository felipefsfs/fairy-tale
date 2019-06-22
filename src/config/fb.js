import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";


const options = {
    apiKey: "AIzaSyCNDCzfNXZdtQUOvr8aQTdNvR9Xeshu6ok",
    authDomain: "server-rep.firebaseapp.com",
    databaseURL: "https://server-rep.firebaseio.com",
    projectId: "server-rep",
    storageBucket: "server-rep.appspot.com",
    messagingSenderId: "691098630867",
    appId: "1:691098630867:web:7d98c5577aaee98a"
};

firebase.initializeApp(options);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;