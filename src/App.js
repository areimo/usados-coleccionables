import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect,useState } from "react";
import axios from 'axios';
import logo from './logo.png';
import shop from './shop.png';
import buyicon from './buyicon.png';
import phone from './phone.png';
import facebook from './facebook.png';
import email from './email.png';
import xbox360logo from './xbox360logo.png';
import pslogo from './playsation.png';
import nintendologo from './nintendo.png';
import joystick from './joystick.png';
import aciixbox360 from './aciixbox360.jpg';
import avcable from './avcable.jpg';
import bacxbox360 from './bacxbox360.jpg';
import battlefield4ps3 from './battlefield4ps3.jpg';
import crysis2ps3 from './crysis2ps3.jpg';
import f12011xbox360 from './f12011xbox360.jpg';
import fifasoccer12ps3 from './fifasoccer12ps3.jpg';
import kinnectsportsxbox360 from './kinnectsportsxbox360.jpg';
import ndsgames from './ndsgames.jpg';
import ps2wpendrive from './ps2wpendrive.jpg';
import socomps2 from './socomps2.jpg';
import tloups3 from './tloups3.jpg';
import uncharted2ps3 from './uncharted2ps3.jpg';
import xbox360 from './xbox360.jpg';
import xbox360controller from './xbox360controller.jpg';
import psp from './psp.jpg';
import skatexbox360 from './skatexbox360.jpg';
import wii from './wii.jpg';
import nscharger from './nscharger.jpg';
import f1poleposition64 from './f1poleposition64.jpg';
import fifa64 from './fifa64.jpg';
import gtavps3 from './gtavps3.jpg';
import pes2012ps3 from './pes2012ps3.jpg';
import pes2014ps3 from './pes2014ps3.jpg';


import './App.css';
import AutoSlider from './slider.jsx';
import WppContact from './wppContact.jsx';
import { SecondSlider } from './secondslider.jsx';


import { initMercadoPago} from '@mercadopago/sdk-react';

initMercadoPago("APP_USR-06e452ab-7538-4209-ab30-a16b5ea4760b", {
  locale: "es-UY",
});


