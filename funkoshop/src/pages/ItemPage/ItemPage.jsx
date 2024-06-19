import "./ItemPage.css";
import { useParams } from "react-router-dom";
import productsArr from "../../data/products";
import { useState } from "react";

export default function ItemPage() {
    const params = useParams();
    const itemId = params.itemId;
    let prod = productsArr.filter(product => parseInt(itemId) === product.id)[0];
    prod = {...prod, currentPaymentMethod: prod.paymentMethods.length === 1 ? 
                                          "Efectivo o débito automático" : 
                                          `${prod.paymentMethods[prod.paymentMethods.length - 1]} CUOTAS SIN INTERÉS`}
    const [product, setProduct] = useState(prod);
    function handleClick(e) {
        console.log(e.target.id);
        setProduct({...product, currentPaymentMethod: parseInt(e.target.id) === 1 ? 
                                                      "Efectivo o débito automático" : 
                                                      `${e.target.id} CUOTAS SIN INTERÉS`})
    }
    console.log(product);
   return (
    <>
        <section className="product-details">
            <img className="product-details__image" src={product.frontImg} alt={`Imagen de funko pop de ${product.nameProduct}`} />
            <div className="product-details__info">
                <p className="product-details__license">{product.license}</p>
                <h2 className="product-details__name">{product.nameProduct}</h2>
                <p className="product-details__description">{product.description}</p>
                <p className="product-details__price">{"$ " + product.price}</p>
                <div className="product-details__input-wrapper">
                    <input className="product-details__input" type="number" />
                    <div className="product-details__button-wrapper">
                        <button className="product-details__button product-details__button--increment">+</button>
                        <button className="product-details__button product-details__button--decrement">-</button>
                    </div> 
                    <button className="product-details__button product-details__button--add-to-cart">Agregar al Carrito</button>
                </div>
                <div className="product-details__payment-info">
                    <a className="product-details__payment-link" href="/#">Ver métodos de pago</a>
                    <p className="product-details__current-payment-method">
                        - {product.currentPaymentMethod}
                    </p>
                </div>
                <ul className="product-details__payment-methods">
                    {product.paymentMethods.map(value => (
                        <li className="product-details__payment-method-item" 
                            id={value} 
                            key={value} 
                            onClick={handleClick}                        >
                            {value === 1 ? 
                                "Efectivo o débito automático" : 
                                `${value} CUOTAS SIN INTERÉS`}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    </>
   )
}