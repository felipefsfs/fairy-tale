import { writable, derived } from 'svelte/store';

const options = {
    apiKey: "AIzaSyCNDCzfNXZdtQUOvr8aQTdNvR9Xeshu6ok",
    authDomain: "server-rep.firebaseapp.com",
    databaseURL: "https://server-rep.firebaseio.com",
    projectId: "server-rep",
    storageBucket: "server-rep.appspot.com",
    messagingSenderId: "691098630867",
    appId: "1:691098630867:web:7d98c5577aaee98a"
};
export const loaded = writable(false);
export const fb = derived(loaded, ($loaded) => {
    if ($loaded) {
        firebase.initializeApp(options);
        return firebase;
    }
    return {};
});