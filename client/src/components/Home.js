import React, { useEffect, useState } from "react";
// import { Link, Switch, Route } from "react-router-dom";

export default function Home() {
  const [openCalls, setOpenCalls] = useState([]);

  const getOpenCalls = () => {
    fetch("/opencall")
      .then((response) => response.json())
      .then((open) => {
        setOpenCalls(open);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOpenCalls();
  }, []);

  return (
    <div>
      <h1>OPEN CALLS</h1>
      {openCalls.map((e) => (
        <div>
          <h3>{e.gallery_id}</h3>
          <h5>{e.residency_name}</h5>
          {e.description} - {e.status}
        </div>
      ))}
    </div>
  );
}
