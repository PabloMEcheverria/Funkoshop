import "../assets/css/Header.css";
import HeaderLogo from "./svgComponents/HeaderLogo";
import TitleIcon from "./svgComponents/TitleIcon";
import CartIcon from "./svgComponents/CartIcon";
import ShopArrowDown from "./svgComponents/ShopArrowDown";
import Ellipse from "./svgComponents/Ellipse";
import { Link, redirect } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider.js";
import { useEffect } from "react";

export default function Header({user, loginStatus, headerMenu, itemsInCart}) {
    const { currentUser, logout } = useAuth();

    console.log(currentUser, loginStatus);

    const handleLogout = () => {
        logout();
        redirect("/home");
    }

    const setHeaderMenu = (user, loginStatus, itemsArr) => {
        console.log(user, itemsArr);

        let menuArr = [];

        if (loginStatus.isAdmin === true) {
            menuArr = ["ver tienda", "admin", "salir"];
        }
        if (user) {
            menuArr = ["shop", "contacto", "login", "cart"];
        } else {
            menuArr = ["shop", "contacto", "logout", "cart"];
        }

        let menuList = menuArr.map((value, i) => {
            let elementList;
            if (value === "ver tienda" || value === "shop") {
                elementList = <li key={i}>
                                <Link to={"/shop"}>
                                    {value}
                                </Link>
                              </li>
            } else if (value === "admin") {
                elementList = <li key={i}>
                                <Link to={"/admin"}>
                                    {value}
                                </Link>
                              </li>
            } else if (value === "salir" || value === "logout") {
                elementList = <li key={i}>
                                <button onClick={handleLogout}>{value}</button>
                              </li>
            } else if (value === "login") {
                elementList = <li key={i}>
                                <Link to={"/login"} className="navLink--header">
                                    {value}
                                </Link>
                              </li>
            } else if (value === "contacto") {
                elementList = <li key={i}>
                                <Link to={"/contact"} className="navLink--header">
                                    {value}
                                </Link>
                              </li>
            } else if (value === "cart") {
                if (itemsArr.length === 0) {
                    elementList = <li key={i}>
                                    <Link to={"/cart"} className="cartIconWrapper">
                                        <CartIcon className="cartIcon" />
                                    </Link>
                                  </li>
                } else {
                    elementList = <li key={i}>
                                    <Link to={"/cart"} className="cartIconWrapper">
                                        <CartIcon className="cartIcon" />
                                        <div className="ellipseIconWrapper">
                                            <Ellipse className="ellipseIcon" />
                                            <p className="ellipseIconNumber">{itemsArr.length}</p>
                                        </div>
                                    </Link>
                                  </li>
                }
            }
            return elementList
        })
    }

    setHeaderMenu(user, loginStatus, itemsInCart.items);

    useEffect(() => {
        loginStatus.isLogged = currentUser ? true : false;
    }, [user, currentUser, loginStatus])

    let menuList = loginStatus.headerMenu.map(option => {
        let keyValue = headerMenu.indexOf(option);
        if (typeof option === "object") {
            if (itemsInCart.items.length === 0) {
                return  <li key={keyValue}>
                            <Link to={"/cart"} className="cartIconWrapper">
                                <CartIcon className="cartIcon" />
                            </Link>
                        </li>
            } else {
                return  <li key={keyValue}>
                            <Link to={"/cart"} className="cartIconWrapper">
                                <CartIcon className="cartIcon" />
                                <div className="ellipseIconWrapper">
                                    <Ellipse className="ellipseIcon" />
                                    <p className="ellipseIconNumber">{itemsInCart.items.length}</p>
                                </div>
                            </Link>
                        </li>
            }   
        } else if (option === "shop") {
            return  <li key={keyValue}>
                        <Link to={"/shop"} className="navLink--header">
                            {option}<ShopArrowDown className="shopArrowDown" />
                        </Link>
                    </li>
        } else if (option === "login") {
            return  <li key={keyValue}>
                        <Link to={"/login"} className="navLink--header">
                            {option}
                        </Link>
                    </li>
        } else if (option === "logout") {
            return  <li key={keyValue}>
                        <button onClick={handleLogout}>{option}</button>
                    </li>
        } else if (option === "salir") {
            return  <li key={keyValue}>
                        <button onClick={() => alert("handling logout (salir)")}>{option}</button>
                    </li>
        } else if (option === "contacto") {
            return  <li key={keyValue}>
                        <button onClick={() => alert("handling contacto")}>{option}</button>
                    </li>
        } else if (option === "ver tienda") {
            return  <li key={keyValue}>
                        <button onClick={() => alert("handling ver tienda")}>{option}</button>
                    </li>
        }
    })
    
    return (
        <>
            <header>
                <div>
                    <Link to={"/"} className="logoLink--header">
                        <HeaderLogo className="headerLogo" />
                        <TitleIcon className="headerTitle" fill="#FAFAFF" />
                    </Link>
                    <ul>{menuList}</ul>
                </div>
            </header>
        </>
    )
};