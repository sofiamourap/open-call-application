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

  //fetch opencall

  const handleChange = ({ target }) => {
    setNewOpenCall((state) => ({ ...state, [target.name]: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postOpenCall();
  };

  //post Open Call
  const postOpenCall = async () => {
    try {
      const result = await fetch("/opencall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOpenCall),
      });
      // console.log(newOpenCall);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOpenCalls();
  }, []);

  //need to create a way to select a gallery from a dropdown list and pass it the id of it

  return (
    <div>
      <h1 className="headers">OPEN CALLS</h1>
      {openCalls.map((o) => (
        <div key={o.id}>
          <NavLink to={`/openCall/${o.id}`}>
            <h2>{o.name}</h2>
            <h3>{o.residency_name}</h3>
          </NavLink>
        </div>
      ))}
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Residency Name
            <input name="residency_name" onChange={handleChange} />
          </label>
          <label>
            Description
            <input name="description" onChange={handleChange} />
          </label>
          <label>
            Gallery
            <input name="gallery_id" onChange={handleChange} />
          </label>
          <button>Submit</button>
        </form>
      </div>
      <p>this is a admin page</p>
      <Switch>
        <Route path="/openCall/:id">
          <OpenCall />
        </Route>
      </Switch>
    </div>
  );
}
