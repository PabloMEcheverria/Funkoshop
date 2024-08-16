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
import { uniqueProductsArr, productsArr2 } from './data/products.js';
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
  //const [itemsInCart, setItemsInCart] = useState([]);
  const [itemsInCart, setItemsInCart] = useState([
    {
      "id": 1,
      "sku": "STW001001",
      "nameProduct": "Baby Yoda Blueball",
      "collection": "Figuras",
      "license": "Star Wars",
      "description": "Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga, edición limitada.",
      "price": 49.99,
      "paymentMethods": [
          1,
          3,
          6,
          12
      ],
      "discounts": 0,
      "frontImg": "/Funkoshop/static/media/StarWars_Baby_Yoda.d62c887156e0fb190971.png",
      "backImg": "/Funkoshop/static/media/StarWars_Baby_Yoda_box.0b583e49c282fbcb7496.jpeg",
      "isNew": true,
      "isSpecialEdition": true,
      "isFavorite": true,
      "currentPaymentMethod": 12
    }, 
    {
      "id": 2,
      "sku": "STW001002",
      "nameProduct": "Baby Yoda Blueball",
      "collection": "Figuras",
      "license": "Star Wars",
      "description": "Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga, edición limitada.",
      "price": 49.99,
      "paymentMethods": [
          1,
          3,
          6,
          12
      ],
      "discounts": 0,
      "frontImg": "/Funkoshop/static/media/StarWars_Baby_Yoda.d62c887156e0fb190971.png",
      "backImg": "/Funkoshop/static/media/StarWars_Baby_Yoda_box.0b583e49c282fbcb7496.jpeg",
      "isNew": true,
      "isSpecialEdition": true,
      "isFavorite": true,
      "currentPaymentMethod": 12
    }, 
    {
      "id": 3,
      "sku": "STW001003",
      "nameProduct": "Baby Yoda Blueball",
      "collection": "Figuras",
      "license": "Star Wars",
      "description": "Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga, edición limitada.",
      "price": 49.99,
      "paymentMethods": [
          1,
          3,
          6,
          12
      ],
      "discounts": 0,
      "frontImg": "/Funkoshop/static/media/StarWars_Baby_Yoda.d62c887156e0fb190971.png",
      "backImg": "/Funkoshop/static/media/StarWars_Baby_Yoda_box.0b583e49c282fbcb7496.jpeg",
      "isNew": true,
      "isSpecialEdition": true,
      "isFavorite": true,
      "currentPaymentMethod": 12
    },
    {
      "id": 26,
      "sku": "NAR001001",
      "nameProduct": "Naruto",
      "collection": "Figuras",
      "license": "Naruto Shippuden",
      "description": "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.",
      "price": 49.99,
      "paymentMethods": [
          1,
          3,
          6,
          12
      ],
      "discounts": 0,
      "frontImg": "/Funkoshop/static/media/Naruto_Naruto_Shippuden.76f9d122478f62f0dc42.jpg",
      "backImg": "/Funkoshop/static/media/Naruto_Naruto_Shippuden_box.9a8f29006434ef5ae4d4.jpg",
      "isNew": true,
      "isSpecialEdition": true,
      "isFavorite": true,
      "currentPaymentMethod": 12
    },
    {
      "id": 27,
      "sku": "NAR001002",
      "nameProduct": "Naruto",
      "collection": "Figuras",
      "license": "Naruto Shippuden",
      "description": "Figura Funko coleccionable de Naruto de la saga Naruto Shippuden.",
      "price": 49.99,
      "paymentMethods": [
          1,
          3,
          6,
          12
      ],
      "discounts": 0,
      "frontImg": "/Funkoshop/static/media/Naruto_Naruto_Shippuden.76f9d122478f62f0dc42.jpg",
      "backImg": "/Funkoshop/static/media/Naruto_Naruto_Shippuden_box.9a8f29006434ef5ae4d4.jpg",
      "isNew": true,
      "isSpecialEdition": true,
      "isFavorite": true,
      "currentPaymentMethod": 12
    },
    {
      "id": 51,
      "sku": "HPT001001",
      "nameProduct": "Harry Potter",
      "collection": "Figuras",
      "license": "Harry Potter",
      "description": "Figura Funko coleccionable de Harry Potter de la saga Harry Potter portando una varita.",
      "price": 49.99,
      "paymentMethods": [
          1,
          3,
          6,
          12
      ],
      "discounts": 0,
      "frontImg": "/Funkoshop/static/media/HarryPotter_Harry_Potter.c13386f2516bc4d8747c.png",
      "backImg": "/Funkoshop/static/media/HarryPotter_Harry_Potter_box.141d4aea17ff1fbdc72e.png",
      "isNew": true,
      "isSpecialEdition": true,
      "isFavorite": true,
      "currentPaymentMethod": 12
    },
    {
      "id": 81,
      "sku": "PKM002001",
      "nameProduct": "Mew",
      "collection": "Figuras",
      "license": "Pokemon",
      "description": "Figura Funko coleccionable de Mew de la saga Pokemon.",
      "price": 39.99,
      "paymentMethods": [
          1,
          3,
          6
      ],
      "discounts": 5,
      "frontImg": "/Funkoshop/static/media/Pokemon_Mew.806558c1b7fb8ecc8b02.png",
      "backImg": "/Funkoshop/static/media/Pokemon_Mew_box.1a54d5294adcf7114c82.png",
      "isNew": true,
      "isSpecialEdition": true,
      "isFavorite": false,
      "currentPaymentMethod": 6
    },
    {
      "id": 82,
      "sku": "PKM002002",
      "nameProduct": "Mew",
      "collection": "Figuras",
      "license": "Pokemon",
      "description": "Figura Funko coleccionable de Mew de la saga Pokemon.",
      "price": 39.99,
      "paymentMethods": [
          1,
          3,
          6
      ],
      "discounts": 5,
      "frontImg": "/Funkoshop/static/media/Pokemon_Mew.806558c1b7fb8ecc8b02.png",
      "backImg": "/Funkoshop/static/media/Pokemon_Mew_box.1a54d5294adcf7114c82.png",
      "isNew": true,
      "isSpecialEdition": true,
      "isFavorite": false,
      "currentPaymentMethod": 6
    }, 
    {
      "id": 83,
      "sku": "PKM002003",
      "nameProduct": "Mew",
      "collection": "Figuras",
      "license": "Pokemon",
      "description": "Figura Funko coleccionable de Mew de la saga Pokemon.",
      "price": 39.99,
      "paymentMethods": [
          1,
          3,
          6
      ],
      "discounts": 5,
      "frontImg": "/Funkoshop/static/media/Pokemon_Mew.806558c1b7fb8ecc8b02.png",
      "backImg": "/Funkoshop/static/media/Pokemon_Mew_box.1a54d5294adcf7114c82.png",
      "isNew": true,
      "isSpecialEdition": true,
      "isFavorite": false,
      "currentPaymentMethod": 6
    }, 
    {
      "id": 84,
      "sku": "PKM002004",
      "nameProduct": "Mew",
      "collection": "Figuras",
      "license": "Pokemon",
      "description": "Figura Funko coleccionable de Mew de la saga Pokemon.",
      "price": 39.99,
      "paymentMethods": [
          1,
          3,
          6
      ],
      "discounts": 5,
      "frontImg": "/Funkoshop/static/media/Pokemon_Mew.806558c1b7fb8ecc8b02.png",
      "backImg": "/Funkoshop/static/media/Pokemon_Mew_box.1a54d5294adcf7114c82.png",
      "isNew": true,
      "isSpecialEdition": true,
      "isFavorite": false,
      "currentPaymentMethod": 6
    }, 
    {
      "id": 85,
      "sku": "PKM002005",
      "nameProduct": "Mew",
      "collection": "Figuras",
      "license": "Pokemon",
      "description": "Figura Funko coleccionable de Mew de la saga Pokemon.",
      "price": 39.99,
      "paymentMethods": [
          1,
          3,
          6
      ],
      "discounts": 5,
      "frontImg": "/Funkoshop/static/media/Pokemon_Mew.806558c1b7fb8ecc8b02.png",
      "backImg": "/Funkoshop/static/media/Pokemon_Mew_box.1a54d5294adcf7114c82.png",
      "isNew": true,
      "isSpecialEdition": true,
      "isFavorite": false,
      "currentPaymentMethod": 6
    }
  ]);
  const [productsStock, setProductsStock] = useState({
    //productsArr: productsArr, 
    productsArr: productsArr2, 
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
          <Route path="/cart" element={<CartPage itemsInCart={itemsInCart} setItemsInCart={setItemsInCart} productsStock={productsStock} setProductsStock={setProductsStock} />} />
        </Routes>
        <Footer footerMenu={loginStatus.footerMenu} />
      </Router>
    </>
  );
}

export default App;