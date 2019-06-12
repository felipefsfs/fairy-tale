import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "./navLinks";

export default function Nav() {
    return (
        <nav className="nav-wrapper grey">
            <div className="container">
                <Link to="/" className="left brand-logo">Fairy Tale</Link>
                <NavLinks />
            </div>     
        </nav>
    );
}