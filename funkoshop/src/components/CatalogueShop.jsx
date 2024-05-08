import "../assets/css/CatalogueShop.css";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function CatalogueShop({ paginationData }) {
    let { positionInPagination, segmentedProductArr } = paginationData;
    let arrToDisplay = segmentedProductArr[positionInPagination - 1];
    let linkProductArr;
    if (arrToDisplay !== undefined) {
        linkProductArr = arrToDisplay.map(product => (
            <Link key={product.id} to={`/shop/${product.id}`} className="product-grid__item">
                <Card key={product.id} product={product} customClassName="product-grid__card" />
            </Link>
        ));
    }
    return (
        <section className="product-grid">
            {linkProductArr}
        </section>
    )
}