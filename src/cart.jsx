import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import cartIcon from "./cart.png";

const Cart = ({ cartItems, setCartItems }) => {
  const [size, setSize] = useState(75);
  const [showShippingForm, setShowShippingForm] = useState(false);

  const [shippingData, setShippingData] = useState({
    name: "",
    address: "",
    departamento: "",
    city: "",
    email: "",
    phone: "",
    cedula: "",
    metodoEntrega: "",
    agencia: "",
  });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width <= 600) setSize(50);
      else if (width <= 1024) setSize(60);
      else setSize(75);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleNext = async () => {
    if (!cartItems.length) return alert("Agrega al menos un producto al carrito");

    const requiredFields = ["name", "email", "phone"];
    if (shippingData.metodoEntrega === "domicilio") {
      requiredFields.push("address", "city", "departamento");
    } else if (shippingData.metodoEntrega === "dac") {
      requiredFields.push("agencia");
    }

    for (let key of requiredFields) {
      if (!shippingData[key]) return alert(`Completa el campo ${key}`);
    }

    try {
      for (let product of cartItems) {
        const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
        if (isNaN(price)) continue;

        const prefRes = await axios.post("http://localhost:3001/api/create_preference", {
          title: product.title,
          unit_price: price,
          quantity: 1,
        });

        const { init_point } = prefRes.data;
        if (init_point) window.open(init_point, "_blank");

        await axios.post("http://localhost:3001/api/order", {
          product,
          shipping: shippingData,
        });
      }

      alert("Pedido procesado correctamente");
      setCartItems([]);
      setShowShippingForm(false);
    } catch (err) {
      console.error(err);
      alert("Hubo un problema al procesar tu pedido.");
    }
  };

  return (
    <>
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
        onClick={() => setShowShippingForm(true)}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      <AnimatePresence>
        {showShippingForm && (
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
                maxWidth: "800px",
                position: "relative",
                fontSize: "1rem",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <button
                onClick={() => setShowShippingForm(false)}
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
                Datos de Envío
              </h3>
              <div style={{ marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {cartItems.length ? (
                  cartItems.map((item) => (
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
                        <p style={{ margin: 0, color: "#555" }}>{item.price}</p>
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
                  ))
                ) : (
                  <p>El carrito está vacío</p>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem 2rem", marginBottom: "2rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "600" }}>Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={shippingData.name}
                    onChange={handleShippingChange}
                    placeholder="Ej: Juan Pérez"
                    style={{ padding: "0.6rem", fontSize: "1rem", width: "94%", border: "1px solid #ccc", borderRadius: "6px" }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "600" }}>Cédula</label>
                  <input
                    type="text"
                    name="cedula"
                    value={shippingData.cedula || ""}
                    onChange={handleShippingChange}
                    placeholder="Ej: 5555555-5"
                    style={{ padding: "0.6rem", fontSize: "1rem", width: "94%", border: "1px solid #ccc", borderRadius: "6px" }}
                    required
                  />
                </div>

                {(shippingData.metodoEntrega === "domicilio" || shippingData.metodoEntrega === "dac") && (
                  <div style={{ gridColumn: "span 2" }}>
                    <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "600" }}>Dirección</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingData.address}
                      onChange={handleShippingChange}
                      placeholder="Ej: Av. Principal 123"
                      style={{ padding: "0.6rem", fontSize: "1rem", width: "97%", border: "1px solid #ccc", borderRadius: "6px" }}
                      required
                    />
                  </div>
                )}

                {shippingData.metodoEntrega === "domicilio" && (
                  <>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "600" }}>Departamento</label>
                      <input
                        type="text"
                        name="departamento"
                        value={shippingData.departamento || ""}
                        onChange={handleShippingChange}
                        placeholder="Ej: Montevideo"
                        style={{ padding: "0.6rem", fontSize: "1rem", width: "94%", border: "1px solid #ccc", borderRadius: "6px" }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "600" }}>Ciudad</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingData.city}
                        onChange={handleShippingChange}
                        placeholder="Ej: Montevideo"
                        style={{ padding: "0.6rem", fontSize: "1rem", width: "94%", border: "1px solid #ccc", borderRadius: "6px" }}
                        required
                      />
                    </div>
                  </>
                )}

                <div>
                  <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "600" }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingData.email}
                    onChange={handleShippingChange}
                    placeholder="Ej: juan@email.com"
                    style={{ padding: "0.6rem", fontSize: "1rem", width: "94%", border: "1px solid #ccc", borderRadius: "6px" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "600" }}>Teléfono</label>
                  <input
                    type="text"
                    name="phone"
                    value={shippingData.phone}
                    onChange={handleShippingChange}
                    placeholder="Ej: 099123456"
                    style={{ padding: "0.6rem", fontSize: "1rem", width: "94%", border: "1px solid #ccc", borderRadius: "6px" }}
                    required
                  />
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Método de Entrega</h4>

                <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                  <label>
                    <input
                      type="radio"
                      name="metodoEntrega"
                      value="dac"
                      checked={shippingData.metodoEntrega === "dac"}
                      onChange={handleShippingChange}
                    />{" "}
                    Agencia DAC
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="metodoEntrega"
                      value="domicilio"
                      checked={shippingData.metodoEntrega === "domicilio"}
                      onChange={handleShippingChange}
                    />{" "}
                    Entrega a domicilio
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="metodoEntrega"
                      value="local"
                      checked={shippingData.metodoEntrega === "local"}
                      onChange={handleShippingChange}
                    />{" "}
                    Retiro en local
                  </label>
                </div>

                {shippingData.metodoEntrega === "dac" && (
                  <div>
                    <label style={{ display: "block", marginBottom: "0.3rem", fontWeight: "600" }}>
                      Seleccione Agencia
                    </label>
                    <select
                      name="agencia"
                      value={shippingData.agencia || ""}
                      onChange={handleShippingChange}
                      style={{ width: "100%", padding: "0.6rem", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "6px" }}
                      required
                    >
                      <option value="">Selecciona una agencia</option>
                      <option value="Montevideo">Montevideo</option>
                      <option value="Canelones">Canelones</option>
                      <option value="Maldonado">Maldonado</option>
                      <option value="Paysandú">Paysandú</option>
                      <option value="Salto">Salto</option>
                    </select>
                    <p style={{ color: "#a00", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                      El costo del envío será abonado por el cliente al momento de la entrega
                    </p>
                  </div>
                )}

                {shippingData.metodoEntrega === "domicilio" && (
                  <p style={{ color: "#a00", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                    El costo del envío será abonado por el cliente al momento de la entrega
                  </p>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
                {(shippingData.metodoEntrega === "dac" || shippingData.metodoEntrega === "domicilio") && (
                  <button
                    onClick={() =>
                      window.open("https://www.dac.com.uy/tarifas?gad_source=1&gad_campaignid=20671149744", "_blank")
                    }
                    style={{
                      padding: "0.7rem 1.5rem",
                      backgroundColor: "#D5312D",
                      color: "white",
                      fontWeight: "600",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "1rem",
                    }}
                  >
                    Tarifas
                  </button>
                )}

                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    onClick={() => setShowShippingForm(false)}
                    style={{
                      padding: "0.7rem 1.5rem",
                      fontWeight: "600",
                      backgroundColor: "#6c757d",
                      color: "white",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1rem",
                    }}
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={handleNext}
                    style={{
                      padding: "0.7rem 1.5rem",
                      fontWeight: "600",
                      backgroundColor: "#28a745",
                      color: "white",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1rem",
                    }}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;





