import React from 'react';
//import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Splash from "./components/splash.js";
import Empty from "./components/empty.js";
import SignIn from "./components/signin.js";
import Nav from "./components/nav.js";

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Nav />
            <Switch>
                <Route path="/e" component={Empty} />
                <Route path="/signin" component={SignIn} />
                <Route exact path="/" component={Splash} />
            </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
