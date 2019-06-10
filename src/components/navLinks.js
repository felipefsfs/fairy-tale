import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinks() {
    return (
        <ul className="right">
            <li><NavLink to="/" className="r">Sign In</NavLink></li>
            <li><NavLink to="/" className="r">Sign Up</NavLink></li>
            <li><NavLink to="/" className="r">Sign Out</NavLink></li>
        </ul>
    );
}