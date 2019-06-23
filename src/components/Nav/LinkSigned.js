import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinks() {
  return (
    <ul className="right">
      <li><NavLink to="/signout" className="r">Sign Out</NavLink></li>
    </ul>
  );
}