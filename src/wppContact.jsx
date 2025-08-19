import React, { useState, useEffect } from "react";
import whatsapp from "./whatsapp.png";

const WppContact = () => {
  const phoneNumber = "59899284003";
  const message = "Hola, estoy interesado en un service...";
  const wppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  const [size, setSize] = useState(75);
  const [rightPos, setRightPos] = useState(20);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width <= 600) { // celular
        setSize(50);
        setRightPos(40);
      } else if (width <= 1024) { // tablet
        setSize(60);
        setRightPos(35);
      } else { // PC
        setSize(75);
        setRightPos(20);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <a href={wppLink} target="_blank" rel="noopener noreferrer">
      <img
        src={whatsapp}
        alt="WhatsApp"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          position: "fixed",
          right: `${rightPos}px`,
          bottom: "5rem",
          zIndex: 1000,
        }}
        onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
      />
    </a>
  );
};

export default WppContact;



