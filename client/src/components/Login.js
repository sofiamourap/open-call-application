import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Login(props) {
  const [gallery, setGallery] = useState({
    name: "NTU Gallery",
    password: "ntu",
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
        <button className=" btn btn-dark ml-2" onClick={signout}>
          Log out
        </button>
        {token && (
          <div>
            <NavLink to="/post">
              <button className=" btn btn-dark mt-2 ">Admin page</button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
