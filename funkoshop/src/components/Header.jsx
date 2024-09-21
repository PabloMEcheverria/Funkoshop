import "../assets/css/Header.css";
import HeaderLogo from "./svgComponents/HeaderLogo";
import TitleIcon from "./svgComponents/TitleIcon";
import CartIcon from "./svgComponents/CartIcon";
import ShopArrowDown from "./svgComponents/ShopArrowDown";
import Ellipse from "./svgComponents/Ellipse";
import { Link } from "react-router-dom";

export default function Header({headerMenu, itemsInCart}) {
    let menuList = headerMenu.map(option => {
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
                        <button onClick={() => alert("handling logout")}>{option}</button>
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