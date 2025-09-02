import "../assets/css/Header.css";
import HeaderLogo from "./svgComponents/HeaderLogo";
import TitleIcon from "./svgComponents/TitleIcon";
import CartIcon from "./svgComponents/CartIcon";
//import ShopArrowDown from "./svgComponents/ShopArrowDown";
import Ellipse from "./svgComponents/Ellipse";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import supabase from "../config/supabaseClient";
import { useUser } from "../context/UserContext";

export default function Header() {
    const navigate = useNavigate();
    const { user, setUser, userRole, setUserRole } = useUser();
    const { cart } = useCart();

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

    const getCartItem = () => {
      if (cart.length === 0) {
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
                <p className="ellipseIconNumber">{cart.length}</p>
              </div>
            </Link>
          </li>
        );
      }
    };

    const navUl = 
      <ul>
        <li><Link to={"/shop"} className="navLink--header">{user !== null && userRole === "admin" ? "Ver tienda" : "Tienda"}</Link></li>
        {(user === null || (user !== null && userRole === "user")) && (<li><Link to={"/contact"} className="navLink--header">Contacto</Link></li>)}
        {user === null && (<li><Link to={"/login"} className="navLink--header">Iniciar sesión</Link></li>)}
        {user === null && (<li><Link to={"/register"} className="navLink--header">Registrarse</Link></li>)}
        {user !== null && userRole === "admin" && (<li><Link to={"/admin"} className="navLink--header">Admin</Link></li>)}
        {user !== null && (<li><Link to={"/home"} onClick={handleLogout} className="navLink--header">{userRole === "admin" ? "Salir" : "Logout"}</Link></li>)}
        {user !== null && userRole === "user" && getCartItem()}
      </ul>

      return (
        <>
            <header>
                <div>
                    <Link to={"/"} className="logoLink--header">
                        <HeaderLogo className="headerLogo" />
                        <TitleIcon className="headerTitle" fill="#FAFAFF" />
                    </Link>
                    <nav className="headerNav">
                      {navUl}
                    </nav>
                </div>
            </header>
        </>
      )
    }