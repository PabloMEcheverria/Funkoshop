import { useContext, useEffect, useState } from "react";
import "../assets/css/Footer.css";
import FooterLogo from "./svgComponents/FooterLogo";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);
    const { user, userProfile, setUser } = useContext(UserContext);

    useEffect(() => {
        setFooterMenu(user, userProfile);
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

    const setFooterMenu = (user, userProfile) => {
        let menuArr = [];

        if (user) {
            if (userProfile && userProfile.role === "admin") {
                menuArr = ["shop", "admin", "contacto", "salir"];
            } else if (userProfile && userProfile.role === "user") {
                menuArr = ["shop", "contacto", "cart", "salir"];
            }
        } else {
            menuArr = ["shop", "registrarse", "ingresar", "contacto"];
        }

        const unorderedList = (
            <ul>
                {menuArr.map((value, i) => {
                    if (value === "shop") {
                        return (
                            <li key={i}>
                                <Link to={"/shop"} className="navLink--footer">
                                    {value}
                                </Link>
                            </li>
                        );
                    }

                    if (value === "admin") {
                        return (
                            <li key={i}>
                                <Link to={"/admin"} className="navLink--footer">
                                    {value}
                                </Link>
                            </li>
                        );
                    }

                    if (value === "contacto") {
                        return (
                            <li key={i}>
                                <Link to={"/contacto"} className="navLink--footer">
                                    {value}
                                </Link>
                            </li>
                        );
                    }

                    if (value === "salir") {
                        return (
                            <li key={i}>
                                <Link to={"/home"} onClick={handleLogout} className="navLink--footer">
                                    {value}
                                </Link>
                            </li>
                        );
                    }

                    if (value === "cart") {
                        return (
                            <li key={i}>
                                <Link to={"/cart"} className="navLink--footer">
                                    {value}
                                </Link>
                            </li>
                        );
                    }

                    if (value === "registrarse") {
                        return (
                            <li key={i}>
                                <Link to={"/registrarse"} className="navLink--footer">
                                    {value}
                                </Link>
                            </li>
                        );
                    }

                    if (value === "ingresar") {
                        return (
                            <li key={i}>
                                <Link to={"/ingresar"} className="navLink--footer">
                                    {value}
                                </Link>
                            </li>
                        );
                    }
                })}
            </ul>
        );

        setMenu(unorderedList);
    }

    return  (
        <footer>
            <div>
                {menu}
                <Link to={"/"} className="logoLink--footer">
                    <FooterLogo className="footerLogo" />
                </Link>
                <p>All rights reserved 2025 - Funkoshop &copy;</p>
            </div>
        </footer>
    )
};