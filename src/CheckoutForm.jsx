import React, { useState } from "react";

export default function CheckoutForm({ selectedProduct, shippingData, show, setShow }) {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  if (!show) return null;

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Datos enviados:", {
        cardNumber,
        expirationDate,
        cvv,
        product: selectedProduct,
      });
      alert("Formulario enviado con éxito ✅");
      setShow(false);
    } catch (err) {
      console.error(err);
      alert("Error procesando el pago ❌");
    }

    setLoading(false);
  };

  const handleOnlyNumbers = (e, setter, maxLength) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    setter(value);
  };

  const handleExpiration = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setExpirationDate(value.slice(0, 5));
  };

  return (
    <div
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
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "16px",
          width: "95%",
          maxWidth: "400px",
          fontSize: "1rem",
          position: "relative",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={() => setShow(false)}
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

        <h3
          style={{
            fontSize: "1.6rem",
            marginBottom: "1.5rem",
            textAlign: "center",
            color: "#222",
          }}
        >
          Datos de Tarjeta
        </h3>

        {/* FORM */}
        <form
          onSubmit={handlePayment}
          style={{
            display: "flex",
            flexDirection: "column", 
            gap: "1.2rem",
          }}
        >
          {/* Número tarjeta */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label>Número de tarjeta</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => handleOnlyNumbers(e, setCardNumber, 16)}
              placeholder="0000 0000 0000 0000"
              required
              style={inputStyle}
            />
          </div>

          {/* Exp */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label>Vencimiento</label>
            <input
              type="text"
              value={expirationDate}
              onChange={handleExpiration}
              placeholder="MM/YY"
              required
              style={inputStyle}
            />
          </div>

          {/* CVV */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <label>CVV</label>
            <input
              type="password"
              value={cvv}
              onChange={(e) => handleOnlyNumbers(e, setCvv, 4)}
              placeholder="CVV"
              required
              style={inputStyle}
            />
          </div>

          {/* Botones */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              marginTop: "1rem",
              width: "100%",
            }}
          >
            <button
              type="button"
              onClick={() => setShow(false)}
              style={{
                flex: 1,
                padding: "0.8rem 1.5rem",
                backgroundColor: "#6c757d",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: "0.8rem 1.5rem",
                backgroundColor: "#28a745",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {loading ? "Procesando..." : "Pagar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Estilo común de inputs
const inputStyle = {
  width: "95%",       
  padding: "0.5rem",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "0.9rem",
};



























