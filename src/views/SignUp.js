import React from "react";
import SignForm from "../components/SignForm";

export default function SignUp({ history }) {
  return (
    <div className="container">
      <SignForm signup history={history}/>
    </div>
  );
}