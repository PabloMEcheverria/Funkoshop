import "../assets/css/Header.css";
import HeaderLogo from "./svgComponents/HeaderLogo";
import TitleIcon from "./svgComponents/TitleIcon";
import CartIcon from "./svgComponents/CartIcon";
import ShopArrowDown from "./svgComponents/ShopArrowDown";
import Ellipse from "./svgComponents/Ellipse";

export default function Header({headerMenu, itemsInCart}) {
    let menuList = headerMenu.map(option => {
        let keyValue = headerMenu.indexOf(option);
        if (typeof option === "object") {
            if (itemsInCart.length === 0) {
                return  <li key={keyValue}>
                        <button className="cartIconWrapper">
                            <CartIcon className="cartIcon" />
                        </button>
                    </li>
            } else {
                return  <li key={keyValue}>
                        <button className="cartIconWrapper">
                            <CartIcon className="cartIcon" />
                            <div className="ellipseIconWrapper">
                                <Ellipse className="ellipseIcon" />
                                <p className="ellipseIconNumber">{itemsInCart.length}</p>
                            </div>
                        </button>
                    </li>
            }   
        } else if (option === "shop") {
            return  <li key={keyValue}>
                        <button>
                            {option}<ShopArrowDown className="shopArrowDown" />
                        </button>
                    </li>
        } else {
            return <li key={keyValue}><button>{option}</button></li>
        }
    })

    return (
        <>
            <header>
                <div>
                    <div>
                        <HeaderLogo className="headerLogo" />
                        <TitleIcon className="headerTitle" fill="#FAFAFF" />
                    </div>
                    <ul>{menuList}</ul>
                </div>
            </header>
        </>
    )
};