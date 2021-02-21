import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Gallery from "./Gallery";

export default function Galleries() {
  const [galleries, setGalleries] = useState([]);

  //display list of galleries (on click, open gallery by id)
  const getGalleries = () => {
    fetch("/gallery")
      .then((response) => response.json())
      .then((gallery) => {
        setGalleries(gallery);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGalleries();
  }, []);
  return (
    <div>
      <h1 className="headers">GALLERIES</h1>
      {galleries.map((g) => (
        <div key={g.id}>
          <h3>
            <Link to={`gallery/${g.id}`}>{g.name}</Link>
          </h3>
          {g.country} - {g.city}
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
