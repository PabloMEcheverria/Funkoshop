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
            <div>
                <p className="license">{product.license}</p>
                <h2 className="nameProduct">{product.nameProduct}</h2>
                <p>{product.price}</p>
                <input type="number" />
                <button>+</button>
                <button>-</button>
                <button>Agregar al Carrito</button>
                <div>
                    <a href="#">Ver métodos de pago</a>
                    <p>- {  product.paymentMethods.length === 1 ? 
                            "Efectivo o débito automático" : 
                            `${product.paymentMethods[product.paymentMethods.length - 1]} CUOTAS SIN INTERÉS`}</p>
                </div>
            </div>
        </section>
    </>
   )
}