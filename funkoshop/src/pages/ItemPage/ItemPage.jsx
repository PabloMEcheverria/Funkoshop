import "./ItemPage.css";
import ItemShopPlus from "../../components/svgComponents/ItemShopPlus.jsx";
import ItemShopMinus from "../../components/svgComponents/ItemShopMinus.jsx";
import { useParams } from "react-router-dom";
import productsArr from "../../data/products";
import { useEffect, useState } from "react";
import Carousel from "../../components/Carousel.jsx";

export default function ItemPage({ itemsInCart, setItemsInCart }) {
    const params = useParams();
    const itemId = params.itemId;
    let prod = productsArr.filter(product => parseInt(itemId) === product.id)[0];
    const [product, setProduct] = useState(prod);
    const [visible, setVisible] = useState(false);
    const [quantityToBuy, setQuantityToBuy] = useState(0);
    useEffect(() => {}, [itemsInCart]);

    const handleClick =(e) => setProduct({...product, currentPaymentMethod: parseInt(e.target.id)});
    const toggleVisibility = () => setVisible(!visible);
    const increment = () => setQuantityToBuy(quantityToBuy + 1);
    const decrement = () => quantityToBuy > 0? setQuantityToBuy(quantityToBuy - 1) : 0;
    const addToCart = () => {
        if (quantityToBuy > 0) {
            let avaibleProductArr = productsArr.filter(obj => product.nameProduct === obj.nameProduct);
            if (quantityToBuy <= avaibleProductArr.length) {
                avaibleProductArr = avaibleProductArr.slice(0, quantityToBuy);
                let newProductArr = productsArr;
                avaibleProductArr.map(avaible => {
                    newProductArr = newProductArr.filter(product => product.id !== avaible.id);
                    return newProductArr
                });
                setItemsInCart([...itemsInCart, avaibleProductArr].flat(Infinity));
                //Delete the items inserted in the cart from the productArr here.
            } else {
                alert("No hay tantas unidades disponibles. Intente agregar menos unidades de ese producto a su carrito.");
            }
        } else {
            alert("Agregue al menos una unidad del producto a su carrito.")
        }
    }
   return (
    <>
        <section className="product-details">
            <img className="product-details__image" src={product.frontImg} alt={`Imagen de funko pop de ${product.nameProduct}`} />
            <div className="product-details__info">
                <p className="product-details__license">{product.license}</p>
                <h3 className="product-details__name">{product.nameProduct}</h3>
                <p className="product-details__description">{product.description}</p>
                <p className="product-details__price">{"$ " + product.price}</p>
                <div className="product-details__input-wrapper">
                    <input  className="product-details__input" 
                            type="number" 
                            value={quantityToBuy}
                            onChange={(e) => setQuantityToBuy(parseInt(e.target.value) || 0)} />
                    <div className="product-details__button-wrapper">
                        <button 
                            className="product-details__button product-details__button--increment"
                            onClick={increment}>{<ItemShopPlus />}</button>
                        <button 
                            className="product-details__button product-details__button--decrement"
                            onClick={decrement}>{<ItemShopMinus />}</button>
                    </div> 
                    <button className="product-details__button product-details__button--add-to-cart"
                            onClick={addToCart}>Agregar al Carrito</button>
                </div>
                <div className="product-details__payment-info">
                    <button className="product-details__payment-link" onClick={toggleVisibility}>Ver métodos de pago</button>
                    <p className="product-details__current-payment-method">
                        - { product.currentPaymentMethod === 1 ? 
                            "Efectivo o débito automático" : 
                            `${product.currentPaymentMethod} CUOTAS SIN INTERÉS`}
                    </p>
                </div>
                <ul className={ visible ? 
                                "product-details__payment-methods": 
                                "product-details__payment-methods hidden"}>
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
        <section className="ItemPage-news">
            <h2 className="ItemPage-news__title">productos relacionados</h2>
            <Carousel location="ItemPage" />
        </section>
    </>
   )
}