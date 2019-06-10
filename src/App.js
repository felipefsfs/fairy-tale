import React from 'react';
//import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Splash from "./components/splash.js";
import Empty from "./components/empty.js";
import Nav from "./components/nav.js";

import fff, * as g from "./components/e.js";

fff();
g.default();
function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Nav />
            <Switch>
                <Route to="/" component={Splash} />
                <Route to="/e" component={Empty} />
            </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
