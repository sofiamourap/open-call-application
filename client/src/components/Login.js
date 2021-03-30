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
      })
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
        <button className=" btn btn-dark ml-2">Admin page</button>
      </div>
    </div>
  );
}

export default Login;
