import React, { useState, useEffect } from "react";
import cart from "./cart.png";

const Cart = () => {
  const [size, setSize] = useState(75);
  const [rightPos, setRightPos] = useState(20); // distancia desde la derecha en px

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width <= 600) { // celular
        setSize(50);
        setRightPos(40);   // más a la izquierda
      } else if (width <= 1024) { // tablet
        setSize(60);
        setRightPos(35);   // un poco más a la izquierda
      } else { // PC
        setSize(75);
        setRightPos(20);   // posición normal
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <img
      src={cart}
      alt="Cart"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        borderRadius: "0.25rem",
        position: "fixed",
        right: `${rightPos}px`,
        bottom: "10rem",
        zIndex: 1000,
      }}
      onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
    />
  );
};

export default Cart;




