import "../assets/css/CatalogueShop.css";
import Card from "./Card";

export default function CatalogueShop({ paginationData }) {
    console.log("CatalogueShop rendered with paginationData:", paginationData);
    let { positionInPagination, segmentedProductArr } = paginationData;
    let arrToDisplay = segmentedProductArr[positionInPagination - 1];
    let linkProductArr;
    if (arrToDisplay !== undefined) {
        linkProductArr = arrToDisplay.map(product => (
            <Card   key={product.id} 
                    product={product} 
                    customClassName="product-grid__card" 
                    isInCatalogue={true} />
        ));
    }
    return (
        <section className="product-grid">
            {linkProductArr}
        </section>
    )
}