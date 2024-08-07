import "../assets/css/Footer.css";
import FooterLogo from "./svgComponents/FooterLogo";
import { Link } from "react-router-dom";

export default function Footer({footerMenu}) {
    return  (
        <footer>
            <div>
                <ul>{footerMenu.map((option, i) => {
                    if (option === "shop") {
                        return (<li key={i}><Link to={"/shop"} className="navLink--footer">{option}</Link></li>)
                    } else {
                        return (<li key={i}><button>{option}</button></li>)
                    }
                })}</ul>
                <Link to={"/"} className="logoLink--footer">
                    <FooterLogo className="footerLogo" />
                </Link>
                <p>All rights reserved 2023 - Funkoshop &copy;</p>
            </div>
        </footer>
    )
};