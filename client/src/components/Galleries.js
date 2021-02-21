import React, { useEffect, useState } from "react";
import { Link as NavLink, Route, Switch } from "react-router-dom";
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
    <div className="container-fluid">
      <h1 className="headers">GALLERIES</h1>
      <div className="row">
        {galleries.map((g) => (
          <div key={g.id} className="opencall-display col-lg-6 col-md-6">
            <div className="card">
              <div className="card-body shadow border-0">
                <h2>
                  <NavLink to={`gallery/${g.id}`} className="gal-name">
                    {g.name}
                  </NavLink>
                </h2>
                <h5 className="gal-location">
                  {g.country} - {g.city}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Switch>
        <Route path="/gallery/:id">
          <Gallery />
        </Route>
      </Switch>
    </div>
  );
}
