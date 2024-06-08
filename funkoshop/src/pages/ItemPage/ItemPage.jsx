import "./ItemPage.css";
import { useParams } from "react-router-dom";
import productsArr from "../../data/products";
import { useState } from "react";

export default function ItemPage() {
    const params = useParams();
    const itemId = params.itemId;
    const prod = productsArr.filter(product => parseInt(itemId) === product.id)[0];
    const [product, setProduct] = useState(prod);
    console.log(product);
   return (
    <>
        <section className="productDetails">
            <img src={product.frontImg} alt={"Imagen de funko pop de " + product.nameProduct} />
        </section>
    </>
   )
}