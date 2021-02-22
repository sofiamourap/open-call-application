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
      <h4 className="text-center mt-4" id="gallery-oc-header">
        PREVIOUS RESIDENCY WORKS
      </h4>

      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide change-images-container"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7KkbJZkDhQdRvKxigdBN6RQqIYvoLBWGCkg&usqp=CAU"
                className="d-block w-100"
                alt=""
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFCtNqMZgrSBd3oDQUjus6eQpsNolYCXM-Cg&usqp=CAU"
                className="d-block w-100"
                alt=""
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://lh3.googleusercontent.com/proxy/LbFeBIPDVOQEsVAT_qqdNxOyF2EJPIhB0qAY7z6J-Hcf60PYv33ag9LxFQYBMCIInG0-iZ2IQaUd4nFo9po_t_yZQwLMVfcDBo0o3jdYu4OrwL8sunB7UAwvNmw_3m9fK1nKY1Y0D6WTLCEUivvReJxireI"
                className="d-block w-100"
                alt=""
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://video-images.vice.com/_uncategorized/1532978227676-IMG_7199-menor.jpeg"
                className="d-block w-100"
                alt=""
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <Switch>
        <Route path="/openCall">
          <OpenCalls />
        </Route>
      </Switch>
    </div>
  );
}
