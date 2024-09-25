import "../assets/css/Header.css";
import HeaderLogo from "./svgComponents/HeaderLogo";
import TitleIcon from "./svgComponents/TitleIcon";
import CartIcon from "./svgComponents/CartIcon";
import ShopArrowDown from "./svgComponents/ShopArrowDown";
import Ellipse from "./svgComponents/Ellipse";
import { Link, redirect } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider.js";
import { useEffect, useState } from "react";

export default function Header({user, loginStatus, headerMenu, itemsInCart}) {
    const { currentUser, logout } = useAuth();

    console.log(currentUser, loginStatus);

    const handleLogout = () => {
        logout();
    }

    const setHeaderMenu = (user, loginStatus, itemsArr) => {
        let menuArr = [];

        if (loginStatus.isAdmin === true) {
            menuArr = ["ver tienda", "admin", "salir"];
        }
        if (user) {
            menuArr = ["shop", "contacto", "logout", "cart"];
        } else {
            menuArr = ["shop", "contacto", "login", "cart"];
        }

        const unorderedList =   <ul>
                                    {menuArr.map((value, i) => {
                                        if (value === "ver tienda" || value === "shop") {
                                            return (
                                                <li key={i}>
                                                  <Link to={"/shop"}>
                                                      {value}
                                                  </Link>
                                                </li>
                                            )
                                        }
                                        if (value === "admin") {
                                            return (
                                                <li key={i}>
                                                  <Link to={"/admin"}>
                                                      {value}
                                                  </Link>
                                                </li>
                                            )
                                        }
                                        if (value === "salir" || value === "logout") {
                                            return (
                                                <li key={i}>
                                                    <Link to={"/home"} onClick={handleLogout}>
                                                        {value}
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        if (value === "login") {
                                            return (
                                                <li key={i}>
                                                  <Link to={"/login"} className="navLink--header">
                                                      {value}
                                                  </Link>
                                                </li>
                                            )
                                        }
                                        if (value === "contacto") {
                                            return (
                                                <li key={i}>
                                                  <Link to={"/contact"} className="navLink--header">
                                                      {value}
                                                  </Link>
                                                </li>
                                            )
                                        }
                                        if (value === "cart") {
                                            if (itemsArr.length === 0) {
                                                return (
                                                    <li key={i}>
                                                      <Link to={"/cart"} className="cartIconWrapper">
                                                          <CartIcon className="cartIcon" />
                                                      </Link>
                                                    </li>
                                                )
                                            } else {
                                                return (
                                                    <li key={i}>
                                                      <Link to={"/cart"} className="cartIconWrapper">
                                                          <CartIcon className="cartIcon" />
                                                          <div className="ellipseIconWrapper">
                                                              <Ellipse className="ellipseIcon" />
                                                              <p className="ellipseIconNumber">{itemsArr.length}</p>
                                                          </div>
                                                      </Link>
                                                    </li>
                                                )
                                            }
                                        }
                                    })}
                                </ul>
        console.log(menuArr, unorderedList);
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
                    {setHeaderMenu(user, loginStatus, itemsInCart.items)}
                </div>
            </header>
        </>
    )
};