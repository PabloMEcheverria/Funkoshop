import "./NotFoundPage.css";
import { Link, useRouteError } from "react-router-dom";

export default function NotFoundPage() {
    const error = useRouteError();
    return (
        <>
            <h1>Page not found</h1>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <button><Link to="/">Back to home</Link></button>
        </>
    )
}