function App() {
  const [page, setPage] = useState("home");
  const [searchText, setSearchText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [, setUsers] = useState([]);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [shippingData, setShippingData] = useState({
  name: "",
  address: "",
  city: "",
  email: "",
  phone: "",
});

const BACKEND_URL = "https://usados-coleccionables.onrender.com";

const handleNext = async () => {
  if (!selectedProduct) return alert("Selecciona un producto primero");
  for (let key of ["name", "address", "city", "email", "phone"]) {
    if (!shippingData[key]) return alert(`Completa el campo ${key}`);
  }

  try {
    const price = parseFloat(selectedProduct.price.replace(/[^0-9.-]+/g, ""));
    if (isNaN(price)) return alert("Precio inválido");

    const prefRes = await axios.post(`${BACKEND_URL}/api/create_preference`, {
      title: selectedProduct.title,
      unit_price: price,
      quantity: 1,
    });

    const { preferenceId } = prefRes.data;
    if (!preferenceId) return alert("No se pudo generar la preferencia");

    const mp = new window.MercadoPago("APP_USR-06e452ab-7538-4209-ab30-a16b5ea4760b", {
      locale: "es-UY",
    });

    mp.checkout({ preference: { id: preferenceId }, autoOpen: true });

    await axios.post(`${BACKEND_URL}/api/order`, {
      product: selectedProduct,
      shipping: shippingData,
    });

    alert("Pedido procesado correctamente"); // opcional

  } catch (err) {
    console.error(err);
    alert("Hubo un problema al procesar tu pedido.");
  }
};



  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Estilos
  const headerStyle = (bg) => ({
    backgroundColor: bg,
    width: "11.2rem",
    height: "4.125rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: "calc(0.75rem + 2vmin)",
    color: "white",
    padding: "0 1.25rem",
    cursor: "pointer",
    borderRadius: "0.3125rem",
    boxShadow: "0 0.3125rem 0.3125rem rgba(0, 0, 0, 0.2)",
  });

  const logoStyle = { marginRight: "10px", height: "5vmin", pointerEvents: "none" };

  const ConsoleHeaders = () => (
    <div
      style={{
        marginTop: "3.2rem",
        display: "flex",
        flexDirection: "row",
        gap: "1.5rem",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: "1rem",
      }}
    >
      <header style={headerStyle("#182580")} onClick={() => setPage("ps3")}>
        <img src={pslogo} alt="pslogo" style={logoStyle} />
        <h6>PLAYSTATION 3</h6>
      </header>
      <header style={headerStyle("#182580")} onClick={() => setPage("ps2")}>
        <img src={pslogo} alt="pslogo" style={logoStyle} />
        <h6>PLAYSTATION 2</h6>
      </header>
      <header style={headerStyle("green")} onClick={() => setPage("xbox360")}>
        <img src={xbox360logo} alt="xbox360logo" style={logoStyle} />
        <h6>XBOX 360</h6>
      </header>
      <header style={headerStyle("#EA473B")} onClick={() => setPage("nintendo")}>
        <img src={nintendologo} alt="nintendologo" style={logoStyle} />
        <h6>NINTENDO</h6>
      </header>
      <header style={headerStyle("#4B5060")} onClick={() => setPage("otros")}>
        <img src={joystick} alt="joystick" style={logoStyle} />
        <h6>Otros Productos</h6>
      </header>
    </div>
  );

  function ProductCard({ product, onBuyClick }) {
    return (
      <div
        className="product-card"
        style={{
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "1rem",
          marginTop: "1rem",
          width: "220px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "200px", height: "200px", borderRadius: "5px" }}
        />
        <h5 style={{ marginTop: "0.5rem", textAlign: "left" }}>{product.title}</h5>
        <h5 style={{ color: "#00aa00", fontWeight: "bold" }}>{product.price}</h5>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBuyClick(product);
          }}
          style={{
            marginTop: "0.5rem",
            backgroundColor: "#28a745",
            color: "white",
            padding: "0.5rem 1rem",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={buyicon}
            alt="shop"
            style={{ width: "20px", height: "20px", marginRight: "0.5rem" }}
          />
          Comprar
        </button>
      </div>
    );
  }

const featuredProducts = [
    { id: 1, image: gtavps3, title: "GTA V PS3", price: "$1000", description: "Grand Theft Auto V es un juego de acción y aventura en mundo abierto que ofrece una experiencia inmersiva en Los Santos."},
    { id: 2, image: battlefield4ps3, title: "Battlefield 4 PS3", price: "$1800", description: "Un juego de disparos en primera persona que ofrece una experiencia de combate multijugador intensa." },
    { id: 3, image: crysis2ps3, title: "Crysis 2 PS3", price: "$1800", description: "Un juego de disparos en primera persona que combina acción y ciencia ficción en un mundo abierto." },
    { id: 4, image: tloups3, title: "T.L.O.U PS3", price: "$2500", description: "The Last of Us es un juego de acción y aventura que narra la historia de supervivencia en un mundo post-apocalíptico." },
    { id: 5, image: uncharted2ps3, title: "UNCHARTED 2 PS3", price: "$900", description: "Uncharted 2 es un juego de acción y aventura en tercera persona que sigue las aventuras del cazador de tesoros Nathan Drake." },
    { id: 6, image: fifasoccer12ps3, title: "FIFA SOCCER 12 PS3", price: "$800", description: "FIFA Soccer 12 es un juego de simulación de fútbol que ofrece una experiencia realista con equipos y jugadores licenciados." },
    { id: 8, image: ps2wpendrive, title: "PS2 CON PENDRIVE", price: "$3000", description: "PlayStation 2 con un pendrive que contiene una colección de juegos preinstalados." },
    { id: 9, image: socomps2, title: "SOCOM PS2", price: "$1800", description: "SOCOM es un juego de disparos táctico en tercera persona que ofrece una experiencia de combate militar." },
    { id: 10, image: xbox360, title: "XBOX360", price: "$5.000", description: "Xbox 360, una consola de videojuegos de séptima generación con una amplia gama de juegos y servicios en línea." },
    { id: 11, image: xbox360controller, title: "MANDO XBOX360 INALÁMBRICO", price: "$900", description: "Controlador inalámbrico para Xbox 360, ideal para una experiencia de juego sin cables." },
    { id: 12, image: pes2012ps3, title: "PES 2012 PS3", price: "$500", description: "Pro Evolution Soccer 2012 es un juego de simulación de fútbol que ofrece una experiencia realista con equipos y jugadores licenciados." },
    { id: 13, image: aciixbox360, title: "Assassin's Creed II XBOX360", price: "$1000", description: "Assassin's Creed II es un juego de acción y aventura en tercera persona que sigue las aventuras de Ezio Auditore." },
    { id: 14, image: bacxbox360, title: "Batman Arkham City XBOX360", price: "$800", description: "Batman Arkham City es un juego de acción y aventura en tercera persona que ofrece una experiencia inmersiva en el universo de Batman." },
    { id: 15, image: f12011xbox360, title: "F1 2011 XBOX360", price: "$1.200", description: "F1 2011 es un juego de simulación de carreras que ofrece una experiencia realista de la Fórmula 1." },
    { id: 16, image: pes2014ps3, title: "PES 2014 PS3", price: "$500", description: "Pro Evolution Soccer 2014 es un juego de simulación de fútbol que ofrece una experiencia realista con equipos y jugadores licenciados." },
    { id: 17, image: kinnectsportsxbox360, title: "Kinnect Sports 360 XBOX360", price: "$400", description: "Kinect Sports es un juego de deportes que utiliza la tecnología Kinect para ofrecer una experiencia de juego interactiva." },
    { id: 18, image: skatexbox360, title: "SKATE XBOX360", price: "$1000", description: "Skate es un juego de deportes que ofrece una experiencia realista de patinaje en monopatín." },
    { id: 19, image: avcable, title: "Cable AV", price: "$500", description: "Cable AV para conectar tu consola a la televisión y disfrutar de tus juegos en alta calidad." },
    { id: 20, image: ndsgames, title: "JUEGOS Nintendo DS", price: "$350", description: "Una colección de juegos para Nintendo DS, ideal para los amantes de las aventuras portátiles." },
    { id: 21, image: f1poleposition64, title: "F1 POLE POSITION N64", price: "$700", description: "F1 Pole Position es un juego de carreras de Fórmula 1 para Nintendo 64 que ofrece una experiencia de conducción realista." },
    { id: 22, image: psp, title: "PSP", price: "$6000", description: "PlayStation Portable (PSP), una consola portátil de videojuegos con una amplia biblioteca de juegos." },
    { id: 23, image: fifa64, title: "FIFA 64", price: "$700", description: "FIFA 64 es un juego de simulación de fútbol para Nintendo 64 que ofrece una experiencia de juego clásica con equipos y jugadores de la época." },
    { id: 25, image: nscharger, title: "CARGADOR NINTENDO SWITCH", price: "$800", description: "Cargador para Nintendo Switch, ideal para mantener tu consola siempre lista para jugar." },
    { id: 26, image: wii, title: "WII", price: "$4000", description: "Nintendo Wii, una consola de videojuegos que ofrece una experiencia de juego única con controles de movimiento." },
  ];

  const filteredProducts = featuredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setShowShippingForm(true);
    setPage("product");
  };

  return (
    <div className="App">
      {/* Header */}
      <div className="Header-container">
        <header
          className="App-header"
          onClick={() => setPage("home")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} className="App-logo" alt="logo" />
          <h6 style={{ marginLeft: "10px" }}>Usados Coleccionables</h6>
        </header>
        <header
          className="App-shop"
          onClick={() => setPage("shop")}
          style={{ cursor: "pointer" }}
        >
          <img src={shop} className="Shop-icon" alt="shop" />
          <h6 style={{ marginLeft: "10px" }}>Tienda</h6>
        </header>
      </div>

      <AnimatePresence>
        {/* Home */}
        {page === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <main className="App-main">
              <AutoSlider />
              <div className="App-info">
                <header className="App-about">
                  <h6>Sobre Nosotros</h6>
                </header>
                <p id="about">
                  Realizamos servicio técnico para PC y consolas (mantenimiento,
                  reparaciones, destrabas), también vendemos consolas y videojuegos
                  con envíos a todo el país. ¡No dudes en ponerte en contacto con nosotros!
                </p>
              </div>
            </main>
          </motion.div>
        )}

        {/* Shop */}
        {page === "shop" && (
          <motion.div
            key="shop"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <header className="App-products" style={{ textAlign: "center" }}>
              <h6>Productos Destacados</h6>
            </header>
            <SecondSlider />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <input
                type="text"
                placeholder="Buscar..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.9rem",
                  borderRadius: "0.25rem",
                  border: "1px solid #4B5060",
                  width: "350px",
                  height: "1.5rem",
                }}
              />
            </div>

            {searchText !== "" && (
              <motion.div
                key="search-results"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{ position: "relative", zIndex: 10, marginTop: "-1rem" }}
              >
                <div
                  className="product-container"
                  style={{ background: "white", padding: "1rem", borderRadius: "8px" }}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onBuyClick={handleBuyClick}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            <ConsoleHeaders />
          </motion.div>
        )}

        {/* Consolas */}
        {["ps3", "ps2", "xbox360", "nintendo", "otros"].includes(page) && (
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <ConsoleHeaders />
            <div className="product-container">
              {featuredProducts
                .filter((p) => {
                  if (page === "ps3") return p.title.includes("PS3");
                  if (page === "ps2") return p.title.includes("PS2");
                  if (page === "xbox360") return p.title.includes("XBOX360");
                  if (page === "nintendo")
                    return (
                      p.title.includes("NINTENDO") ||
                      p.title.includes("WII") ||
                      p.title.includes("DS") ||
                      p.title.includes("64")
                    );
                  if (page === "otros")
                    return (
                      !p.title.includes("PS3") &&
                      !p.title.includes("PS2") &&
                      !p.title.includes("XBOX360") &&
                      !p.title.includes("NINTENDO") &&
                      !p.title.includes("WII") &&
                      !p.title.includes("DS") &&
                      !p.title.includes("64")
                    );
                  return false;
                })
                .map((product) => (
                  <ProductCard key={product.id} product={product} onBuyClick={handleBuyClick} />
                ))}
            </div>
          </motion.div>
        )}

        {/* Producto */}
{page === "product" && selectedProduct && (
  <motion.div
    key="product"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.5 }}
  >
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <img
        src={selectedProduct.image}
        alt={selectedProduct.title}
        style={{ width: "400px", height: "300px", borderRadius: "5px" }}
      />
      <h2>{selectedProduct.title}</h2>
      <h3 style={{ color: "#00aa00" }}>{selectedProduct.price}</h3>
      <p style={{ marginTop: "1rem" }}>{selectedProduct.description}</p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2.5rem",
        }}
      >
        <button
          onClick={()=>handleBuyClick(selectedProduct)}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem 1rem",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#28a745",
            color: "white",
            borderRadius: "5px",
            border: "none",
            boxShadow: "0 0.3125rem 0.3125rem rgba(0, 0, 0, 0.2)",
          }}
        >
          <img
            src={buyicon}
            alt="shop"
            style={{ width: "24px", height: "24px", marginRight: "0.5rem" }}
          />
          Comprar
        </button>

        <button
          onClick={() => setPage("shop")}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#4B5060",
            color: "white",
            borderRadius: "5px",
            border: "none",
            boxShadow: "0 0.3125rem 0.3125rem rgba(0, 0, 0, 0.2)",
          }}
        >
          Cancelar
        </button>
      </div>
    </div>

