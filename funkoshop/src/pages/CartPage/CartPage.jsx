import { Link } from "react-router-dom";
import "./CartPage.css";

export default function CartPage() {
    return (
        <>
            <h1 className="h1Cart">Cart page</h1>
            <p className="pCart">work in progress!</p>
            <Link to={"/Funkoshop"} className="buttonHome">Back to home</Link>
        </>
    )
}