import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../stores/CurrentUser";
import CtrlInput from "./CtrlInput";
import SubmitButton from "./SubmitButton";
import GoogleSocial from "./GoogleSocial";

export default function SignForm({signup, signin, history}) {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [data, setdata] = useState("");

  const current = useContext(CurrentUserContext);

  useEffect(() =>{
    if (!!(current.user||{}).uid) {
      history.push("/");
    }// eslint-disable-next-line
  },[current.user]);

  useEffect(() =>{
    if (signup) {
      setdata({
        title: "Sign Up for a new account",
        button: "Register",
        action: current.create
      });
    }else if (signin) {
      setdata({
        title: "Sign In",
        button: "Login",
        action: current.signIn
      });
    } else {
      setdata({
        title: "Form",
        button: "action",
        action() { console.log("Submitted"); }
      });
    }
  },[signup, signin, current.create, current.signIn]);

  return (
    <div className="card-panel">
      <h4 className="grey-text text-darken-3">{data.title}</h4>
      <GoogleSocial signIn ={current.signInRedirect} loading_indc={current.waiting}/>
      <form onSubmit={submit} className="white">
        <CtrlInput value={email} setValue={set_email} 
            type="email" inputId="emailsId">
          Email
        </CtrlInput>
        <CtrlInput value={password} setValue={set_password} 
            type="password" inputId="passId">
          Password
        </CtrlInput>
        <SubmitButton message={current.errorMessage.message} loading_indc={current.waiting}>
          {data.button}
        </SubmitButton>
      </form>
    </div>
  );
  function submit(event) {
      event.preventDefault();
      data.action(email,password);
  }
  
}