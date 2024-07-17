import "./NotFoundPage.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <>
            <h1>Page not found</h1>
            <button><Link to="/">Back to home</Link></button>
        </>
    )
}