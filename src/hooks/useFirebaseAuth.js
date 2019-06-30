
import { useEffect, useState } from "react";
import firebase from "../config/fb";

const auth = firebase.auth;
const googleProvider = new auth.GoogleAuthProvider();
const facebookProvider = new auth.FacebookAuthProvider();

export default function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [waiting, setWaiting] = useState(true);
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
      if (!!authUser) {
        if ((user||{}).uid !== authUser.uid) {
          setUser(authUser);
          setWaiting(false);
          if (!!errorMessage.credential && authUser.email === errorMessage.email) {
            cleanError();
            setWaiting(false);
            authUser.linkWithCredential(errorMessage.credential).catch(console.log);
          } 
        }
      } else {
        setUser(null);
        setWaiting(false);
      }
    });// eslint-disable-next-line
  }, []);

  useEffect(function whenRedirected() {
    setWaiting(true);
    auth().getRedirectResult().then(result => {
      if (result.operationType === "signIn" && (user||{}).uid !== result.user.uid) {
        setUser(result.user);
        setWaiting(false);
        cleanError();
      }
      if (result.credential) {
        //console.log("From redirect: TOKEN - ", result.credential.accessToken);
      }
    }).catch(e=> {
      errorHandler(e);
      setWaiting(false);
    });// eslint-disable-next-line 
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
      setWaiting(true);
      await auth().createUserWithEmailAndPassword(email, password);
      console.log("createUserWithEmailAndPassword Triggered");
      cleanError();
    } catch(e) {
      errorHandler(e);
    }
    setWaiting(false);
  }

  async function signIn(email="", password="") {
    try {
      setWaiting(true);
      await auth().signInWithEmailAndPassword(email, password);
      console.log("signInWithEmailAndPassword Triggered");
      cleanError();
    } catch(e) {
      errorHandler(e);
    }
    setWaiting(false);
  }

  async function signOut() {
    try {
      setWaiting(true);
      await auth().signOut();
      console.log("signOut Triggered");
      cleanError();
    } catch(e) {
      errorHandler(e);
    }
    setWaiting(false);
  }

  async function signInRedirect({abort, google, facebook}) {
    if (abort) return;
    const provider = (
      (!!google && googleProvider)||
      (!!facebook && facebookProvider)
    );
    try {
      setWaiting(true);
      await auth().signInWithRedirect(provider);
      console.log("signInWithRedirect Triggered");
    } catch(e) {
      errorHandler(e);
      setWaiting(false);
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
