import React from 'react';
//import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import Nav from "./components/nav.js";

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Nav />
            <i className="material-icons">assessment</i>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    </BrowserRouter>
  );
}

export default App;
