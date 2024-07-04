import './assets/css/fonts.css';
import './assets/css/meyerReset.css';
import './assets/css/App.css';
import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/Shop/ShopPage.jsx';
import ItemPage from './pages/ItemPage/ItemPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import CartIcon from './components/svgComponents/CartIcon';
import Header from './components/Header';
import Footer from './components/Footer';
import productsArr from './data/products.js';
import { uniqueProductsArr } from './data/products.js';
import { useState } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';

function App() {
  const [loginStatus, setLoginStatus] = useState({
    isLogged: false,
    isAdmin: false,
    get headerMenu() {
      if (!this.isLogged) {
        return ["shop", "contacto", "login", <CartIcon />]
      } else if (this.isLogged && !this.isAdmin) {
        return ["shop", "contacto", "logout", <CartIcon />]
      } else {
        return ["ver tienda", "admin", "salir"]
      }
    }, 
    get footerMenu() {
      if (this.isAdmin) {
        return ["shop", "registrarse", "ingresar", "contacto"]
      } else {
        return ["shop", "ingresar", "contacto"]
      }
    }
  });
  const [itemsInCart, setItemsInCart] = useState([]);
  const [productsStock, setProductsStock] = useState({productsArr: productsArr, uniqueProductsArr: uniqueProductsArr});
  const router = createHashRouter([
    {
      path: "/", 
      element: <HomePage productsStock={productsStock} setProductsStock={setProductsStock} />, 
      errorElement: <NotFoundPage />
    }, 
    {
      path: "/shop",
      element: <ShopPage  productsStock={productsStock} 
                          setProductsStock={setProductsStock} 
                          itemsInCart={itemsInCart} 
                          setItemsInCart={setItemsInCart} />
    }, 
    {
      path: "/shop/:itemId",
      element: <ItemPage  itemsInCart={itemsInCart} 
                          setItemsInCart={setItemsInCart} 
                          productsStock={productsStock}
                          setProductsStock={setProductsStock} />
    }
  ]);
  return (
    <>
      <Header headerMenu={loginStatus.headerMenu} itemsInCart={itemsInCart} productsStock={productsStock} />
        <RouterProvider router={router} />
      <Footer footerMenu={loginStatus.footerMenu} />
    </>
  );
}

export default App;