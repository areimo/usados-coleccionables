import React, { useEffect, useState } from "react";
import computers from "./computers.png";
import consoles from "./consoles.png";
import board from "./board.png";
import delivery from "./delivery.png";

const images = [computers, consoles, delivery, board, computers, consoles, board];

const AutoSlider = () => {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth;
      setContainerWidth(width);

      if (width <= 600) setVisibleCount(1);       // celular
      else if (width <= 1024) setVisibleCount(2); // tablet
      else setVisibleCount(3);                     // PC
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Ajuste celular: slider un poco menos ancho
  const imageWidth =
    containerWidth <= 600
      ? containerWidth * 0.8 // slider más estrecho en celular
      : containerWidth / visibleCount - 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % (images.length - visibleCount + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [visibleCount]);

  return (
    <div
      style={{
        width: `${imageWidth}px`,
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
              height: `${(imageWidth * 3) / 5}px`,
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




