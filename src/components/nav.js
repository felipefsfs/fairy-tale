import React from "react";
import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className="nav-wrapper grey">
            <div className="container">
                <Link to="/" className="brand-logo">Fairy Tale</Link>
            </div>
        </nav>
    );
}
  
export default Nav;