import React from 'react';  
import logo from './logo.png';
import phone from './phone.png';
import facebook from './facebook.png';
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
      Realizamos servicio técnico para  PC y consolas (mantenimiento, reparaciones, destrabas), también vendemos consolas y videojuegos con envíos a todo el país. ¡No dudes en ponerte en contacto con nosotros!
      </p>
      
      <header className='App-products'>
        <h6>Productos Destacados</h6>
      </header>
      <SecondSlider />
      <header className='App-shop'>
        <h6>Tienda</h6>
      </header>

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

export default App;

