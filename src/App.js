import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {useState } from "react";
import logo from './logo.png';
import shop from './shop.png';
import buyicon from './buyicon.png';
import phone from './phone.png';
import facebook from './facebook.png';
import email from './email.png';
import location from './location.png'
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
import Cart from './cart.jsx';


function App() {
  const [page, setPage] = useState("home");
  const [searchText, setSearchText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
    setSelectedProduct(product);
  };

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setPage("product");
  };

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
      <header style={{ backgroundColor: "#182580" }} onClick={() => setPage("ps3")} className="console-header">
        <img src={pslogo} alt="pslogo" style={logoStyle} />
        <h6>PLAYSTATION 3</h6>
      </header>
      <header style={{ backgroundColor: "#182580" }} onClick={() => setPage("ps2")} className="console-header">
        <img src={pslogo} alt="pslogo" style={logoStyle} />
        <h6>PLAYSTATION 2</h6>
      </header>
      <header style={{ backgroundColor: "green" }} onClick={() => setPage("xbox360")} className="console-header">
        <img src={xbox360logo} alt="xbox360logo" style={logoStyle} />
        <h6>XBOX 360</h6>
      </header>
      <header style={{ backgroundColor: "#EA473B" }} onClick={() => setPage("nintendo")} className="console-header">
        <img src={nintendologo} alt="nintendologo" style={logoStyle} />
        <h6>NINTENDO</h6>
      </header>
      <header style={{ backgroundColor: "#4B5060" }} onClick={() => setPage("otros")} className="console-header">
        <img src={joystick} alt="joystick" style={logoStyle} />
        <h6>Otros Productos</h6>
      </header>
    </div>
  );

  function ProductCard({ product, onBuyClick }) {
    return (
      <div className="product-card">
        <img src={product.image} alt={product.title} className="product-image" />
        <h5 style={{ marginTop: "0.5rem", textAlign: "left" }}>{product.title}</h5>
        <h5 style={{ color: "#00aa00", fontWeight: "bold", textAlign: "right" }}>{product.price}</h5>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBuyClick(product);
          }}
          className="buy-button"
        >
          <img src={buyicon} alt="shop" style={{ width: "20px", height: "20px", marginRight: "0.5rem" }} />
          Comprar
        </button>
      </div>
    );
  }

  const featuredProducts = [
    { id: 1, image: gtavps3, title: "GTA V PS3", price: 1000, description: "Grand Theft Auto V es un juego de acción y aventura en mundo abierto que ofrece una experiencia inmersiva en Los Santos."},
    { id: 2, image: battlefield4ps3, title: "Battlefield 4 PS3", price: 1800, description: "Un juego de disparos en primera persona que ofrece una experiencia de combate multijugador intensa." },
    { id: 3, image: crysis2ps3, title: "Crysis 2 PS3", price: 1800, description: "Un juego de disparos en primera persona que combina acción y ciencia ficción en un mundo abierto." },
    { id: 4, image: tloups3, title: "T.L.O.U PS3", price: 2500, description: "The Last of Us es un juego de acción y aventura que narra la historia de supervivencia en un mundo post-apocalíptico." },
    { id: 5, image: uncharted2ps3, title: "UNCHARTED 2 PS3", price: 900, description: "Uncharted 2 es un juego de acción y aventura en tercera persona que sigue las aventuras del cazador de tesoros Nathan Drake." },
    { id: 6, image: fifasoccer12ps3, title: "FIFA SOCCER 12 PS3", price: 800, description: "FIFA Soccer 12 es un juego de simulación de fútbol que ofrece una experiencia realista con equipos y jugadores licenciados." },
    { id: 8, image: ps2wpendrive, title: "PS2 CON PENDRIVE", price: 3000, description: "PlayStation 2 con un pendrive que contiene una colección de juegos preinstalados.", includes: "•Consola •Joystick original •Memorycard y Pendrive con juegos por $1000 adicionales •Cable AV original •Cable de conexión a la red eléctrica"},
    { id: 9, image: socomps2, title: "SOCOM PS2", price: 1800, description: "SOCOM es un juego de disparos táctico en tercera persona que ofrece una experiencia de combate militar." },
    { id: 10, image: xbox360, title: "XBOX360", price: 5000, description: "Xbox 360, una consola de videojuegos de séptima generación con una amplia gama de juegos y servicios en línea.", includes: "•Consola •Joystick •Memorycard" },
    { id: 11, image: xbox360controller, title: "MANDO XBOX360 INALÁMBRICO", price: 900, description: "Controlador inalámbrico para Xbox 360, ideal para una experiencia de juego sin cables." },
    { id: 12, image: pes2012ps3, title: "PES 2012 PS3", price: 500, description: "Pro Evolution Soccer 2012 es un juego de simulación de fútbol que ofrece una experiencia realista con equipos y jugadores licenciados." },
    { id: 13, image: aciixbox360, title: "Assassin's Creed II XBOX360", price: 1000, description: "Assassin's Creed II es un juego de acción y aventura en tercera persona que sigue las aventuras de Ezio Auditore." },
    { id: 14, image: bacxbox360, title: "Batman Arkham City XBOX360", price: 800, description: "Batman Arkham City es un juego de acción y aventura en tercera persona que ofrece una experiencia inmersiva en el universo de Batman." },
    { id: 15, image: f12011xbox360, title: "F1 2011 XBOX360", price: 1.200, description: "F1 2011 es un juego de simulación de carreras que ofrece una experiencia realista de la Fórmula 1." },
    { id: 16, image: pes2014ps3, title: "PES 2014 PS3", price: 500, description: "Pro Evolution Soccer 2014 es un juego de simulación de fútbol que ofrece una experiencia realista con equipos y jugadores licenciados." },
    { id: 17, image: kinnectsportsxbox360, title: "Kinnect Sports 360 XBOX360", price: 400, description: "Kinect Sports es un juego de deportes que utiliza la tecnología Kinect para ofrecer una experiencia de juego interactiva." },
    { id: 18, image: skatexbox360, title: "SKATE XBOX360", price: 1000, description: "Skate es un juego de deportes que ofrece una experiencia realista de patinaje en monopatín." },
    { id: 19, image: avcable, title: "Cable AV", price: 500, description: "Cable AV para conectar tu consola a la televisión y disfrutar de tus juegos en alta calidad." },
    { id: 20, image: ndsgames, title: "JUEGOS Nintendo DS", price: 350, description: "Una colección de juegos para Nintendo DS, ideal para los amantes de las aventuras portátiles." },
    { id: 21, image: f1poleposition64, title: "F1 POLE POSITION N64", price: 700, description: "F1 Pole Position es un juego de carreras de Fórmula 1 para Nintendo 64 que ofrece una experiencia de conducción realista." },
    { id: 22, image: psp, title: "PSP", price: 5000, description: "PlayStation Portable (PSP), una consola portátil de videojuegos con una amplia biblioteca de juegos.", includes: "•Consola •Cargador •Memory Stick Pro Duo original de 8GB •UMD: Little Big Planet" },
    { id: 23, image: fifa64, title: "FIFA 64", price: 700, description: "FIFA 64 es un juego de simulación de fútbol para Nintendo 64 que ofrece una experiencia de juego clásica con equipos y jugadores de la época." },
    { id: 25, image: nscharger, title: "CARGADOR NINTENDO SWITCH", price: 800, description: "Cargador para Nintendo Switch, ideal para mantener tu consola siempre lista para jugar." },
    { id: 26, image: wii, title: "WII", price: 4000, description: "Nintendo Wii, una consola de videojuegos que ofrece una experiencia de juego única con controles de movimiento.", includes: "•Consola •Wiimote + Nunckchuck original •Cable AV original •Barra sensora original •Transformador original" },
  ];

  const filteredProducts = featuredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="App">
      {/* Header */}
      <div className="Header-container">
        <header className="App-header" onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
          <img src={logo} className="App-logo" alt="logo" />
          <h6 style={{ marginLeft: "10px" }}>Usados Coleccionables</h6>
        </header>
        <header className="App-shop" onClick={() => setPage("shop")} style={{ cursor: "pointer" }}>
          <img src={shop} className="Shop-icon" alt="shop" />
          <h6 style={{ marginLeft: "10px" }}>Tienda</h6>
        </header>
      </div>

      <AnimatePresence>
        {page === "home" && (
          <motion.div key="home" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <main className="App-main">
              <AutoSlider />
              <div className="App-info">
                <header className="App-about"><h6>Sobre Nosotros</h6></header>
                <p id="about">
                  Realizamos servicio técnico para PC y consolas. También vendemos videojuegos y consolas con envíos a todo el país. ¡No dudes en contactarnos!
                </p>
              </div>
            </main>
          </motion.div>
        )}

        {page === "shop" && (
          <motion.div key="shop" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <header className="App-products" style={{ textAlign: "center" }}><h6>Productos Destacados</h6></header>
            <SecondSlider />
            <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
              <input type="text" placeholder="Buscar..." value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{ padding: "0.25rem 0.5rem", fontSize: "0.9rem", borderRadius: "0.25rem", border: "1px solid #4B5060", width: window.innerWidth <= 600 ? "250px" : window.innerWidth <= 1024 ? "280px" : "350px", maxWidth: "90%", height: "1.5rem" }} />
            </div>

            {searchText && (
              <motion.div key="search-results" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} style={{ position: "relative", zIndex: 10, marginTop: "-1rem" }}>
                <div className="product-container" style={{ background: "white", padding: "1rem", borderRadius: "8px", width: "100%", maxWidth: "600px", margin: "0 auto" }}>
                  {filteredProducts.map((product) => <ProductCard key={product.id} product={product} onBuyClick={handleBuyClick} />)}
                </div>
              </motion.div>
            )}

            <ConsoleHeaders />
          </motion.div>
        )}

        {["ps3", "ps2", "xbox360", "nintendo", "otros"].includes(page) && (
          <motion.div key={page} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <ConsoleHeaders />
            <div className="product-container">
              {featuredProducts
                .filter((p) => {
                  if (page === "ps3") return p.title.includes("PS3");
                  if (page === "ps2") return p.title.includes("PS2");
                  if (page === "xbox360") return p.title.includes("XBOX360");
                  if (page === "nintendo") return p.title.includes("NINTENDO") || p.title.includes("WII") || p.title.includes("DS") || p.title.includes("64");
                  if (page === "otros") return !["PS3", "PS2", "XBOX360", "NINTENDO", "WII", "DS", "64"].some(s => p.title.includes(s));
                  return false;
                })
                .map((product) => <ProductCard key={product.id} product={product} onBuyClick={handleBuyClick} />)}
            </div>
          </motion.div>
        )}

        {/* Vista de producto individual */}
        {page === "product" && selectedProduct && (
          <motion.div key="product" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <div className="product-detail" style={{ padding: "2rem" }}>
            <div className="product-detail-image">
              <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: "300px", height: "300px", borderRadius: "5px" }} />
            </div>
            <div className="product-detail-info">
            <div className="product-header">
              <h2>{selectedProduct.title}</h2>
              <h3 className="product-price" style={{ color: "#00aa00" }}>${selectedProduct.price}</h3>
            </div>
              <h4 className="product-description-title">Descripción:</h4>
              <p className="product-description" style={{ marginTop: "1rem" }}>{selectedProduct.description}</p>

              {selectedProduct.includes && (
                <div className="product-includes">
                <h4> Incluye:</h4>
                <ul>
                 {selectedProduct.includes.split("•").filter(item => item.trim() !== "").map((item, index) => (
                 <li key={index}>{item.trim()}</li>
                 ))}
                </ul>
                </div>
              )}

              <div className="product-actions" style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
                <button onClick={()=> {
                  const params = new URLSearchParams({
                    title: selectedProduct.title,
                    price: selectedProduct.price,
                    description: selectedProduct.description,
                    image: selectedProduct.image,
                    });
                    window.location.href = `https://d84d82bc7c60.ngrok-free.app/?${params.toString()}`;
                }}
                  style={{ display: "flex", alignItems: "center", padding: "0.5rem 1rem", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", backgroundColor: "#28a745", color: "white", borderRadius: "5px", border: "none" }}>
                  <img src={buyicon} alt="shop" style={{ width: "24px", height: "24px", marginRight: "0.5rem" }} />
                  Comprar
                </button>

                <button onClick={() => { addToCart(selectedProduct); alert(`${selectedProduct.title} se ha agregado al carrito`); }}
                  style={{ display: "flex", alignItems: "center", padding: "0.5rem 1rem", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", backgroundColor: "#007bff", color: "white", borderRadius: "5px", border: "none" }}>
                  <img src={buyicon} alt="cart" style={{ width: "24px", height: "24px", marginRight: "0.5rem" }} />
                  Agregar al carrito
                </button>

                <button onClick={() => setPage("shop")} style={{ padding: "0.5rem 1rem", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", backgroundColor: "#4B5060", color: "white", borderRadius: "5px", border: "none" }}>
                  Volver
                </button>
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carrito y WhatsApp flotantes */}
      <div style={{ position: "fixed", bottom: "1.25rem", right: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", zIndex: 1000 }}>
        <WppContact />
        <Cart selectedProduct={selectedProduct} cartItems={cartItems} setCartItems={setCartItems} />
      </div>

      {/* Footer */}
      <footer className="App-footer">
        <header className="App-contact"><h6>Contacto</h6></header>
        <div className="Contact-container">
          <div className="Contact-line">
            <img src={phone} alt="phone" className="Phone-icon" />
            <p id="phone-number">099284003</p>
          </div>
          <div className="Contact-line">
            <img src={facebook} alt="facebook" className="Facebook-icon" />
            <a href="https://www.facebook.com/profile.php?id=100089359691225" target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
              Usados Coleccionables
            </a>
          </div>
          <div className="Contact-line">
            <img src={email} alt="email" className="Email-icon" />
            <p id="email-contact">usadoscoleccionables25@gmail.com</p>
          </div>
          <div className="Contact-line">
          <img src={location} alt="location" className="Location-icon" />
          <p id="location-contact">Las Piedras, Canelones, Uruguay </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;