import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../stores/CurrentUser";
import CtrlInput from "./CtrlInput";
import SubmitButton from "./SubmitButton";
import GoogleSocial from "./GoogleSocial";

export default function SignUp({signup, signin}) {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");

  const current = useContext(CurrentUserContext);

  const data = (signup && {
    title: "Sign Up for a new account",
    button: "Register",
    action: current.create
  }) || (signin && {
    title: "Sign In",
    button: "Login",
    action: current.signIn
  })|| {
    title: "Form",
    button: "action",
    action: () => console.log("Submitted")
  };

  return (
    <div className="card-panel">
      <h4 className="grey-text text-darken-3">{data.title}</h4>
      <GoogleSocial signIn ={current.signInRedirect}/>
      <form onSubmit={submit} className="white">
        <CtrlInput value={email} setValue={set_email} 
            type="email" inputId="emailsId">
          Email
        </CtrlInput>
        <CtrlInput value={password} setValue={set_password} 
            type="password" inputId="passId">
          Password
        </CtrlInput>
        <SubmitButton message={current.errorMessage.message}>
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