
import { useEffect, useState } from "react";
import firebase from "../config/fb";

const auth = firebase.auth;
const googleProvider = new auth.GoogleAuthProvider();
const facebookProvider = new auth.FacebookAuthProvider();

export default function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [waiting, seWaiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ 
    code: null, 
    message: null, 
    credential: null,
    email: null 
  });
  
  useEffect(function logErrorMessage() {
    if (!errorMessage.code) return;
    console.log(errorMessage);
  }, [errorMessage]);

  useEffect(function observeUserUpdate() {
    auth().onAuthStateChanged(authUser => {
      seWaiting(false);
      if (!!authUser) {
        if ((user||{}).uid !== authUser.uid) {
          setUser(authUser);
          if (!!errorMessage.credential && authUser.email === errorMessage.email) {
            cleanError();
            authUser.linkWithCredential(errorMessage.credential).catch(console.log);
          } 
        }
      } else {
        setUser(null);
      }
    });// eslint-disable-next-line
  }, []);

  useEffect(function whenRedirected() {
    seWaiting(true);
    auth().getRedirectResult().then(result => {
      if (result.operationType === "signIn" && (user||{}).uid !== result.user.uid) {
        setUser(result.user);
        cleanError();
      }
      if (result.credential) {
        console.log("From redirect: TOKEN - ", result.credential.accessToken);
      }
    }).catch(errorHandler).finally(() => seWaiting(false));
    // eslint-disable-next-line 
  }, []);

  useEffect(function credentialErrorCheck() {
    if (!!errorMessage.credential && !!errorMessage.email) {
      auth().fetchSignInMethodsForEmail(errorMessage.email).then(methods => {
        if (methods[0] === 'password') {
          console.log("Prompt for PAssword", methods);// TODO: implement promptUserForPassword.
        }
        console.log("WHAT???", methods);
      }).catch(console.log);
    }
  }, [errorMessage]);

  return [
    { user, errorMessage, waiting },
    { create, signIn, signInRedirect, signOut }
  ];
  
  async function create(email="", password="") {
    try {
      seWaiting(true);
      await auth().createUserWithEmailAndPassword(email, password);
      console.log("createUserWithEmailAndPassword Triggered");
      cleanError();
    } catch(e) {
      errorHandler(e);
    }
    seWaiting(false);
  }

  async function signIn(email="", password="") {
    try {
      seWaiting(true);
      await auth().signInWithEmailAndPassword(email, password);
      console.log("signInWithEmailAndPassword Triggered");
      cleanError();
    } catch(e) {
      errorHandler(e);
    }
    seWaiting(false);
  }

  async function signOut() {
    try {
      seWaiting(true);
      await auth().signOut();
      console.log("signOut Triggered");
      cleanError();
    } catch(e) {
      errorHandler(e);
    }
    seWaiting(false);
  }

  async function signInRedirect({abort, google, facebook}) {
    if (abort) return;
    const provider = (
      (!!google && googleProvider)||
      (!!facebook && facebookProvider)
    );
    try {
      seWaiting(true);
      await auth().signInWithRedirect(provider);
      console.log("signInWithRedirect Triggered");
    } catch(e) {
      errorHandler(e);
      seWaiting(false);
    }
  }
  
  function errorHandler(error) {
    console.log(error.code);
    setErrorMessage({ 
      code: error.code, 
      message: error.message,
      credential: (error.code === 'auth/account-exists-with-different-credential' &&
        error.credential) || errorMessage.credential,
      email: (error.code === 'auth/account-exists-with-different-credential' &&
        error.mail) || errorMessage.email 
    });
  }

  function cleanError() {
    setErrorMessage({ 
      code: null, 
      message: null, 
      credential: null,
      email: null 
    });
  }
}
