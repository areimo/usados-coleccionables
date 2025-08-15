import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-6360533005994529-081019-faea839b6b0fca44b81c46a5fe3585e1-2616174485",
});

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/create_preference', async (req, res) => {
  try {
    const { title, unit_price, quantity } = req.body;

    const body = {
      items: [
        {
          title: title,
          unit_price: Number(unit_price),
          quantity: Number(quantity),
          currency_id: "UYU"
        },
      ],
      back_urls: {
        success: "https://areimo.github.io/usados-coleccionables/",
        failure: "https://areimo.github.io/usados-coleccionables/",
        pending: "https://areimo.github.io/usados-coleccionables/",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    res.json({ 
      id: result.id,
      init_point: result.init_point  // ← aquí el cambio
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating preference');
  }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
