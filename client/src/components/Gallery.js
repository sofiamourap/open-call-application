import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const { id } = useParams();

  const getGallery = () => {
    fetch(`/gallery/${id}/opencalls`)
      .then((response) => response.json())
      .then((gal) => {
        setGallery(gal);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <div>
      {gallery.map((g) => (
        <div key={g.id}>
          <h1>{g.name}</h1>
          <h3>
            {g.country} | {g.city}
          </h3>
          <li>{g.residency_name}</li>
        </div>
      ))}
    </div>
  );
}
