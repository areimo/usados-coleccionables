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
  const [imageHeight, setImageHeight] = useState(300);

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth;

      if (width <= 600) { // celular
        setVisibleCount(1);
        setImageWidth(width * 0.6);
        setImageHeight((width * 0.5 * 3) / 5);
      } else if (width <= 1024) { // tablet
        setVisibleCount(2);
        setImageWidth(250);
        setImageHeight(150);
      } else { // PC
        setVisibleCount(3);
        setImageWidth(500);
        setImageHeight(300);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
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
        width: "100%",           // contenedor ocupa todo el ancho disponible
        maxWidth: `${visibleCount * (imageWidth + 10)}px`, // máximo ancho según imágenes
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
              height: `${imageHeight}px`,
              objectFit: "cover",
              borderRadius: "5px",
              marginRight: "10px",
              transition: "all 0.5s ease-in-out",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoSlider;









