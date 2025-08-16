// index.js
import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";
import nodemailer from "nodemailer";
import 'dotenv/config'; // para leer variables de entorno desde .env

// Configurar MercadoPago
if (!process.env.MP_ACCESS_TOKEN) {
  console.error("Error: MP_ACCESS_TOKEN no está definido en las variables de entorno.");
  process.exit(1);
}

mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);


const app = express();

// Configurar CORS
app.use(cors({
  origin: ["https://areimo.github.io", "http://localhost:3000"], 
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Configurar Nodemailer
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("Error: EMAIL_USER o EMAIL_PASS no están definidos.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

// Ruta para crear preferencia de MercadoPago
app.post("/api/create_preference", async (req, res) => {
  const { title, unit_price, quantity } = req.body;

  const preference = {
    items: [{ title, unit_price, quantity }],
    back_urls: {
      success: "https://areimo.github.io/usados-coleccionables/success",
      failure: "https://areimo.github.io/usados-coleccionables/failure",
      pending: "https://areimo.github.io/usados-coleccionables/pending",
    },
    auto_return: "approved",
  };

  try {
    // Crear la preferencia usando mercadopago directamente
    const response = await mercadopago.preferences.create(preference);

    res.json({ preferenceId: response.body.id });
  } catch (err) {
    console.error("Error creando preferencia:", err);
    res.status(500).json({ error: "Error creando la preferencia" });
  }
});

// Ruta para recibir pedido y enviar correo
app.post("/api/order", async (req, res) => {
  const { product, shipping } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: [process.env.EMAIL_USER, shipping.email],
    subject: `Nuevo pedido: ${product.title}`,
    html: `
      <h3>Nuevo pedido recibido</h3>
      <p><strong>Producto:</strong> ${product.title}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Cantidad:</strong> 1</p>
      <h4>Datos de envío</h4>
      <p><strong>Nombre:</strong> ${shipping.name}</p>
      <p><strong>Dirección:</strong> ${shipping.address}</p>
      <p><strong>Ciudad:</strong> ${shipping.city}</p>
      <p><strong>Teléfono:</strong> ${shipping.phone}</p>
      <p><strong>Email:</strong> ${shipping.email}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Pedido recibido y correos enviados" });
  } catch (err) {
    console.error("Error enviando correo:", err);
    res.status(500).json({ error: "Error enviando correo" });
  }
});

// Arrancar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









