import React from "react";
import whatsapp from "./whatsapp.png"; 
const WppContact = () => {
  const phoneNumber = "099284003";
  const message = "Hola, estoy interesado en un service...";
  const wppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <div className="wpp-contact">
      <a href={wppLink} target="_blank" rel="noopener noreferrer">
        <img src={whatsapp} alt="WhatsApp" className="wpp-icon" />
      </a>
    </div>
  );
}
export default WppContact;