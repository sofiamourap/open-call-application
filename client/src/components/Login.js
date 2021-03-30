import React, { useState } from "react";
import axios from "axios";

function Login(props) {
  const [gallery, setGallery] = useState({
    name: "NTU Gallery",
    password: "ntu",
  });

  const handleChange = (e) => {
    e.persist();
    // console.log(e.target.value);
    setGallery((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const login = () => {
    axios("/gallery/login", {
      method: "POST",
      data: gallery,
    })
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        console.log(result.data.message, result.data.token);
      })
      .catch((error) => console.log(error));
  };

  const requestData = () => {
    axios("/opencall/1/candidats", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((result) => console.log(result.data.message))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
        <input
          value={gallery.name}
          onChange={handleChange}
          name="name"
          type="text"
          className="form-control mb-2"
        />
        <input
          value={gallery.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <button className=" btn btn-outline-dark" onClick={login}>
          Log in
        </button>
      </div>
      <div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div>
    </div>
  );
}

export default Login;
