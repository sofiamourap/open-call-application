import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useParams } from "react-router-dom";
import OpenCalls from "./OpenCalls";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const { id } = useParams();

  const getGallery = () => {
    fetch(`/gallery/${id}/opencalls`)
      .then((response) => response.json())
      .then((gal) => {
        setGallery(gal);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getGallery();
  }, []);
  //link to application
  return (
    <div>
      {gallery.map((g) => (
        <div key={g.id}>
          <h1>{g.name}</h1>
          <h3>
            {g.country} | {g.city}
          </h3>
          <h4>Open Calls</h4>
          <Link to={"/openCall"}>
            <li>{g.residency_name}</li>
          </Link>
        </div>
      ))}
      <Switch>
        <Route path="/openCall">
          <OpenCalls />
        </Route>
      </Switch>
    </div>
  );
}
