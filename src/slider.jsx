import React, { useEffect, useState } from "react";
import computers from "./computers.png";
import consoles from "./consoles.png";
import board from "./board.png";
import delivery from "./delivery.png"

const images = [computers, consoles, delivery,board, computers, consoles, board];

const AutoSlider = () => {
  const visibleCount = 3; 
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        (prev + 1) % (images.length - visibleCount + 1) 
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: `${visibleCount * 442}px`, 
        overflow: "hidden",
        margin: "40px auto",
        marginLeft: "0px",
        padding: "0px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: `${images.length * 442}px`,
          transform: `translateX(-${index * 260}px)`,
          transition: "transform 0.8s ease-in-out",
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`img-${i}`}
            style={{
              width: "500px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoSlider;



