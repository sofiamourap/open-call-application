import React, { useEffect, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import CandidatsApplication from "./CandidatsApplication";
import Gallery from "./Gallery";
import OpenCall from "./OpenCall";

export default function Home() {
  const [openCalls, setOpenCalls] = useState([]);

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

  useEffect(() => {
    getOpenCalls();
  }, []);
  return (
    <div>
      <h1>OPEN CALLS</h1>
      {openCalls.map((e) => (
        <div key={e.id}>
          <Link to={`gallery/${e.gallery_id}`}>
            <h3>{e.name}</h3>
          </Link>
          {console.log(e.id)}

          <Link to={`/application/${e.id}`}>
            <h4>{e.residency_name}</h4>
            {e.description} - {e.status}
          </Link>
          <Link to={`/openCall/${e.id}`}>
            {" "}
            <h5>Admin view for this open call</h5>
          </Link>
        </div>
      ))}
      <Switch>
        <Route path="/application/:id">
          <CandidatsApplication />
        </Route>
        <Route path="/gallery/:id">
          <Gallery />
        </Route>
        <Route path="/openCall/:id">
          <OpenCall />
        </Route>
      </Switch>
    </div>
  );
}
