import React from "react";
import cart from "./cart.png";

const Cart = () => {
  return (
    <img
      src={cart}
      alt="Cart"
      style={{
        width: "4.6875rem",
        height: "4.6875rem",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)", 
        borderRadius: "0.25rem", 
      }}
      onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
    />
  );
};

export default Cart;

