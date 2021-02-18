import React, { useEffect, useState } from "react";

export default function Galleries() {
  const [galleries, setGalleries] = useState([]);

  const getGalleries = () => {
    fetch("/gallery")
      .then((response) => response.json())
      .then((gallery) => {
        setGalleries(gallery);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGalleries();
  }, []);
  return (
    <div>
      <h1>GALLERIES</h1>
      {galleries.map((g) => (
        <div key={g.id}>
          <h3>{g.name}</h3>
          {g.country} - {g.city}
        </div>
      ))}
    </div>
  );
}
