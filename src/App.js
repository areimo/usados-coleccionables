import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect,useState } from "react";
import axios from 'axios';
import logo from './logo.png';
import shop from './shop.png';
import phone from './phone.png';
import facebook from './facebook.png';
import xbox360logo from './xbox360logo.png';
import pslogo from './playsation.png';
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
import ps2 from './ps2.jpg';
import ps2wpendrive from './ps2wpendrive.jpg';
import socomps2 from './socomps2.jpg';
import tloups3 from './tloups3.jpg';
import uncharted2ps3 from './uncharted2ps3.jpg';
import xbox360 from './xbox360.jpg';
import xbox360controller from './xbox360controller.jpg';
import psp from './psp.jpg'
import skatexbox360 from './skatexbox360.jpg'

import './App.css';
import AutoSlider from './slider.jsx';
import WppContact from './wppContact.jsx';
import { SecondSlider } from './secondslider.jsx';


function App() {
  const [page, setPage] = useState("home");
  const [searchText, setSearchText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const featuredProducts = [
    { id: 2, image: battlefield4ps3, title: "Battlefield 4 PS3", price: "$1.800", description: "Un juego de disparos en primera persona que ofrece una experiencia de combate multijugador intensa." },
    { id: 3, image: crysis2ps3, title: "Crysis 2 PS3", price: "$1.800", description: "Un juego de disparos en primera persona que combina acción y ciencia ficción en un mundo abierto." },
    { id: 4, image: tloups3, title: "T.L.O.U PS3", price: "$2.500", description: "The Last of Us es un juego de acción y aventura que narra la historia de supervivencia en un mundo post-apocalíptico." },
    { id: 5, image: uncharted2ps3, title: "UNCHARTED 2 PS3", price: "$900", description: "Uncharted 2 es un juego de acción y aventura en tercera persona que sigue las aventuras del cazador de tesoros Nathan Drake." },
    { id: 6, image: fifasoccer12ps3, title: "FIFA SOCCER 12 PS3", price: "$800", description: "FIFA Soccer 12 es un juego de simulación de fútbol que ofrece una experiencia realista con equipos y jugadores licenciados." },
    { id: 7, image: ps2, title: "PS2", price: "$3.500", description: "PlayStation 2, una de las consolas más icónicas de la historia, con una vasta biblioteca de juegos." },
    { id: 8, image: ps2wpendrive, title: "PS2 CON PENDRIVE", price: "$3.000", description: "PlayStation 2 con un pendrive que contiene una colección de juegos preinstalados." },
    { id: 9, image: socomps2, title: "SOCOM PS2", price: "$1.800", description: "SOCOM es un juego de disparos táctico en tercera persona que ofrece una experiencia de combate militar." },
    { id: 10, image: xbox360, title: "XBOX360", price: "$5.000", description: "Xbox 360, una consola de videojuegos de séptima generación con una amplia gama de juegos y servicios en línea." },
    { id: 11, image: xbox360controller, title: "MANDO XBOX360 INALÁMBRICO", price: "$900", description: "Controlador inalámbrico para Xbox 360, ideal para una experiencia de juego sin cables." },
    { id: 13, image: aciixbox360, title: "Assassin's Creed II XBOX360", price: "$1.000", description: "Assassin's Creed II es un juego de acción y aventura en tercera persona que sigue las aventuras de Ezio Auditore." },
    { id: 14, image: bacxbox360, title: "Batman Arkham City XBOX360", price: "$800", description: "Batman Arkham City es un juego de acción y aventura en tercera persona que ofrece una experiencia inmersiva en el universo de Batman." },
    { id: 15, image: f12011xbox360, title: "F1 2011 XBOX360", price: "$1.200", description: "F1 2011 es un juego de simulación de carreras que ofrece una experiencia realista de la Fórmula 1." },
    { id: 17, image: kinnectsportsxbox360, title: "Kinnect Sports 360 XBOX360", price: "$400", description: "Kinect Sports es un juego de deportes que utiliza la tecnología Kinect para ofrecer una experiencia de juego interactiva." },
    { id: 18, image: skatexbox360, title: "SKATE XBOX360", price: "$1.000", description: "Skate es un juego de deportes que ofrece una experiencia realista de patinaje en monopatín." },
    { id: 19, image: avcable, title: "Cable AV", price: "$500", description: "Cable AV para conectar tu consola a la televisión y disfrutar de tus juegos en alta calidad." },
    { id: 20, image: ndsgames, title: "JUEGOS Nintendo DS", price: "$350", description: "Una colección de juegos para Nintendo DS, ideal para los amantes de las aventuras portátiles." },
    { id: 22, image: psp, title: "PSP", price: "$6.000", description: "PlayStation Portable (PSP), una consola portátil de videojuegos con una amplia biblioteca de juegos." },
  ];

  const filteredProducts = featuredProducts.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const ConsoleHeaders = () => (
    <div style={{ marginTop: "3.2rem", display: "flex", flexDirection: "row", gap: "1.5rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
      <header style={headerStyle("#182580")} onClick={() => setPage("ps3")}><img src={pslogo} alt="pslogo" style={logoStyle} /><h6>PLAYSTATION 3</h6></header>
      <header style={headerStyle("#182580")} onClick={() => setPage("ps2")}><img src={pslogo} alt="pslogo" style={logoStyle} /><h6>PLAYSTATION 2</h6></header>
      <header style={headerStyle("green")} onClick={() => setPage("xbox360")}><img src={xbox360logo} alt="xbox360logo" style={logoStyle} /><h6>XBOX 360</h6></header>
      <header style={headerStyle("#4B5060")} onClick={() => setPage("otros")}><img src={joystick} alt="joystick" style={logoStyle} /><h6>Otros Productos</h6></header>
    </div>
  );

  return (
    <div className="App">
      <div className="Header-container">
        <header className="App-header" onClick={() => setPage("home")} style={{ cursor: "pointer" }}><img src={logo} className="App-logo" alt="logo" /><h6 style={{ marginLeft: "10px" }}>Usados Coleccionables</h6></header>
        <header className="App-shop" onClick={() => setPage("shop")} style={{ cursor: "pointer" }}><img src={shop} className="Shop-icon" alt="shop" /><h6 style={{ marginLeft: "10px" }}>Tienda</h6></header>
      </div>

      <AnimatePresence mode="wait">
        {page === "home" && (
          <motion.div key="home" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <main className="App-main">
              <AutoSlider />
              <div className="App-info">
                <header className="App-about"><h6>Sobre Nosotros</h6></header>
                <p id="about">Realizamos servicio técnico para PC y consolas (mantenimiento, reparaciones, destrabas), también vendemos consolas y videojuegos con envíos a todo el país. ¡No dudes en ponerte en contacto con nosotros!</p>
                <header className="App-contact"><h6>Contacto</h6></header>
                <div className="Contact-line">
                  <img src={phone} alt="phone" className="Phone-icon" />
                  <p id="phone-number">099284003</p>
                  <img src={facebook} alt="facebook" className="Facebook-icon" />
                  <a href="https://www.facebook.com/profile.php?id=100089359691225" target="_blank" rel="noopener noreferrer">Usados Coleccionables</a>
                </div>
              </div>
            </main>
          </motion.div>
        )}

        {page === "shop" && (
          <motion.div key="shop" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <header className="App-products" style={{ textAlign: "center" }}><h6>Productos Destacados</h6></header>
            <SecondSlider />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem", marginBottom: "1rem" }}>
              <input type="text" placeholder="Buscar..." value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{ padding: "0.25rem 0.5rem", fontSize: "0.9rem", borderRadius: "0.25rem", border: "1px solid #4B5060", width: "350px", height: "1.5rem" }} />
            </div>
            <AnimatePresence>
              {searchText !== "" && (
                <motion.div key="search-results" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} style={{ position: "relative", zIndex: 10, marginTop: "-1rem" }}>
                  <div className="product-container" style={{ background: "white", padding: "1rem", borderRadius: "8px" }}>
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} onClick={(p) => { setSelectedProduct(p); setPage("product"); }} />
                    ))}
                  </div>
                  {/* User list (ONLY ONE --ROOT--) */}
                  <div style={{ marginTop: "2rem", textAlign: "center" }}>
                    <h2>USER ROOT</h2>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                     {users.map(user => (
                       <li key={user.id}>{user.nombre}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <ConsoleHeaders />
            <header className="App-contact"><h6>Contacto</h6></header>
            <div className="Contact-line"><img src={phone} alt="phone" className="Phone-icon" /><p id="phone-number">099284003</p><img src={facebook} alt="facebook" className="Facebook-icon" /><a href="https://www.facebook.com/profile.php?id=100089359691225" target="_blank" rel="noopener noreferrer">Usados Coleccionables</a></div>
          </motion.div>
        )}

        {["ps3", "ps2", "xbox360", "otros"].includes(page) && (
          <motion.div key={page} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <ConsoleHeaders />
            <div className="product-container">
              {featuredProducts
                .filter(p => {
                  if (page === "ps3") return p.title.includes("PS3");
                  if (page === "ps2") return p.title.includes("PS2");
                  if (page === "xbox360") return p.title.includes("XBOX360");
                  if (page === "otros") return !p.title.includes("PS3") && !p.title.includes("PS2") && !p.title.includes("XBOX360");
                  return false;
                })
                .map(product => (
                  <ProductCard key={product.id} product={product} onClick={(p) => { setSelectedProduct(p); setPage("product"); }} />
                ))}
            </div>
            <header className="App-contact"><h6>Contacto</h6></header>
            <div className="Contact-line"><img src={phone} alt="phone" className="Phone-icon" /><p id="phone-number">099284003</p><img src={facebook} alt="facebook" className="Facebook-icon" /><a href="https://www.facebook.com/profile.php?id=100089359691225" target="_blank" rel="noopener noreferrer">Usados Coleccionables</a></div>
          </motion.div>
        )}

{page === "product" && selectedProduct && (
  <motion.div
    key="product"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.5 }}
  >
    <div style={{ padding: "2rem" }}>
      <img
        src={selectedProduct.image}
        alt={selectedProduct.title}
        style={{ width: "400px", height: "300px", borderRadius: "5px", alignItems: "center", display: "block", margin: "0.5rem auto"   }}
      />
      <h2 style={{ textAlign: "center" }}>{selectedProduct.title}</h2>
      <h3 style={{ color: "#00aa00", textAlign:"center"}}>{selectedProduct.price}</h3>
      <p style={{ marginTop: "1rem", textAlign:"center" }}>{selectedProduct.description}</p>
      <button
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          marginTop: "2rem",
          padding: "0.5rem 1rem",
          fontSize: "20px",
          fontWeight: "bold",
          cursor: "pointer",
          backgroundColor: "#4B5060",
          color: "white",
          borderRadius: "5px",
          borderColor: "#4B5060",
          boxShadow: "0 0.3125rem 0.3125rem rgba(0, 0, 0, 0.2)"
        }}
        onClick={() => setPage("shop")}
      >
        Volver
      </button>
    </div>
    <header className="App-contact"><h6>Contacto</h6></header>
        <div className="Contact-line"><img src={phone} alt="phone" className="Phone-icon" /><p id="phone-number">099284003</p><img src={facebook} alt="facebook" className="Facebook-icon" /><a href="https://www.facebook.com/profile.php?id=100089359691225" target="_blank" rel="noopener noreferrer">Usados Coleccionables</a></div>
  </motion.div>
)}
      </AnimatePresence>

      <footer className="App-footer"><p id="footer">2025 @areimo on Github</p></footer>
      <WppContact />
    </div>
  );
}

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

function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={() => onClick(product)} style={{ cursor: "pointer" }}>
      <img src={product.image} alt={product.title} style={{ width: "200px", height: "200px", borderRadius: "5px", marginTop: "1.5625rem" }} />
      <h5 style={{ marginTop: "0.5rem", textAlign: "left" }}>{product.title}</h5>
      <h5 style={{ color: "#00aa00", fontWeight: "bold" }}>{product.price}</h5>
    </div>
  );
}

export default App;

