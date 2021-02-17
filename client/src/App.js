import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import OpenCall from "./components/OpenCall";
import Galleries from "./components/Galleries";
import Post from "./components/Post";
import Apply from "./components/Apply";
import Gallery from "./components/Gallery";

function App() {
  //GET THE OPEN CALLS
  const [openCalls, setOpenCalls] = useState([]);

  useEffect(() => {
    getOpenCalls();
  }, []);

  const getOpenCalls = () => {
    fetch("/opencall")
      .then((response) => response.json())
      .then((open) => {
        setOpenCalls(open);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Router>
      <div className="App">
        <h1>HOME</h1>

        <Link to="/openCall">Open Calls</Link>

        <Switch>
          <Route path="/openCall">
            <Home />
          </Route>
          <Route path="/openCall/id">
            <OpenCall />
          </Route>
          <Route path="/galleries">
            <Galleries />
          </Route>
          <Route path="/post/openCall">
            <Post />
          </Route>

          <Route path="openCall/apply">
            <Apply />
          </Route>
          <Route path="/admin">
            <Gallery />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
