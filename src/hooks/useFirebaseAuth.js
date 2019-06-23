
import { useEffect, useState } from "react";
import firebase from "../config/fb";

const auth = firebase.auth;
const googleProvider = new auth.GoogleAuthProvider();
const facebookProvider = new auth.FacebookAuthProvider();

export default function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState({ 
    code: null, 
    message: null, 
    credential: null,
    email: null 
  });
  
  useEffect(() => {
    if (!errorMessage.code) return;
    console.log(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    auth().onAuthStateChanged(authUser => {
      if (!!authUser) {
        if ((user||{}).uid !== authUser.uid) {
          setUser(authUser);
          if (!!errorMessage.credential && authUser.email === errorMessage.email) {
            cleanError();
            authUser.linkWithCredential(errorMessage.credential).catch(e => console.log(e));
          } 
        }
      } else {
        setUser(null);
      }
    });// eslint-disable-next-line
  }, []);

  useEffect(() => {
    auth().getRedirectResult().then(function(result) {
      if (result.operationType === "signIn" && (user||{}).uid !== result.user.uid) {
        setUser(result.user);
        cleanError();
      }
      if (result.credential) {
        console.log("From redirect: TOKEN - ", result.credential.accessToken);
      }
    }).catch(function(e) {
      errorHandler(e);
    });// eslint-disable-next-line 
  }, []);

  useEffect(() => {
    if (!!errorMessage.credential && !!errorMessage.email) {
      auth().fetchSignInMethodsForEmail(errorMessage.email).then(function(methods) {
        if (methods[0] === 'password') {
          console.log("Prompt for PAssword", methods);// TODO: implement promptUserForPassword.
        }
        console.log("WHAT???", methods);
      }).catch(e => console.log(e));
    }
  }, [errorMessage]);

  return [
    { user, errorMessage },
    { create, signIn, signInRedirect, signOut }
  ];
  
  async function create(email="", password="") {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      console.log("createUserWithEmailAndPassword Triggered");
      cleanError();
    } catch(e) {
      errorHandler(e);
    }
  }

  async function signIn(email="", password="") {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log("signInWithEmailAndPassword Triggered");
      cleanError();
    } catch(e) {
      errorHandler(e);
    }
  }

  async function signOut() {
    try {
      await auth().signOut();
      console.log("signOut Triggered");
      cleanError();
    } catch(e) {
      errorHandler(e);
    }
  }

  async function signInRedirect({google, facebook}) {
    const provider = (
      (!!google && googleProvider)||
      (!!facebook && facebookProvider)
    );
    try {
      await auth().signInWithRedirect(provider);
      console.log("signInWithRedirect Triggered");
    } catch(e) {
      errorHandler(e);
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
