import './assets/css/fonts.css';
import './assets/css/meyerReset.css';
import './assets/css/App.css';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/Shop/ShopPage.jsx';
import ItemPage from './pages/ItemPage/ItemPage.jsx';
import CartPage from './pages/CartPage/CartPage.jsx';
import AdminPage from './pages/AdminPage/AdminPage.jsx';
import CreateItemPage from './pages/CreateItemPage/CreateItemPage.jsx';
import EditItemPage from './pages/EditItemPage/EditItemPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext.js';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import GuestOnlyRoute from './routes/GuestOnlyRoute.jsx';
import useSessionToken from './hooks/UseSessionToken.js';

function App() {
  const { user, userProfile, userRole, loading } = useUser();
  const { token, setToken, userData, error } = useSessionToken();

  const [filterData, setFilterData] = useState(
          {   
              nameOrCategory:"",
              sortBy: "",
              price: {min: undefined, max: undefined},
              filterByNew: false,
              filterByOffer: false,
              filterBySpecialEdition: false,
              filterByFavorites: false
          }
      );

  useEffect(() => {
    if (error) {
      console.error("Error en sesión:", error);
    }
  }, [error]);

  const groupProducts = (itemsInCart) => {
    let cartArr = [];
    itemsInCart.forEach(currentValue => {
        let existingProduct = cartArr.find(item => item.nameProduct === currentValue.nameProduct);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cartArr.push({ nameProduct: currentValue.nameProduct, quantity: 1 });
        }
    });
    cartArr = cartArr.sort((a, b) => {
      let x = a.nameProduct.toLowerCase();
      let y = b.nameProduct.toLowerCase();
      if (x < y) {return -1}
      if (x > y) {return 1}
      return 0
    })
    return cartArr;
  }

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage filterData={filterData} setFilterData={setFilterData} />} />
          <Route path="/shop" element={<ShopPage filterData={filterData} setFilterData={setFilterData} />} />
          <Route path="/shop/:id" element={<ItemPage />} />
          <Route path="/login" element={
            <GuestOnlyRoute>
              <Login setToken={setToken} />
            </GuestOnlyRoute>
          } />
          <Route path="/register" element={
            <GuestOnlyRoute>
              <Register />
            </GuestOnlyRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={["admin"]} redirectTo='not-found'>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute allowedRoles={["user"]} redirectTo="/not-found">
              <CartPage />
            </ProtectedRoute>
          } />
          <Route path="/create" element={
            <ProtectedRoute allowedRoles={["admin"]} redirectTo="/not-found">
              <CreateItemPage />
            </ProtectedRoute>
          } />
          <Route path="/edit/:itemId" element={
            <ProtectedRoute allowedRoles={["admin"]} redirectTo="/not-found">
              <EditItemPage />
            </ProtectedRoute>
          } />          
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;