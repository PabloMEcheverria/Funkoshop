import "./NotFoundPage.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <>
            <h1 className="h1--notFoundPage">Page not found</h1>
            <p className="p--notFoundPage">work in progress!</p>
            <Link to={"/Funkoshop"} className="buttonHome">Back to home</Link>
        </>
    )
}