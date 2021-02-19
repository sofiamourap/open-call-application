import React, { useEffect, useState } from "react";

export default function CandidatsApplication() {
  const [openCallInfo, setOpenCallInfo] = useState([]);

  const getOpenCallInfo = () => {
    fetch(`opencall/1`)
      .then((response) => response.json())
      .then((info) => {
        setOpenCallInfo(info);
      });
  };
  useEffect(() => {
    getOpenCallInfo();
  }, []);
  return (
    <div>
      {openCallInfo.map((inf) => (
        <div key={inf.id}>
          <h1>{inf.residency_name}</h1>
          <h2>{inf.name}</h2>
          <li>{inf.description}</li>
        </div>
      ))}
    </div>
  );
}
