import { useEffect,useState } from 'react';import React from "react";
import xbox360 from './xbox360.jpg';
import xbox360controller from './xbox360controller.jpg';
import psp from './psp.jpg'
import tloups3 from './tloups3.jpg'
import ndsgames from './ndsgames.jpg'
import f12011xbox360 from './f12011xbox360.jpg'

const images = [ xbox360, xbox360controller, psp, tloups3, ndsgames, f12011xbox360];


const AutoSlider = () => {
  const visibleCount = 3;
  const imageGap = 10; 
  const centerImageWidth = 780;
  const sideImageWidth = 200;

  const slideWidth = sideImageWidth + centerImageWidth + sideImageWidth + imageGap * 2; 

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % (images.length - visibleCount + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
<div
  style={{
    width: `${slideWidth}px`,
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
                height: isCenter ? "300px" : `${sideImageWidth}px`,
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
export default AutoSlider;
export { AutoSlider as SecondSlider }; 