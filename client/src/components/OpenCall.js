import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OpenCall() {
  const [candidats, setCandidats] = useState([]);
  const [openCall, setOpenCall] = useState([]);
  const { id } = useParams();

  //GET each openCall by id
  const getOpenCall = () => {
    fetch(`/opencall/${id}`)
      .then((response) => response.json())
      .then((opencall) => {
        setOpenCall(opencall);
      })
      .catch((err) => console.log(err));
  };

  //GET all candidats from this opencall
  const getCandidats = () => {
    fetch(`/opencall/${id}/candidats`)
      .then((response) => response.json())
      .then((cand) => {
        setCandidats(cand);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOpenCall();
    getCandidats();
  }, []);

  return (
    <div>
      {openCall.map((oc) => (
        <div key={oc.id}>
          <h1 key={oc.id}>{oc.residency_name}</h1>
          {oc.description}
        </div>
      ))}
      <div>
        {candidats.map((c) => (
          <div>
            <h3 key={c.id}>{c.full_name}</h3>
            <li>{c.email}</li>
            <li>{c.project}</li>
            <li>Status: {c.status}</li>
          </div>
        ))}
      </div>
      <div>
        <h4>TOTAL ARTISTS: {candidats.length}</h4>
        <p>This is a admin page</p>
      </div>
    </div>
  );
}
