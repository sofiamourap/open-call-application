import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CandidatsApplication() {
  const [openCallInfo, setOpenCallInfo] = useState([]);
  const { id } = useParams();

  const getOpenCallInfo = () => {
    fetch(`/opencall/${id}`)
      .then((response) => response.json())
      .then((info) => {
        setOpenCallInfo(info);
      });
  };
  console.log(id);
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
