import './assets/css/fonts.css';
import './assets/css/meyerReset.css';
import './assets/css/App.css';
import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/Shop/ShopPage.jsx';
import ItemPage from './pages/ItemPage/ItemPage.jsx';
import CartPage from './pages/CartPage/CartPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import CartIcon from './components/svgComponents/CartIcon';
import Header from './components/Header';
import Footer from './components/Footer';
import productsArr from './data/products.js';
import { uniqueProductsArr } from './data/products.js';
import { useState } from 'react';
import { createHashRouter, RouterProvider, Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

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
  const [productsStock, setProductsStock] = useState({
    productsArr: productsArr, 
    uniqueProductsArr: uniqueProductsArr});
  const router = createHashRouter([
    {
      path: "*", 
      element: <NotFoundPage />
    },
    {
      path: "/", 
      element: <HomePage productsStock={productsStock} setProductsStock={setProductsStock} />, 
      errorElement: <NotFoundPage />
    }, 
    {
      path: "/Funkoshop", 
      element: <HomePage productsStock={productsStock} setProductsStock={setProductsStock} />, 
      errorElement: <NotFoundPage />
    }, 
    {
      path: "/shop",
      element: <ShopPage productsStock={productsStock} />, 

    }, 
    {
      path: "/shop/:itemId",
      element: <ItemPage  itemsInCart={itemsInCart} 
                          setItemsInCart={setItemsInCart} 
                          productsStock={productsStock} 
                          setProductsStock={setProductsStock} />
    }, 
    {
      path: "/cart",
      element: <CartPage />
    }
  ]);
  return (
    //<>
    //  <Header headerMenu={loginStatus.headerMenu} itemsInCart={itemsInCart} productsStock={productsStock} />
    //    <RouterProvider router={router} />
    //  <Footer footerMenu={loginStatus.footerMenu} />
    //</>
    <>
      <Router>
        <Header headerMenu={loginStatus.headerMenu} itemsInCart={itemsInCart} productsStock={productsStock} />
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage productsStock={productsStock} setProductsStock={setProductsStock} />} />
          <Route path="/Funkoshop" element={<HomePage productsStock={productsStock} setProductsStock={setProductsStock} />} />
          <Route path="/shop" element={<ShopPage productsStock={productsStock} />} />
          <Route path="/shop/:itemId" element={<ItemPage itemsInCart={itemsInCart} setItemsInCart={setItemsInCart} productsStock={productsStock} setProductsStock={setProductsStock} />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer footerMenu={loginStatus.footerMenu} />
      </Router>
    </>
  );
}

export default App;