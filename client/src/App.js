import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import OpenCalls from "./components/OpenCalls";
import OpenCall from "./components/OpenCall";
import Galleries from "./components/Galleries";
import Post from "./components/Post";
import Gallery from "./components/Gallery";
import CandidatsApplication from "./components/CandidatsApplication";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  // useEffect(() => {
  //   setToken(localStorage.getItem("token"));
  // }, []);

  // const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogIn(status) {
    setIsLoggedIn(status);
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <NavLink to="/">
            <h4 className="navbar-brand">logo</h4>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarSupportedContent" className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
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
              {isLoggedIn && (
                <li>
                  <NavLink to="/post" className="nav-item dropdown">
                    Post | admin page
                  </NavLink>
                </li>
              )}
              {isLoggedIn ? (
                <li>
                  <NavLink to="/login" className="nav-item dropdown">
                    Logout
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink to="/login" className="nav-item dropdown">
                    Login
                  </NavLink>
                </li>
              )}
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
          <Route path="/login">
            <Login onChange={handleLogIn} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
