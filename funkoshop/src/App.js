import './assets/css/fonts.css';
import './assets/css/meyerReset.css';
import './assets/css/App.css';
import HomePage from './pages/HomePage/HomePage';
import CartIcon from './components/svgComponents/CartIcon';
import Header from './components/Header';
import Footer from './components/Footer';
import productsArr from './data/products.js';
import { useState } from 'react';

function App() {
  //let isAdminPanel = false;
  //let isLogged = false;
  const [itemsInCart, setItemsInChart] = useState([]);
  const headerMenu = ["shop", "contacto", "login", <CartIcon />];
  //const headerMenu = ["ver tienda", "admin", "salir"];

  const footerMenu = ["shop", "ingresar", "contacto"];
  //const footerMenu = ["shop", "registrarse", "ingresar", "contacto"];
  return (
    <>
      <Header headerMenu={headerMenu} itemsInCart={itemsInCart}/>
        <HomePage />
      <Footer footerMenu={footerMenu} />
    </>
  );
}

export default App;