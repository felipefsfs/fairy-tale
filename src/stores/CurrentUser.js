import React, { createContext } from "react";
//import useLocal from "../hooks/useLocal";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

export const CurrentUserContext = createContext({
  user: {},
  errorMessage: {}, 
  create() {}, 
  signIn() {}, 
  signInRedirect() {}, 
  signOut() {}
});

export default function CurrentUserProvider(props) {
  //useLocal("currentuser", [[user, setUser]]);
  const [ 
    { user, errorMessage }, 
    { create, signIn, signInRedirect, signOut }
  ] = useFirebaseAuth();
  
  return (
    <CurrentUserContext.Provider value={{user, errorMessage, create, signIn, signInRedirect, signOut}}>
      {props.children}
    </CurrentUserContext.Provider>
  );
  
}
