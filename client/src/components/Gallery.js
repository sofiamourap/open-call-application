import React, { useEffect, useState } from "react";
import { Link as NavLink, Route, Switch, useParams } from "react-router-dom";
import OpenCalls from "./OpenCalls";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const { id } = useParams();
  const [galInfos, setGalInfos] = useState([]);

  const getGalleryInfos = () => {
    fetch(`/gallery/${id}`)
      .then((response) => response.json())
      .then((gal) => {
        setGalInfos(gal);
      })
      .catch((err) => console.log(err));
  };

  const getGalleryOpenCalls = () => {
    fetch(`/gallery/${id}/opencalls`)
      .then((response) => response.json())
      .then((gal) => {
        setGallery(gal);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getGalleryOpenCalls();
    getGalleryInfos();
  }, []);

  //link to application. Can I use a map inside the Route tag to use the open call id?
  // center the
  //add in the future a carossel of previous works from opencalls. for now use set images
  return (
    <div className="container-fluid">
      <div>
        {galInfos.map((gal) => (
          <div key={gal.id} className="gallery-info">
            <h1 className="gallery-name">{gal.name}</h1>
            <h2 className="gallery-location">
              {gal.country} | {gal.city}
            </h2>
          </div>
        ))}
      </div>
      <h3 className="text-center" id="gallery-oc-header">
        OPEN CALLS
      </h3>
      <div className="row gallery-display">
        {gallery.map((g, i) => (
          <div key={g[i]} className="col-lg-6 col-md-6">
            <div className="card">
              <NavLink
                to={"/openCall"}
                className="opencalls-links card-body shadow border-0"
              >
                <h5>{g.residency_name}</h5>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
      <div>{/* start here the carossel */}</div>
      <Switch>
        <Route path="/openCall">
          <OpenCalls />
        </Route>
      </Switch>
    </div>
  );
}
