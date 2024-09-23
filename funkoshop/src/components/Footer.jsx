import "../assets/css/Footer.css";
import FooterLogo from "./svgComponents/FooterLogo";
import { Link } from "react-router-dom";

export default function Footer({footerMenu}) {
    return  (
        <footer>
            <div>
                <ul>{footerMenu.map((option, i) => {
                    let link;
                    if (option === "shop") {
                        link = (<li key={i}><Link to={"/shop"} className="navLink--footer">{option}</Link></li>);
                    } else if (option === "ingresar") {
                        link = (<li key={i}><Link to={"/login"} className="navLink--footer">{option}</Link></li>);
                    } else if (option === "contacto") {
                        link = (<li key={i}><Link to={"/contact"} className="navLink--footer">{option}</Link></li>);
                    } else if (option === "salir") {
                        link = (<li key={i}><Link to={"/logout"} className="navLink--footer">{option}</Link></li>);
                    }else if (option === "registrarse") {
                        link = (<li key={i}><Link to={"/register"} className="navLink--footer">{option}</Link></li>);
                    }
                    return link
                })}</ul>
                <Link to={"/"} className="logoLink--footer">
                    <FooterLogo className="footerLogo" />
                </Link>
                <p>All rights reserved 2023 - Funkoshop &copy;</p>
            </div>
        </footer>
    )
};