import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OpenCall() {
  const [candidats, setCandidats] = useState([]);
  const [openCall, setOpenCall] = useState([]);
  // const [status, setStatus] = useState(true);
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

  //DELETE openCall by id
  const deleteOpenCall = (id) => {
    fetch(`/opencall/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        getOpenCall();
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  //fetch PUT method to change the status. ITS NOT WORKING YET

  const closeOpenCall = () => {
    console.log("im here");
    editOpenCall();
  };

  const editOpenCall = () => {
    fetch(`/opencall/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: false,
      }),
    })
      .then(() => {
        getOpenCall();
      })
      .catch((error) => {
        console.log("Error");
      });
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
          <h3 className="app-gallery-name">{oc.name}</h3>
          <h5 className="admin-residency-desc">{oc.description}</h5>
          <p className="admin-residency-desc">
            status: {oc.status ? "open" : "closed"}
          </p>
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
                  <p className="card-footer text-muted">
                    Status: {c.status && "Approved"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="total-candidats">
          <h4>TOTAL ARTISTS: {candidats.length}</h4>
        </div>

        <div className="mt-5">
          <button className="btn btn-dark m-3" onClick={() => closeOpenCall()}>
            <span className="fas fa-lock"></span> Close Open Call
          </button>
          <button
            className="btn btn-outline-dark m-3"
            onClick={() => closeOpenCall()}
          >
            <span className="fas fa-lock-open"></span> Re-open Open Call
          </button>
          <button
            className="btn btn-outline-danger m-3"
            onClick={() => deleteOpenCall(id)}
          >
            <span className="fas fa-trash-alt"></span> Delete Open Call
          </button>
        </div>
      </div>
    </div>
  );
}
