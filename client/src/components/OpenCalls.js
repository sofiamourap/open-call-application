import React, { useEffect, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import CandidatsApplication from "./CandidatsApplication";

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
          <h3>{e.name}</h3>
          {console.log(e.id)}

          <Link to={`application/${e.id}`}>
            <h5>{e.residency_name}</h5>
            {e.description} - {e.status}
          </Link>
        </div>
      ))}
      ;
      <Switch>
        <Route to="/application/:id">
          <CandidatsApplication />
        </Route>
      </Switch>
    </div>
  );
}
