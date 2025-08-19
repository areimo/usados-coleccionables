import { useEffect, useState } from "react";
import React from "react";
import xbox360 from './xbox360.jpg';
import xbox360controller from './xbox360controller.jpg';
import psp from './psp.jpg';
import tloups3 from './tloups3.jpg';
import ndsgames from './ndsgames.jpg';
import f12011xbox360 from './f12011xbox360.jpg';

const images = [xbox360, xbox360controller, psp, tloups3, ndsgames, f12011xbox360];

const SecondSlider = () => {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [containerWidth, setContainerWidth] = useState(0);
  const [imageWidth, setImageWidth] = useState(200);
  const [imageHeight, setImageHeight] = useState(120); // altura menor como primer slider

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth;
      setContainerWidth(width);

      if (width <= 600) {
        setVisibleCount(1);          // una imagen por vez
        setImageWidth(width * 0.8);  // ancho del slider 80% del contenedor
        setImageHeight((width * 0.8 * 3) / 5); // misma proporción que primer slider
      } else if (width <= 1024) {
        setVisibleCount(2);
        setImageWidth(250);
        setImageHeight(150);
      } else {
        setVisibleCount(3);
        setImageWidth(300);
        setImageHeight(180);
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
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        overflow: "hidden",
        margin: "40px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          transition: "transform 0.8s ease-in-out",
          transform: `translateX(-${index * (imageWidth + 10)}px)`,
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

export { SecondSlider };


