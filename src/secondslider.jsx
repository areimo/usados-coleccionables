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
  const [sideImageWidth, setSideImageWidth] = useState(200);
  const [centerImageWidth, setCenterImageWidth] = useState(780);
  const [imageGap, setImageGap] = useState(10);
  const [sliderWidth, setSliderWidth] = useState(1180);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 600) { // celular
        setSideImageWidth(120);
        setCenterImageWidth(150); // imagen más pequeña
        setImageGap(5);
        setSliderWidth(180);       // ancho mínimo del slider
      } else if (width <= 1024) { // tablet
        setSideImageWidth(150);
        setCenterImageWidth(400);
        setImageGap(8);
        setSliderWidth(700);
      } else { // PC
        setSideImageWidth(200);
        setCenterImageWidth(780);
        setImageGap(10);
        setSliderWidth(1180);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % (images.length - 3 + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const slideWidth = sideImageWidth * 2 + centerImageWidth + imageGap * 2;

  return (
    <div
      style={{
        width: `${sliderWidth}px`,
        height: "300px",
        overflow: "hidden",
        margin: "40px auto",
        paddingLeft: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          transition: "transform 0.8s ease-in-out",
          transform: `translateX(-${index * (sideImageWidth + imageGap)}px)`,
        }}
      >
        {images.map((img, i) => {
          const isCenter = i === index + 1;
          return (
            <img
              key={i}
              src={img}
              alt={`img-${i}`}
              style={{
                width: isCenter ? `${centerImageWidth}px` : `${sideImageWidth}px`,
                height: "300px",
                objectFit: "cover",
                borderRadius: "5px",
                marginRight: `${imageGap}px`,
                transition: "all 0.5s ease-in-out",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export { SecondSlider };
