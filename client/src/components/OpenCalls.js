import React, { useEffect, useState } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import CandidatsApplication from "./CandidatsApplication";
import Gallery from "./Gallery";

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
    <div className="container-fluid">
      <h1 className="headers">OPEN CALLS</h1>
      <div className="row">
        {openCalls.map((e) => (
          <div key={e.id} className="opencall-display col-lg-4 col-md-6">
            <div className="card">
              <div className="card-header">
                <NavLink to={`gallery/${e.gallery_id}`} className="gallery-id">
                  <h3>{e.name}</h3>
                </NavLink>
              </div>
              <div className="card-body shadow border-0">
                <NavLink
                  to={`/application/${e.id}`}
                  className="opencalls-links"
                >
                  <h4>{e.residency_name}</h4>
                  <h6> {e.description} </h6>
                  Status | {e.status ? "Open" : "Closed"}
                  <div></div>
                </NavLink>
              </div>
            </div>
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
      </Switch>
    </div>
  );
}
