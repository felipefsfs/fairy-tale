import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinks({ displayName }) {
  return (
    <ul className="right">
      <li><NavLink to="/signout" className="r"><i className="material-icons left">person</i>{displayName}</NavLink></li>
      <li><NavLink to="/signout" className="r">Sign Out</NavLink></li>
    </ul>
  );
}