import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useParams } from "react-router-dom";
import Gallery from "./Gallery";

export default function CandidatsApplication() {
  const [openCallInfo, setOpenCallInfo] = useState([]);
  const { id } = useParams();

  const getOpenCallInfo = () => {
    fetch(`/opencall/${id}`)
      .then((response) => response.json())
      .then((info) => {
        setOpenCallInfo(info);
      });
  };
  // console.log(id);
  useEffect(() => {
    getOpenCallInfo();
  }, []);
  return (
    <div>
      {openCallInfo.map((inf) => (
        <div key={inf.id}>
          {console.log(inf)}
          <h1>{inf.residency_name}</h1>
          <h2>{inf.name}</h2>

          <li>{inf.description}</li>
        </div>
      ))}
      <Switch>
        <Route path="/gallery/:id">
          <Gallery />
        </Route>
      </Switch>
    </div>
  );
}
