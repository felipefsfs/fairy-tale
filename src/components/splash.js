import React, { useContext } from "react";
import logo from '../logo.svg';
import { CurrentUserContext } from "../stores/CurrentUser";

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
