import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../stores/CurrentUser";
import banner from '../images/banner.png';
import "./views.css";

export default function Splash() {
  const { waiting, user} = useContext(CurrentUserContext);
  
  const header_style = {
    backgroundImage: "url(" + banner + ")",
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat'
  };
  return (
    <header className="App-header" style={header_style}>
      <div className="row toaction">
        <div className="col s6 toaction">
        </div>
        {!waiting && ((!!(user||{}).uid && (<div className="col s6 toaction">
            <p>Start a new Plan</p>
            <Link to="/plan" className="waves-effect waves-light btn green">
              <i className="material-icons left">add</i>Plan
            </Link>
          </div>))||(
          <div className="col s6 toaction">
            <p>Create an account</p>
            <Link to="/signup" className="waves-effect waves-light btn orange">
              <i className="material-icons left">cloud</i>Join
            </Link>
          </div>))}
      </div>
      <div className="container">
        <p>
            Accounting TOOL!
        </p>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt officiis quos labore sed fugit consectetur velit ea? Quod dolores, quae doloribus quam nobis dolor maiores quas molestias magnam fugiat.
        </p>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt officiis quos labore sed fugit consectetur velit ea? Quod dolores, quae doloribus quam nobis dolor maiores quas molestias magnam fugiat.
        </p>
        {!!(user||{}).uid && (<p> Logged in as {user.email}</p>)}
      </div>
    </header>
  );
}