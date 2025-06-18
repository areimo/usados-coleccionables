import React from 'react';
import logo from './logo.png';
import phone from './phone.png';
import facebook from './facebook.png';
import aciixbox360 from './aciixbox360.jpg';
import avcable from './avcable.jpg';
import bacxbox360 from './bacxbox360.jpg';
import baops3 from './baops3.jpg';
import battlefield4ps3 from './battlefield4ps3.jpg';
import crysis2ps3 from './crysis2ps3.jpg';
import f12011xbox360 from './f12011xbox360.jpg';
import fifa13xbox360 from './fifa13xbox360.jpg';
import fifa15psvita from './fifa15psvita.jpg';
import fifa19ps4 from './fifa19ps4.jpg';
import fifasoccer12ps3 from './fifasoccer12ps3.jpg';
import kinnectsportsxbox360 from './kinnectsportsxbox360.jpg';
import ndsgames from './ndsgames.jpg';
import pes2018ps3 from './pes2018ps3.jpg';
import ps2 from './ps2.jpg';
import ps2wpendrive from './ps2wpendrive.jpg';
import ps4 from './ps4.jpg';
import socomps2 from './socomps2.jpg';
import tloups3 from './tloups3.jpg';
import uncharted2ps3 from './uncharted2ps3.jpg';
import xbox360 from './xbox360.jpg';
import xbox360controller from './xbox360controller.jpg';
import xbox360controllerwcable from './xbox360controllerwcable.jpg';
import psp from './psp.jpg'
import skatexbox360 from './skatexbox360.jpg'
import tctd2ps4 from './tctd2ps4.jpg'

import './App.css';
import AutoSlider from './slider.jsx';
import WppContact from './wppContact.jsx';
import { SecondSlider } from './secondslider.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h6 style={{ marginLeft: "10px" }}>Usados Coleccionables</h6>
      </header>

      <main className="App-main">
        <AutoSlider />

        <div className="App-info">
          <header className='App-about'>
            <h6>Sobre Nosotros</h6>
          </header>

          <p id='about'>
            Realizamos servicio técnico para PC y consolas (mantenimiento, reparaciones, destrabas), también vendemos consolas y videojuegos con envíos a todo el país. ¡No dudes en ponerte en contacto con nosotros!
          </p>

          <header className='App-products'>
            <h6>Productos Destacados</h6>
          </header>
          <SecondSlider />

          <header className='App-shop'>
            <h6>Tienda</h6>
          </header>

          <div className="product-container">
            <ProductCard image={aciixbox360} title="Assassin's Creed II XBOX360" price="$1.000"/>
            <ProductCard image={avcable} title="Cable AV" price="$500"/>
            <ProductCard image={bacxbox360} title="Batman Arkham City XBOX360" price="$800" />
            <ProductCard image={baops3} title="Batman Arkham Origins PS3" price="$1.200"/>
            <ProductCard image={battlefield4ps3} title="Battlefield 4 PS3" price="$1.800"/>
            <ProductCard image={crysis2ps3} title="Crysis 2 PS3" price="$1.800"/>
            <ProductCard image={f12011xbox360} title="F1 2011 XBOX360" price="$1.200"/>
            <ProductCard image={fifa13xbox360} title="FIFA 13 XBOX360" price="$800" />
            <ProductCard image={fifa15psvita} title="FIFA 15 PS VITA" price="$800"/>
            <ProductCard image={fifa19ps4} title="FIFA 19 PS4" price="$1.000" />
            <ProductCard image={fifasoccer12ps3} title="FIFA SOCCER 12 PS3" price="$800"/>
            <ProductCard image={kinnectsportsxbox360} title="Kinnect Sports 360 XBOX360" price="$400"/>
            <ProductCard image={ndsgames} title="JUEGOS Nintendo DS" price="$350"/>
            <ProductCard image={pes2018ps3} title="PES 2018 PS3" />
            <ProductCard image={ps2} title="PS2" price="$3.500"/>
            <ProductCard image={ps2wpendrive} title="PS2 CON PENDRIVE" price="$3.000"/>
            <ProductCard image={ps4} title="PS4" price="$8.000"/>
            <ProductCard image={psp} title="PSP" price="$6.000"/>
            <ProductCard image={skatexbox360} title="SKATE XBOX360" price="$1.000"/>
            <ProductCard image={socomps2} title="SOCOM PS2" price="$1.800"/>
            <ProductCard image={tctd2ps4} title="T.C.T.D 2 PS4" price="$1.000"/>
            <ProductCard image={tloups3} title="T.L.O.U PS3" price="$2.500"/>
            <ProductCard image={uncharted2ps3} title="UNCHARTED 2 PS3" price="$900"/>
            <ProductCard image={xbox360} title="XBOX360" price="$5.000"/>
            <ProductCard image={xbox360controller} title="MANDO XBOX360 INALÁMBRICO" price="$900"/>
            <ProductCard image={xbox360controllerwcable} title="MANDO XBOX360" price="$800"/>
            
         </div>
          <header className="App-contact">
            <h6>Contacto</h6>
          </header>

          <div className="Contact-line">
            <img src={phone} alt="phone" className="Phone-icon" />
            <p id="phone-number">099284003</p>
            <img src={facebook} alt="facebook" className="Facebook-icon" />
            <a className="Facebook-link" href="https://www.facebook.com/profile.php?id=100089359691225" target="_blank" rel="noopener noreferrer">
              Usados Coleccionables
            </a>
          </div>
        </div>
      </main>

      <footer className='App-footer'>
        <p id='footer'>2025 @areimo on Github</p>
      </footer>

      <WppContact />
    </div>
  );
}

function ProductCard({ image, title, price}) {
  return (
    <div className="product-card">
      <img src={image} alt={title} style={{ width: "200px", height: "200px", borderRadius: "5px", marginTop: "1.5625rem"}} />
      <h5 className= 'product-title' style={{ marginTop: "0.5rem" }}>{title}</h5>
      <h5 style={{ color: "#00aa00", fontWeight: "bold" }}>{price}</h5>
    </div>
  );
}

export default App;
