import "../assets/css/Header.css";
import HeaderLogo from "./svgComponents/HeaderLogo";
import TitleIcon from "./svgComponents/TitleIcon";
import CartIcon from "./svgComponents/CartIcon";
//import ShopArrowDown from "./svgComponents/ShopArrowDown";
import Ellipse from "./svgComponents/Ellipse";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import UserContext from "../context/UserContext"

export default function Header({ itemsInCart }) {
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);
    const { user, userProfile, setUser, setUserProfile } = useContext(UserContext);

    useEffect(() => {
        setHeaderMenu(user, userProfile);
      }, [user, userProfile]);
    
      const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log("Error cerrando sesión: ", error.message);
        } else {
            console.log("Sesión cerrada con éxito.");
            sessionStorage.removeItem("token");
            setUser(null);
            navigate("/login");
        }
      };
    
      const setHeaderMenu = (user, userProfile) => {
        let menuArr = [];
        console.log('User Profile:', userProfile);
    
        if (user) {
          if (userProfile && userProfile.role === "admin") {
            menuArr = ["ver tienda", "admin", "salir"];
          } else if (userProfile && userProfile.role === "user") {
            menuArr = ["shop", "contacto", "logout", "cart"];
          }
        } else {
          menuArr = ["shop", "contacto", "login", "registrarse", "cart"];
        }
    
        console.log('Menu Array:', menuArr);
        const unorderedList = (
          <ul>
            {menuArr.map((value, i) => {
              if (value === "ver tienda" || value === "shop") {
                return (
                  <li key={i}>
                    <Link to={"/shop"} className="navLink--header">
                      {value}
                    </Link>
                  </li>
                );
              } 
              
              if (value === "admin") {
                return (
                  <li key={i}>
                    <Link to={"/admin"} className="navLink--header">
                      {value}
                    </Link>
                  </li>
                );
              } 
              
              if (value === "salir" || value === "logout") {
                return (
                  <li key={i}>
                    <Link to={"/home"} onClick={handleLogout} className="navLink--header">
                      {value}
                    </Link>
                  </li>
                );
              } 
              
              if (value === "cart") {
                if (itemsInCart.items.length === 0) {
                    return (<li key={i}><Link to={"/cart"} className="cartIconWrapper"><CartIcon className="cartIcon" /></Link></li>)
                } else {
                    return (
                        <li key={i}>
                            <Link to={"/cart"} className="cartIconWrapper">
                              <CartIcon className="cartIcon" />
                              <div className="ellipseIconWrapper">
                                  <Ellipse className="ellipseIcon" />
                                  <p className="ellipseIconNumber">{itemsInCart.items.length}</p>
                              </div>
                            </Link>
                        </li>
                    );
                }
              }
              
              if (value === "login") {
                return (
                  <li key={i}>
                    <Link to={"/login"} className="navLink--header">
                      {value}
                    </Link>
                  </li>
                );
              }

              if (value === "registrarse") {
                return (
                  <li key={i}>
                    <Link to={"/register"} className="navLink--header">
                      {value}
                    </Link>
                  </li>
                );
              }
              
              if (value === "contacto") {
                return (
                  <li key={i}>
                    <Link to={"/contact"} className="navLink--header">
                      {value}
                    </Link>
                  </li>
                );
              }

              return null;
            })}
          </ul>
        );
    
        setMenu(unorderedList);
      };
    
      return (
        <>
            <header>
                <div>
                    <Link to={"/"} className="logoLink--header">
                        <HeaderLogo className="headerLogo" />
                        <TitleIcon className="headerTitle" fill="#FAFAFF" />
                    </Link>
                    {menu}
                </div>
            </header>
        </>
    )
    }