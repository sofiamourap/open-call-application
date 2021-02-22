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
    <div className="container-fluid">
      {openCall.map((oc) => (
        <div key={oc.id}>
          <h1 key={oc.id} className="residency-name">
            {oc.residency_name}
          </h1>
          <p className="admin-residency-desc">{oc.description}</p>
        </div>
      ))}
      <div className="container-fluid">
        <div className="row">
          {candidats.map((c) => (
            <div className="opencall-display col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body shadow border-0">
                  <h3 key={c.id} className="admin-fullname">
                    {c.full_name}
                  </h3>
                  <p>Email: {c.email}</p>
                  <p>Project: {c.project}</p>
                  <p className="card-footer text-muted">Status: {c.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="total-candidats">
          <h4>TOTAL ARTISTS: {candidats.length}</h4>
        </div>
      </div>
    </div>
  );
}
