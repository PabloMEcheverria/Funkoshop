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
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import supabase from './config/supabaseClient.js';
import { useUser } from './context/UserContext.js';
import RootRedirect from './routes/RootRedirect.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import GuestOnlyRoute from './routes/GuestOnlyRoute.jsx';

function App() {
  const { user, userProfile, userRole, loading } = useUser();

  useEffect(() => {
  }, [user, userProfile, userRole, loading]);
  
  const [token, setToken] = useState(false);
  const [userData, setUserData] = useState("");

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if(sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);

      const fetchData = async () => {
        if (data.user2 && data.user.id) {
          let { data: user, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();
          if (error) console.error('Error fetching data: ', error);
          else setUserData(user);
        }
      };
      fetchData();
    }
  }, [token, userData, user]);

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
          <Route path="/" element={<RootRedirect />} />
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
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={["admin"]} redirectTo='not-found'>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ItemPage />} />
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