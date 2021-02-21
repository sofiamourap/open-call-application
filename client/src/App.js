import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import OpenCalls from "./components/OpenCalls";
import OpenCall from "./components/OpenCall";
import Galleries from "./components/Galleries";
import Post from "./components/Post";
import Gallery from "./components/Gallery";
import CandidatsApplication from "./components/CandidatsApplication";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <h4 className="navbar-brand">logo</h4>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="navbarSupportedContent" className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li>
                <NavLink to="/" className="nav-item dropdown">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/openCall" className="nav-item dropdown">
                  Open Calls
                </NavLink>
              </li>
              <li>
                <NavLink to="/galleries" className="nav-item dropdown">
                  Galleries
                </NavLink>
              </li>
              <li>
                <NavLink to="/post" className="nav-item dropdown">
                  Post | admin page
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route path="/openCall/:id">
            <OpenCall />
          </Route>
          <Route path="/openCall">
            <OpenCalls />
          </Route>
          <Route path="/gallery/:id">
            <Gallery />
          </Route>
          <Route path="/galleries">
            <Galleries />
          </Route>
          <Route path="/post">
            <Post />
          </Route>
          <Route path="/application/:id">
            <CandidatsApplication />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
