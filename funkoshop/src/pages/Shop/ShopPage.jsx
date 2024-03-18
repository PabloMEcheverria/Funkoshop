import { uniqueProductsArr } from "../../data/products";
import { Link, Outlet } from "react-router-dom";
import "./ShopPage.css";

export default function ShopPage() {
    const linkProductArr = uniqueProductsArr.map((product) => (
        <Link key={product.id} to={`/shop/${product.id}`} style={{display: "block", marginBottom: "5px", marginLeft: "5px"}}>
            Product: {product.id}
        </Link>
    ));
    return (
        <>
            {linkProductArr}
            <Outlet />
        </>
    )   
}