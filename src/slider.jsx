import React, { useEffect, useState } from "react";
import computers from "./computers.png";
import consoles from "./consoles.png";
import board from "./board.png";
import delivery from "./delivery.png";

const images = [computers, consoles, delivery, board, computers, consoles, board];

const AutoSlider = () => {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [imageWidth, setImageWidth] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 600) {        // celulares
        setVisibleCount(1);
        setImageWidth(width - 40); // ancho con margen
      } else if (width <= 1024) { // tablets
        setVisibleCount(2);
        setImageWidth((width - 60) / 2);
      } else {                     // PC
        setVisibleCount(3);
        setImageWidth(500);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % (images.length - visibleCount + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [visibleCount]);

  return (
    <div
      style={{
        width: `${visibleCount * imageWidth}px`,
        overflow: "hidden",
        margin: "40px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          width: `${images.length * (imageWidth + 10)}px`,
          transform: `translateX(-${index * (imageWidth + 10)}px)`,
          transition: "transform 0.8s ease-in-out",
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`img-${i}`}
            style={{
              width: `${imageWidth}px`,
              height: `${(imageWidth * 3) / 5}px`, // mantener proporción 5:3
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



