import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LinkSigned from "./LinkSigned";
import LinkAnon from "./LinkAnon";
import "./nav.css";
import { CurrentUserContext } from "../../stores/CurrentUser";

export default function Nav() {
    const { waiting, user} = useContext(CurrentUserContext);
console.log(user);

    return (
        <nav className="nav-wrapper grey">
            <div className="container">
                <Link to="/b" className="left brand-logo">
                    Fairy Tale
                </Link>
                {!waiting && ((!!(user||{}).uid && (<LinkSigned displayName={user.displayName}/>))||(<LinkAnon />))}
            </div>     
        </nav>
    );
}