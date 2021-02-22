import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useParams } from "react-router-dom";
import Gallery from "./Gallery";

export default function CandidatsApplication() {
  const [openCallInfo, setOpenCallInfo] = useState([]);
  const { id } = useParams();
  const [newProject, setNewProject] = useState({
    full_name: "",
    email: "",
    project: "",
  });

  const postNewProject = async () => {
    try {
      const response = await fetch(`/opencall/${id}/candidats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
        //I want to send back the upload response to the user
      }).then((res) => console.log(res));
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleSubmit = (event) => {
    // event.preventDefault();
    postNewProject();
  };

  const handleChange = ({ target }) => {
    setNewProject((state) => ({ ...state, [target.name]: target.value }));
  };

  return (
    <div className="container-fluid">
      {openCallInfo.map((inf) => (
        <div key={inf.id}>
          <h1 className="residency-name">{inf.residency_name}</h1>
          <h3 className="app-gallery-name">{inf.name}</h3>

          <p className="residency-desc">{inf.description}</p>
        </div>
      ))}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Full Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="full_name"
              value={newProject.full_name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Email</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="email"
              value={newProject.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Project</span>
            </div>
            <textarea
              type="text"
              className="form-control"
              name="project"
              value={newProject.project}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-outline-dark">Submit</button>
        </form>
      </div>
      <Switch>
        <Route path="/gallery/:id">
          <Gallery />
        </Route>
      </Switch>
    </div>
  );
}
