import "../assets/css/Header.css";
import HeaderLogo from "./svgComponents/HeaderLogo";
import TitleIcon from "./svgComponents/TitleIcon";
import CartIcon from "./svgComponents/CartIcon";
//import ShopArrowDown from "./svgComponents/ShopArrowDown";
import Ellipse from "./svgComponents/Ellipse";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import supabase from "../config/supabaseClient";
import { useUser } from "../context/UserContext";
import { use } from "react";

export default function Header({ itemsInCart }) {
    const navigate = useNavigate();
    const { setUser, userRole, setUserRole } = useUser();

    const handleLogout = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error(error.message);
    
        console.log("Sesión cerrada con éxito.");
        sessionStorage.removeItem("token");
        setUser(null);
        setUserRole(null);
        navigate("/login");
      } catch (err) {
        console.error("Error cerrando sesión:", err.message);
      }
    };
  
    const getNavMenu = (userRole) => {
      if (userRole === "admin") {
        return adminLoggedInUl;
      } else if (userRole === "user") {
        return userLoggedInUl;
      } else {
        return loggedOutUl;
      }
    };

    const getCartItem = (itemsArr) => {
      if (itemsArr.length === 0) {
        return (
          <li key="cart">
            <Link to={"/cart"} className="cartIconWrapper">
              <CartIcon className="cartIcon" />
            </Link>
          </li>
        );
      } else {
        return (
          <li key="cart">
            <Link to={"/cart"} className="cartIconWrapper">
              <CartIcon className="cartIcon" />
              <div className="ellipseIconWrapper">
                <Ellipse className="ellipseIcon" />
                <p className="ellipseIconNumber">{itemsArr.length}</p>
              </div>
            </Link>
          </li>
        );
      }
    };
    
    const loggedOutUl = 
      <ul>
        <li><Link to={"/shop"} className="navLink--header">Tienda</Link></li>
        <li><Link to={"/contact"} className="navLink--header">Contacto</Link></li>
        <li><Link to={"/login"} className="navLink--header">Iniciar sesión</Link></li>
        <li><Link to={"/register"} className="navLink--header">Registrarse</Link></li>
        {getCartItem(itemsInCart.items)}
      </ul>;
    
    const adminLoggedInUl =
      <ul>
        <li><Link to={"/shop"} className="navLink--header">Ver tienda</Link></li>
        <li><Link to={"/admin"} className="navLink--header">Admin</Link></li>
        <li><Link to={"/home"} onClick={handleLogout} className="navLink--header">Salir</Link></li>
      </ul>;
    
    const userLoggedInUl =
      <ul>
        <li><Link to={"/shop"} className="navLink--header">Tienda</Link></li>
        <li><Link to={"/contact"} className="navLink--header">Contacto</Link></li>
        <li><Link to={"/home"} onClick={handleLogout} className="navLink--header">Logout</Link></li>
        {getCartItem(itemsInCart.items)}
      </ul>;

      return (
        <>
            <header>
                <div>
                    <Link to={"/"} className="logoLink--header">
                        <HeaderLogo className="headerLogo" />
                        <TitleIcon className="headerTitle" fill="#FAFAFF" />
                    </Link>
                    <nav className="headerNav">
                      {getNavMenu(userRole)}
                    </nav>
                </div>
            </header>
        </>
      )
    }