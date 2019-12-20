import firebase from "../stores/firebase.js";

const auth = firebase.auth;
const googleProvider = new auth.GoogleAuthProvider();

export async function signIn(email="", password="") {
    try {
     console.log(email, password, "signin");
      await auth().signInWithEmailAndPassword(email, password);
      console.log("signInWithEmailAndPassword Triggered");
    } catch(e) {
      errorHandler(e);
    }
    console.log(email, password, "signin END!");
  }

export  async function signOut() {
    try {
    console.log("sign out");
      await auth().signOut();
      console.log("signOut Triggered");
    } catch(e) {
      errorHandler(e);
    }
    console.log( "sig out END!");;
  }


  auth().onAuthStateChanged(authUser => {
    if (!!authUser) {
        console.log(authUser);
    } else {
      console.log("no user");
    }
  });
function errorHandler(error) {
    const errorMessage = {};
    console.log("ERROR", error.code);
    console.log({ 
      code: error.code, 
      message: error.message,
      credential: (error.code === 'auth/account-exists-with-different-credential' &&
        error.credential) || errorMessage.credential,
      email: (error.code === 'auth/account-exists-with-different-credential' &&
        error.mail) || errorMessage.email 
    });
  }
