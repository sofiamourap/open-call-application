import React, { useEffect, useState } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
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
      <h1 className="headers">OPEN CALLS</h1>
      <div className="row">
        {openCalls.map((e) => (
          <div key={e.id} className="col-lg-4 col-md-6" id="open-call-col">
            <NavLink to={`gallery/${e.gallery_id}`} className="gallery-id">
              <h3>{e.name}</h3>
            </NavLink>

            <NavLink to={`/application/${e.id}`}>
              <h4>{e.residency_name}</h4>
              {e.description} - {e.status}
            </NavLink>
            <NavLink to={`/openCall/${e.id}`}>
              {" "}
              <h5>Admin view for this open call</h5>
            </NavLink>
          </div>
        ))}
      </div>
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