{/* Overlay del formulario de envío */}
{showShippingForm && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "400px",
        position: "relative",
        fontSize: "1rem",
      }}
    >
      <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>Datos de Envío</h3>

      {/* Inputs compactos con separación moderada */}
      {["name", "address", "city","email", "phone"].map((field) => (
        <input
          key={field}
          type={field === "email" ? "email" : "text"}
          name={field}
          placeholder={
            field === "name"
              ? "Nombre"
              : field === "address"
              ? "Dirección"
              : field === "city"
              ? "Ciudad"
              : field === "email"
              ? "Email"
              : "Teléfono"
          }
          value={shippingData[field]}
          onChange={handleShippingChange}
          style={{
            width: "90%",
            marginBottom: "1rem",
            padding: "0.1rem",
            fontSize: "1rem",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          required
        />
      ))}

      {/* Botones */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
        <button
          onClick={() => setShowShippingForm(false)}
          style={{
            padding: "0.5rem 1rem",
            fontWeight: "bold",
            backgroundColor: "#4B5060",
            color: "white",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Volver
        </button>

        <button
          onClick={handleNext}
          style={{
            padding: "0.5rem 1rem",
            fontWeight: "bold",
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
  </div>
)}

  </motion.div>
)}

        {/* Footer */}
        <motion.div
          key="footer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          <footer className="App-footer">
            <header className="App-contact">
              <h6>Contacto</h6>
            </header>
            <div className="Contact-container">
              <div className="Contact-line">
                <img src={phone} alt="phone" className="Phone-icon" />
                <p id="phone-number">099284003</p>
              </div>
              <div className="Contact-line">
                <img src={facebook} alt="facebook" className="Facebook-icon" />
                <a
                  href="https://www.facebook.com/profile.php?id=100089359691225"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                >
                  Usados Coleccionables
                </a>
              </div>
              <div className="Contact-line">
                <img src={email} alt="email" className="Email-icon" />
                <p id="email-contact">usadoscoleccionables25@gmail.com</p>
              </div>
            </div>
          </footer>
        </motion.div>
      </AnimatePresence>

      <WppContact />
    </div>
  );
}

export default App;