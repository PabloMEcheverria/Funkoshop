import { useContext } from "react";
import "../assets/css/Footer.css";
import FooterLogo from "./svgComponents/FooterLogo";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();
    const { setUser, userRole, setUserRole } = useContext(UserContext);

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

    const adminLoggedInUl = 
        <ul className="nav_ul--footer">
            <li><Link to={"/shop"} className="navLink--footer">shop</Link></li>
            <li><Link to={"/admin"} className="navLink--footer">admin</Link></li>
            <li><Link to={"/contact"} className="navLink--footer">contacto</Link></li>
            <li><Link to={"/home"} onClick={handleLogout} className="navLink--footer">salir</Link></li>
        </ul>;
    
    const userLoggedInUl =
        <ul className="nav_ul--footer">
            <li><Link to={"/shop"} className="navLink--footer">shop</Link></li>
            <li><Link to={"/contact"} className="navLink--footer">contacto</Link></li>
            <li><Link to={"/cart"} className="navLink--footer">cart</Link></li>
            <li><Link to={"/home"} onClick={handleLogout} className="navLink--footer">salir</Link></li>
        </ul>;
    
    const loggedOutUl = 
        <ul className="nav_ul--footer">
            <li><Link to={"/shop"} className="navLink--footer">shop</Link></li>
            <li><Link to={"/register"} className="navLink--footer">registrarse</Link></li>
            <li><Link to={"/login"} className="navLink--footer">ingresar</Link></li>
            <li><Link to={"/contact"} className="navLink--footer">contacto</Link></li>
        </ul>;

    return  (
        <footer>
            <div className="footer--container">
                <nav className="nav--footer">
                    {getNavMenu(userRole)}
                </nav>
                <Link to={"/"} className="logoLink--footer">
                    <FooterLogo className="footerLogo" />
                </Link>
                <p>All rights reserved 2025 - Funkoshop &copy;</p>
            </div>
        </footer>
    )
};