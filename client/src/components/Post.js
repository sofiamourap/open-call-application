import React, { useEffect, useState } from "react";

export default function Post() {
  const [openCalls, setOpenCalls] = useState([]);
  // const [candidats, setCandidats] = useState([]);

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

  useEffect(() => {
    getOpenCalls();
    insertCandidat();
  }, []);

  const insertCandidat = () => {};

  return (
    <div>
      <h1>OPEN CALLS</h1>
      {openCalls.map((o) => (
        <div key={o.id}>
          <h3>{o.residency_name}</h3>
        </div>
      ))}
    </div>
  );
}
