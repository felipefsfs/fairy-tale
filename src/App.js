import React from 'react';
//import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Splash from "./views/Splash";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import SignOut from "./views/SignOut";
import Nav from "./components/Nav/";
import CurrentUserProvider from "./stores/CurrentUser";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CurrentUserProvider>
          <Nav />
          <Switch>
            <Route path="/signout" component={SignOut} />
            <Route path="/plan/new" component={SignIn} />
            <Route path="/plan/:id" component={SignIn} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route exact path="/" component={Splash} />
          </Switch>
        </CurrentUserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

//icons
//description
//assessment
//receipt