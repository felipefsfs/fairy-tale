import React, { useState } from "react";

export default function SignIn() {
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");

    return (
        <div className="container">
            <form onSubmit={submit} className="white">
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange= {handleInput(set_email)}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange= {handleInput(set_password)}/>
                </div>
                <div className="input-field">
                    <button className="btn primary">Login</button>
                </div>
            </form>
            
        </div>
    );

    function submit(e) {
        e.preventDefault();
        console.log(e);
        console.log(email);
        console.log(password);
    }

    function handleInput(setter) {
        return function save(e) {
            setter(e.target.value);
        }
    }

}