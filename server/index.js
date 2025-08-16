import express from "express";
import cors from "cors";
import MercadoPago from "mercadopago";
import nodemailer from "nodemailer";
import 'dotenv/config';

if (!process.env.MP_ACCESS_TOKEN) {
  console.error("MP_ACCESS_TOKEN no definido en .env");
  process.exit(1);
}

MercadoPago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("EMAIL_USER o EMAIL_PASS no definidos en .env");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

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
    const response = await MercadoPago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (err) {
    console.error("Error creando preferencia:", err);
    res.status(500).json({ error: "Error creando la preferencia" });
  }
});

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

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:3001`));












