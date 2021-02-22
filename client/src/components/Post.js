import React, { useEffect, useState } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import OpenCall from "./OpenCall";
export default function Post() {
  const [openCalls, setOpenCalls] = useState([]);
  const [newOpenCall, setNewOpenCall] = useState({
    residency_name: "",
    description: "",
    gallery_id: "",
  });
  const [galleries, setGalleries] = useState([]);

  // console.log(openCalls[0]["name"]);

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

  const handleChange = ({ target }) => {
    setNewOpenCall((state) => ({ ...state, [target.name]: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postOpenCall();
  };

  const postOpenCall = () => {
    fetch("/opencall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOpenCall),
    })
      .then(() => {
        getOpenCalls();
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  useEffect(() => {
    getOpenCalls();
    getGalleries();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <h1 className="headers">OPEN CALLS</h1>
        <div className="row">
          {openCalls.map((o) => (
            <div key={o.id} className="opencall-display col-lg-4 col-md-6">
              <div>
                <NavLink to={`/openCall/${o.id}`}>
                  <h2 className="card-header gallery-id">{o.name}</h2>
                  <h3 className="card-body shadow border-0 opencalls-links">
                    {o.residency_name}
                  </h3>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
        <div className="new-oc-input">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3 col-lg-6 col-md-6">
              <div className="input-group-prepend">
                <span className="input-group-text">Residence Name</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="residency_name"
                value={newOpenCall.residency_name}
                onChange={handleChange}
              />
            </div>
            <div className="input-group mb-3 col-lg-6 col-md-6">
              <div className="input-group-prepend">
                <label className="input-group-text" for="inputGallery">
                  Gallery
                </label>
              </div>

              <select
                className="custom-select"
                id="inputGallery"
                name="gallery_id"
                value={newOpenCall.gallery_id}
                onChange={handleChange}
              >
                <option selected>Choose...</option>
                {galleries.map((e) => (
                  <option value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3 ml-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Description</span>
              </div>
              <textarea
                type="text"
                className="form-control"
                name="description"
                value={newOpenCall.description}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-outline-dark">Submit</button>
          </form>
        </div>
      </div>
      <Switch>
        <Route path="/openCall/:id">
          <OpenCall />
        </Route>
      </Switch>
    </div>
  );
}
