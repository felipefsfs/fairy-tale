import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LinkSigned from "./LinkSigned";
import LinkAnon from "./LinkAnon";
import { CurrentUserContext } from "../../stores/CurrentUser";

export default function Nav() {
    const current = useContext(CurrentUserContext);

    const user = (current.user||{}).uid;
    console.log("user", user);
    return (
        <nav className="nav-wrapper grey">
            <div className="container">
                <Link to="/" className="left brand-logo">
                    Fairy Tale
                </Link>
                {(!!user && (<LinkSigned />))||(<LinkAnon />)}
            </div>     
        </nav>
    );
}