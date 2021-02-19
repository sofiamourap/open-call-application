import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
        <h1>
          <Link to="/">HOME</Link>
        </h1>

        <Link to="/openCall">Open Calls</Link>
        <br></br>
        <Link to="/galleries">Galleries</Link>
        <br></br>
        <Link to="/post">Post | admin page</Link>

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
