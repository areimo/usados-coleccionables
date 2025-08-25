import React, { useState, useEffect } from "react";
import axios from "axios";
import { initMercadoPago, createCardToken } from "@mercadopago/sdk-react";

export default function CheckoutForm({ selectedProduct, shippingData, show, setShow }) {
  const [loading, setLoading] = useState(false);
  const transactionAmount = parseFloat(selectedProduct.price.replace(/[^0-9.-]+/g, ""));
import React, { useEffect, useState } from "react";
import { initMercadoPago, CardNumber, ExpirationDate, SecurityCode } from "@mercadopago/sdk-react";

export default function CheckoutForm({ selectedProduct }) {
  const [mp, setMp] = useState(null);
  const [ready, setReady] = useState(false);

  // Inicializar Mercado Pago de forma asíncrona
  useEffect(() => {
    async function initialize() {
      const mpInstance = await initMercadoPago(
        "APP_USR-06e452ab-7538-4209-ab30-a16b5ea4760b",
        { locale: "es-UY" }
      );
      setMp(mpInstance);
      setReady(true);
    }
    initialize();
  }, []);

  if (!show) return null;
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!ready || !mp) return alert("Mercado Pago aún no está inicializado");

    try {
      const form = e.target;

      const cardData = {
        cardNumber: form.cardNumber.value,
        cardholderName: form.cardholderName.value,
        identificationType: "CI",
        identificationNumber: shippingData.cedula,
        expirationMonth: form.expirationMonth.value,
        expirationYear: form.expirationYear.value,
        securityCode: form.securityCode.value,
      };

      const tokenResponse = await createCardToken(mp, cardData);
      const token = tokenResponse.id;

      const body = {
        token,
        transactionAmount,
        description: selectedProduct.title,
        installments: 1,
        paymentMethodId: "visa",
        issuer: "issuer_id",
        email: shippingData.email,
        identificationType: "CI",
        identificationNumber: shippingData.cedula,
      };

      const res = await axios.post("http://localhost:3001/api/create_payment", body);

      console.log("Pago exitoso:", res.data);
      alert(`Pago realizado correctamente! Estado: ${res.data.status}`);
      setShow(false);

    } catch (err) {
      console.error("Error procesando el pago:", err.response?.data || err);
      alert("Error al procesar el pago. Revisa la consola para más detalles.");
    }
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
          borderRadius: "12px",
          width: "95%",
          maxWidth: "800px",
          fontSize: "1rem",
          position: "relative",
        }}
      >
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

        <h3 style={{ fontSize: "1.6rem", marginBottom: "1.5rem", textAlign: "center" }}>
          Datos de Pago
        </h3>

        {!ready && <p style={{ textAlign: "center" }}>Cargando formulario de pago...</p>}

        {ready && (
          <form onSubmit={handlePayment}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem 2rem",
                marginBottom: "2rem",
              }}
            >
              <div>
                <label>Titular</label>
                <input type="text" name="cardholderName" placeholder="Titular de la tarjeta" required style={{ width: "100%", padding: "0.6rem", borderRadius: "6px" }} />
              </div>
              <div>
                <label>Email</label>
                <input type="email" name="cardholderEmail" placeholder="E-mail" required style={{ width: "100%", padding: "0.6rem", borderRadius: "6px" }} />
              </div>
              <div>
                <label>Número de tarjeta</label>
                <input type="text" name="cardNumber" placeholder="0000 0000 0000 0000" required style={{ width: "100%", padding: "0.6rem", borderRadius: "6px" }} />
              </div>
              <div>
                <label>Mes</label>
                <input type="text" name="expirationMonth" placeholder="MM" required style={{ width: "100%", padding: "0.6rem", borderRadius: "6px" }} />
              </div>
              <div>
                <label>Año</label>
                <input type="text" name="expirationYear" placeholder="YYYY" required style={{ width: "100%", padding: "0.6rem", borderRadius: "6px" }} />
              </div>
              <div>
                <label>CVV</label>
                <input type="text" name="securityCode" placeholder="CVV" required style={{ width: "100%", padding: "0.6rem", borderRadius: "6px" }} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <button type="button" onClick={() => setShow(false)} style={{ padding: "0.7rem 1.5rem", backgroundColor: "#6c757d", color: "#fff", borderRadius: "5px", border: "none" }}>Cancelar</button>
              <button type="submit" style={{ padding: "0.7rem 1.5rem", backgroundColor: "#28a745", color: "#fff", borderRadius: "5px", border: "none" }}>Pagar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}








