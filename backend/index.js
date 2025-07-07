const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",            
  password: "1564",  
  database: "sys", 
});

db.connect(err => {
  if (err) {
    console.error("Error al conectar a la DB:", err);
    return;
  }
  console.log("Conexión a MySQL exitosa");
});

app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error en la consulta" });
      return;
    }
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log("Servidor backend escuchando en puerto 3001");
});
