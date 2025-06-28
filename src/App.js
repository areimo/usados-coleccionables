import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
import baops3 from './baops3.jpg';
import battlefield4ps3 from './battlefield4ps3.jpg';
import crysis2ps3 from './crysis2ps3.jpg';
import f12011xbox360 from './f12011xbox360.jpg';
import fifa13xbox360 from './fifa13xbox360.jpg';
import fifa15psvita from './fifa15psvita.jpg';
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
import xbox360controllerwcable from './xbox360controllerwcable.jpg';
import psp from './psp.jpg'
import skatexbox360 from './skatexbox360.jpg'

import './App.css';
import AutoSlider from './slider.jsx';
import WppContact from './wppContact.jsx';
import { SecondSlider } from './secondslider.jsx';

function App() {
  const [page, setPage] = useState("home");
  const [searchText, setSearchText] = useState("");

  const featuredProducts = [
    { image: baops3, title: "Batman Arkham Origins PS3", price: "$1.200" },
    { image: battlefield4ps3, title: "Battlefield 4 PS3", price: "$1.800" },
    { image: crysis2ps3, title: "Crysis 2 PS3", price: "$1.800" },
    { image: tloups3, title: "T.L.O.U PS3", price: "$2.500" },
    { image: uncharted2ps3, title: "UNCHARTED 2 PS3", price: "$900" },
    { image: fifasoccer12ps3, title: "FIFA SOCCER 12 PS3", price: "$800" },
    { image: ps2, title: "PS2", price: "$3.500" },
    { image: ps2wpendrive, title: "PS2 CON PENDRIVE", price: "$3.000" },
    { image: socomps2, title: "SOCOM PS2", price: "$1.800" },
    { image: xbox360, title: "XBOX360", price: "$5.000" },
    { image: xbox360controller, title: "MANDO XBOX360 INALÁMBRICO", price: "$900" },
    { image: xbox360controllerwcable, title: "MANDO XBOX360", price: "$800" },
    { image: aciixbox360, title: "Assassin's Creed II XBOX360", price: "$1.000" },
    { image: bacxbox360, title: "Batman Arkham City XBOX360", price: "$800" },
    { image: f12011xbox360, title: "F1 2011 XBOX360", price: "$1.200" },
    { image: fifa13xbox360, title: "FIFA 13 XBOX360", price: "$800" },
    { image: kinnectsportsxbox360, title: "Kinnect Sports 360 XBOX360", price: "$400" },
    { image: skatexbox360, title: "SKATE XBOX360", price: "$1.000" },
    { image: avcable, title: "Cable AV", price: "$500" },
    { image: ndsgames, title: "JUEGOS Nintendo DS", price: "$350" },
    { image: fifa15psvita, title: "FIFA 15 PS VITA", price: "$800" },
    { image: psp, title: "PSP", price: "$6.000" },
  ];

  const filteredProducts = featuredProducts.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

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
      <header style={headerStyle("#4B5060")} onClick={() => setPage("otros")}>
        <img src={joystick} alt="joystick" style={logoStyle} />
        <h6>Otros Productos</h6>
      </header>
    </div>
  );

  return (
    <div className="App">
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

      <AnimatePresence mode="wait">
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
                <header className="App-about"><h6>Sobre Nosotros</h6></header>
                <p id="about">
                  Realizamos servicio técnico para PC y consolas (mantenimiento, reparaciones, destrabas), también vendemos consolas y videojuegos con envíos a todo el país. ¡No dudes en ponerte en contacto con nosotros!
                </p>
                <header className="App-contact"><h6>Contacto</h6></header>
                <div className="Contact-line">
                  <img src={phone} alt="phone" className="Phone-icon" />
                  <p id="phone-number">099284003</p>
                  <img src={facebook} alt="facebook" className="Facebook-icon" />
                  <a href="https://www.facebook.com/profile.php?id=100089359691225" target="_blank" rel="noopener noreferrer">
                    Usados Coleccionables
                  </a>
                </div>
              </div>
            </main>
          </motion.div>
        )}

        {page === "shop" && (
          <motion.div
            key="shop"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <header className="App-products" style={{ textAlign: "center" }}><h6>Productos Destacados</h6></header>
            <SecondSlider />

            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem", marginBottom: "1rem" }}>
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

            <AnimatePresence>
              {searchText !== "" && (
                <motion.div
                  key="search-results"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: "relative",
                    zIndex: 10,
                    marginTop: "-1rem",
                  }}
                >
                  <div className="product-container" style={{ background: "white", padding: "1rem", borderRadius: "8px" }}>
                    {filteredProducts.map((product, index) => (
                      <ProductCard key={index} image={product.image} title={product.title} price={product.price} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <ConsoleHeaders />

            <header className="App-contact"><h6>Contacto</h6></header>
            <div className="Contact-line">
              <img src={phone} alt="phone" className="Phone-icon" />
              <p id="phone-number">099284003</p>
              <img src={facebook} alt="facebook" className="Facebook-icon" />
              <a href="https://www.facebook.com/profile.php?id=100089359691225" target="_blank" rel="noopener noreferrer">
                Usados Coleccionables
              </a>
            </div>
          </motion.div>
        )}

        {["ps3", "ps2", "xbox360", "otros"].includes(page) && (
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <ConsoleHeaders />
            <div className="product-container">
              {page === "ps3" && (
                <>
                  <ProductCard image={baops3} title="Batman Arkham Origins PS3" price="$1.200" />
                  <ProductCard image={battlefield4ps3} title="Battlefield 4 PS3" price="$1.800" />
                  <ProductCard image={crysis2ps3} title="Crysis 2 PS3" price="$1.800" />
                  <ProductCard image={tloups3} title="T.L.O.U PS3" price="$2.500" />
                  <ProductCard image={uncharted2ps3} title="UNCHARTED 2 PS3" price="$900" />
                  <ProductCard image={fifasoccer12ps3} title="FIFA SOCCER 12 PS3" price="$800" />
                </>
              )}
              {page === "ps2" && (
                <>
                  <ProductCard image={ps2} title="PS2" price="$3.500" />
                  <ProductCard image={ps2wpendrive} title="PS2 CON PENDRIVE" price="$3.000" />
                  <ProductCard image={socomps2} title="SOCOM PS2" price="$1.800" />
                </>
              )}
              {page === "xbox360" && (
                <>
                  <ProductCard image={xbox360} title="XBOX360" price="$5.000" />
                  <ProductCard image={xbox360controller} title="MANDO XBOX360 INALÁMBRICO" price="$900" />
                  <ProductCard image={xbox360controllerwcable} title="MANDO XBOX360" price="$800" />
                  <ProductCard image={aciixbox360} title="Assassin's Creed II XBOX360" price="$1.000" />
                  <ProductCard image={bacxbox360} title="Batman Arkham City XBOX360" price="$800" />
                  <ProductCard image={f12011xbox360} title="F1 2011 XBOX360" price="$1.200" />
                  <ProductCard image={fifa13xbox360} title="FIFA 13 XBOX360" price="$800" />
                  <ProductCard image={kinnectsportsxbox360} title="Kinnect Sports 360 XBOX360" price="$400" />
                  <ProductCard image={skatexbox360} title="SKATE XBOX360" price="$1.000" />
                </>
              )}
              {page === "otros" && (
                <>
                  <ProductCard image={avcable} title="Cable AV" price="$500" />
                  <ProductCard image={ndsgames} title="JUEGOS Nintendo DS" price="$350" />
                  <ProductCard image={fifa15psvita} title="FIFA 15 PS VITA" price="$800" />
                  <ProductCard image={psp} title="PSP" price="$6.000" />
                </>
              )}
            </div>
                <header className="App-contact"><h6>Contacto</h6></header>
    <div className="Contact-line">
      <img src={phone} alt="phone" className="Phone-icon" />
      <p id="phone-number">099284003</p>
      <img src={facebook} alt="facebook" className="Facebook-icon" />
      <a href="https://www.facebook.com/profile.php?id=100089359691225" target="_blank" rel="noopener noreferrer">
        Usados Coleccionables
      </a>
    </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="App-footer">
        <p id="footer">2025 @areimo on Github</p>
      </footer>
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

const logoStyle = {
  marginRight: "10px",
  height: "5vmin",
  pointerEvents: "none",
};

function ProductCard({ image, title, price }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} style={{ width: "200px", height: "200px", borderRadius: "5px", marginTop: "1.5625rem" }} />
      <h5 style={{ marginTop: "0.5rem", textAlign: "left" }}>{title}</h5>
      <h5 style={{ color: "#00aa00", fontWeight: "bold" }}>{price}</h5>
    </div>
  );
}

export default App;