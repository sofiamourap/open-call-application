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
          <ul className="navbar-nav ml-auto">
            <li>
              <NavLink to="/" className="nav-item">
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/openCall" className="nav-item">
                Open Calls
              </NavLink>
            </li>
            <li>
              <NavLink to="/galleries" className="nav-item">
                Galleries
              </NavLink>
            </li>
            <li>
              <NavLink to="/post" className="nav-item">
                Post | admin page
              </NavLink>
            </li>
          </ul>
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
