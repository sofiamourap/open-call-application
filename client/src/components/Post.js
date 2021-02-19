import React, { useEffect, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import CandidatsApplication from "./CandidatsApplication";
export default function Post() {
  const [openCalls, setOpenCalls] = useState([]);
  // const [candidats, setCandidats] = useState([]);

  const getOpenCalls = () => {
    fetch("/opencall")
      .then((response) => response.json())
      .then((oc) => {
        setOpenCalls(oc);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOpenCalls();
    insertCandidat();
  }, []);

  const insertCandidat = () => {};

  return (
    <div>
      <h1>OPEN CALLS</h1>
      {openCalls.map((o) => (
        <div key={o.id}>
          <Link to={`/application/${o.id}`}>
            {" "}
            <h3>{o.residency_name}</h3>
          </Link>
        </div>
      ))}
      <p>this is a admin page</p>
      <Switch>
        <Route path="/application/:id">
          <CandidatsApplication />
        </Route>
      </Switch>
    </div>
  );
}
