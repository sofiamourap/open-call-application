import React from "react";
import image from "./image.jpg";

export default function Home() {
  return (
    <div className="home-container">
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <h1 id="home-heading">
            Connecting independent artists and galleries around the world.
          </h1>
        </div>
        <div className="col-lg-6 col-md-6">
          <img src={image} alt="" id="home-image" />
        </div>
      </div>
    </div>
  );
}
