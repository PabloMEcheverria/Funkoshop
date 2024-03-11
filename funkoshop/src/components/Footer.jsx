import "../assets/css/Footer.css";
import FooterLogo from "./svgComponents/FooterLogo";

export default function Footer({footerMenu}) {
    return  (
        <footer>
            <div>
                <ul>{footerMenu.map((option, i) => <li key={i}><button>{option}</button></li>)}</ul>
                <FooterLogo className="footerLogo" />
                <p>All rights reserved 2023 - Funkoshop &copy;</p>
            </div>
        </footer>
    )
};