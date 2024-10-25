import "../assets/css/Header.css";
import HeaderLogo from "./svgComponents/HeaderLogo";
import TitleIcon from "./svgComponents/TitleIcon";
import CartIcon from "./svgComponents/CartIcon";
//import ShopArrowDown from "./svgComponents/ShopArrowDown";
import Ellipse from "./svgComponents/Ellipse";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

export default function Header({ user, loginStatus, itemsInCart, token }) {
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);
    

    useEffect(() => {
        setHeaderMenu(user, loginStatus, itemsInCart.items);
    }, [user, loginStatus, itemsInCart]);

    const handleLogout = async () => {
        //setHeaderMenu(null, loginStatus, itemsInCart.items);
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log("Error cerrando sesión: ", error.message);
        } else {
            console.log("Sesión cerrada con éxito.");
            sessionStorage.removeItem("token");
            navigate("/");
        }
    }

    const setHeaderMenu = (user, loginStatus, itemsArr) => {
        let menuArr = [];

        if (loginStatus.isAdmin === true) {
            menuArr = ["ver tienda", "admin", "salir"];
        }
        if (token) {
            menuArr = ["shop", "contacto", "logout", "cart"];
        } else {
            menuArr = ["shop", "contacto", "login", "registrarse", "cart"];
        }

        const unorderedList =   <ul>
                                    {menuArr.map((value, i) => {
                                        if (value === "ver tienda" || value === "shop") {
                                            return (<li key={i}><Link to={"/shop"}className="navLink--header">{value}</Link></li>)
                                        }
                                        if (value === "admin") {
                                            return (<li key={i}><Link to={"/admin"}className="navLink--header">{value}</Link></li>)
                                        }
                                        if (value === "salir" || value === "logout") {
                                            return (<li key={i}><Link to={"/home"} onClick={handleLogout}className="navLink--header">{value}</Link></li>)
                                        }
                                        if (value === "login") {
                                            return (<li key={i}><Link to={"/login"} className="navLink--header">{value}</Link></li>)
                                        }
                                        if (value === "registrarse") {
                                            return (<li key={i}><Link to={"/register"} className="navLink--header">{value}</Link></li>)
                                        }
                                        if (value === "contacto") {
                                            return (<li key={i}><Link to={"/contact"} className="navLink--header">{value}</Link></li>)
                                        }
                                        if (value === "cart") {
                                            if (itemsArr.length === 0) {
                                                return (<li key={i}><Link to={"/cart"} className="cartIconWrapper"><CartIcon className="cartIcon" /></Link></li>)
                                            } else {
                                                return (<li key={i}>
                                                            <Link to={"/cart"} className="cartIconWrapper">
                                                              <CartIcon className="cartIcon" />
                                                              <div className="ellipseIconWrapper">
                                                                  <Ellipse className="ellipseIcon" />
                                                                  <p className="ellipseIconNumber">{itemsArr.length}</p>
                                                              </div>
                                                            </Link>
                                                        </li>)
                                            }
                                        }
                                    })}
                                </ul>
        setMenu(unorderedList);
        return (unorderedList)
    }

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
};