import React from "react";
import whatsapp from "./whatsapp.png";

const WppContact = () => {
  const phoneNumber = "59899284003";
  const message = "Hola, estoy interesado en un service...";
  const wppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <a href={wppLink} target="_blank" rel="noopener noreferrer">
      <img src={whatsapp} alt="WhatsApp" style={{ width: "4.6875rem", height: "4.6875rem", cursor: "pointer", transition: "transform 0.2s ease-in-out" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"} />
    </a>
  );
};

export default WppContact;
