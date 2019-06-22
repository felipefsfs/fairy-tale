import React from 'react';
//import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Splash from "./components/splash";
import Empty from "./components/empty"; 
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Nav from "./components/nav";
import CurrentUserProvider from "./stores/CurrentUser";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CurrentUserProvider>
          <Nav />
          <Switch>
            <Route path="/e" component={Empty} />
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