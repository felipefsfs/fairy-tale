import React, {useContext, useEffect} from "react";
import { CurrentUserContext } from "../stores/CurrentUser";
import logo from '../logo.svg';

export default function Splash() {
  const current = useContext(CurrentUserContext);
  
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
          Accounting TOOL!
      </p>
      {!!(current.user||{}).uid && (<p> Logged in as {current.user.email}</p>)}
    </header>
  );
}