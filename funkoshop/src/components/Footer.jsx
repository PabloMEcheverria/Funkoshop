import { useEffect, useState } from "react";
import "../assets/css/Footer.css";
import FooterLogo from "./svgComponents/FooterLogo";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

export default function Footer({ user, loginStatus, itemsInCart, token }) {
    const [footerList, setFooterList] = useState([]);

    useEffect(() => {
        setFooterMenu(user, loginStatus, itemsInCart.items);
    }, [user, loginStatus, itemsInCart]);

    const handleLogout = async () => {
        //setFooterMenu(null, loginStatus, itemsInCart.items);
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log("Error cerrando sesión: ", error.message);
        } else {
            console.log("Sesión cerrada con éxito.");
        }
    }

    const setFooterMenu = (user, loginStatus, itemsArr) => {
        let menuArr = [];

        if (token) {
            menuArr = ["shop", "registrarse", "contacto", "salir"];
        } else {
            menuArr = ["shop", "registrarse", "ingresar", "contacto"];
        }

        const unorderedList =   <ul>
                                    {menuArr.map((value, i) => {
                                        if (value === "shop") {
                                            return (<li key={i}><Link to={"/shop"} className="navLink--header">{value}</Link></li>)
                                        }
                                        if (value === "registrarse") {
                                            return (<li key={i}><Link to={"/register"} className="navLink--header">{value}</Link></li>)
                                        }
                                        if (value === "salir") {
                                            return (<li key={i}><Link to={"/home"} onClick={handleLogout} className="navLink--header">{value}</Link></li>)
                                        }
                                        if (value === "ingresar") {
                                            return (<li key={i}><Link to={"/login"} className="navLink--header">{value}</Link></li>)
                                        }
                                        if (value === "contacto") {
                                            return (<li key={i}><Link to={"/contact"} className="navLink--header">{value}</Link></li>)
                                        }
                                    })}
                                </ul>
        setFooterList(unorderedList);
        return (unorderedList)
    }

    return  (
        <footer>
            <div>
                {footerList}
                <Link to={"/"} className="logoLink--footer">
                    <FooterLogo className="footerLogo" />
                </Link>
                <p>All rights reserved 2023 - Funkoshop &copy;</p>
            </div>
        </footer>
    )
};