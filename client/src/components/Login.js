import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Login(props) {
  const [gallery, setGallery] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    e.persist();

    setGallery((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const login = () => {
    axios("/gallery/login", {
      method: "POST",
      data: gallery,
    })
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        getToken();
        props.onChange(true);
      })
      .catch((error) => console.log(error));
  };

  const signout = () => {
    localStorage.clear("token");
    getToken();
    props.onChange(false);
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    setToken(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  const [token, setToken] = useState();

  return (
    <div>
      <div className="container login-container">
        <input
          value={gallery.name}
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Gallery"
          className="form-control mb-2"
        />
        <input
          value={gallery.password}
          onChange={handleChange}
          placeholder="password"
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <button className=" btn btn-outline-dark" onClick={login}>
          Log in
        </button>
        <button className=" btn btn-secondary ml-2" onClick={signout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Login;
