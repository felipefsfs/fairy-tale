import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinks() {
    return (
        <ul className="right">
            <li><NavLink to="/signin" className="r">Sign In</NavLink></li>
            <li><NavLink to="/signup" className="r">Sign Up</NavLink></li>
            <li><NavLink to="/e" className="r">Sign Out</NavLink></li>
        </ul>
    );
}