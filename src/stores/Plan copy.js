import React, { createContext, useEffect, useState } from "react";
import firebase from "../config/fb";

const db = firebase.firestore;

export const PlansContext = createContext({
  plans: [],
  add() {}, 
  modify() {},
  delete() {}, 
  duplicate() {}
});

export default function PlansProvider(props) {
  const plans = useState([]);
  return (
    <PlansProvider.Provider value={{plans, add}}>
      {props.children}
    </PlansProvider.Provider>
  );
  
  async function add(plan = {}) {
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

}
