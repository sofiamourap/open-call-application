import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useParams } from "react-router-dom";
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

  //link to application
  return (
    <div>
      <div>
        {galInfos.map((gal) => (
          <div key={gal.id}>
            <h1>{gal.name}</h1>
            <h3>
              {gal.country} | {gal.city}
            </h3>
          </div>
        ))}
      </div>
      <h4>Open Calls</h4>
      {gallery.map((g, i) => (
        <div key={g[i]}>
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
