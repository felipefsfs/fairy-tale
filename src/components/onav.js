import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./navLinks";
import { CurrentUserContext } from "../stores/CurrentUser";

export default function Nav() {
    const current = useContext(CurrentUserContext);
    return (
        <nav className="nav-wrapper grey">
            <div className="container">
                <Link to="/" className="left brand-logo">{"Fairy Tale " + 
                    ((current.user||{}).displayName || "")}</Link>
                <NavLinks />
            </div>     
        </nav>
    );
}