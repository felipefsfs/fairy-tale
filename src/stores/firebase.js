export let fb = {};
export function init() {
    console.log(firebase);
    firebase.initializeApp(options);
    fb = firebase;
}

const options = {
    apiKey: "AIzaSyCNDCzfNXZdtQUOvr8aQTdNvR9Xeshu6ok",
    authDomain: "server-rep.firebaseapp.com",
    databaseURL: "https://server-rep.firebaseio.com",
    projectId: "server-rep",
    storageBucket: "server-rep.appspot.com",
    messagingSenderId: "691098630867",
    appId: "1:691098630867:web:7d98c5577aaee98a"
};