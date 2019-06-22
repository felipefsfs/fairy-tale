import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../stores/CurrentUser";
import gimg from "../images/btn_google_signin_light_normal_web.png";

export default function SignUp() {
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
  
    const current = useContext(CurrentUserContext);
    
    useEffect(() => {
        console.log(email,password);
        console.log(current.user);
        console.log(current.errorMessage);
    })
    return (
        <div className="container">
            <h5 className="grey-text text-darken-3">Sign Up for a new account</h5>
            <div className="divider"></div>
            <ul className="collection">
              <li className="collection-item" style={{"textAlign": "left"}}>
                <div>
                <strong>Social</strong>
                <img alt="a" onClick={() => current.signInRedirect({ google: true })} style={{"marginRight": "20px"}}  className="secondary-content" src={gimg} />
                </div>
                
              </li>
            </ul>
            <div className="divider"></div>
            <form onSubmit={submit} className="white">
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange= {handleInput(set_email)}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange= {handleInput(set_password)}/>
                </div>
                <div className="input-field">
                    <button className="btn primary waves-effect waves-light">Register</button>
                </div>
                <p className="red-text">{current.errorMessage.message}</p>
            </form>
            
        </div>
    );

    function submit(event) {
        event.preventDefault();
        console.log("submitted");
        current.create(email,password);
    }

    function handleInput(setter) {
        return function save(e) {
            setter(e.target.value);
        }
    }

}