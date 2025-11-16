import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cartIcon from "./cart.png";

const Cart = ({ cartItems, setCartItems }) => {
  const [size, setSize] = useState(75);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width <= 600) setSize(60);
      else if (width <= 1024) setSize(45);
      else setSize(65);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (!cartItems.length) {
      alert("Tu carrito está vacío");
      return;
    }
    

    const products = cartItems.map((item) => ({
      title: item.title,
      price: item.price,
      quantity: item.quantity || 1,
      description: item.description || "",
    }));

    const encodedProducts = encodeURIComponent(JSON.stringify(products));

    // Redirige al localhost:8080 con los productos en la URL
    window.location.href = `https://26c48b553125.ngrok-free.app/?products=${encodedProducts}`;
  };

  return (
    <>
      {/* Ícono flotante del carrito */}
      <img
        src={cartIcon}
        alt="Cart"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
          borderRadius: "0.25rem",
          position: "fixed",
          right: "1.25rem",
          bottom: "10rem",
          zIndex: 1000,
        }}
        onClick={() => setShowCart(true)}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      {/* Modal del carrito */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "12px",
                width: "95%",
                maxWidth: "600px",
                position: "relative",
                fontSize: "1rem",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <button
                onClick={() => setShowCart(false)}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#333",
                }}
              >
                ✕
              </button>

              <h3 style={{ fontSize: "1.6rem", marginBottom: "1.5rem", textAlign: "center" }}>
                Tu Carrito
              </h3>

              {cartItems.length ? (
                <div style={{ marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.8rem",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <div>
                        <p style={{ margin: 0, fontWeight: "600" }}>{item.title}</p>
                        <p style={{ margin: 0, color: "#555" }}>
                          ${item.price} x {item.quantity || 1}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        style={{
                          background: "#D5312D",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          padding: "0.4rem 0.7rem",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>El carrito está vacío</p>
              )}

              {cartItems.length > 0 && (
                <button
                  onClick={handleCheckout}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  Pagar
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
