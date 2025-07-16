import "./ItemPage.css";
import ItemShopPlus from "../../components/svgComponents/ItemShopPlus.jsx";
import ItemShopMinus from "../../components/svgComponents/ItemShopMinus.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.js";
import { useUser } from "../../context/UserContext.js";
import Carousel from "../../components/Carousel.jsx";

export default function ItemPage() {
    const { id } = useParams();
    const { user, products } = useUser();
    const { addItem } = useCart();
    const [product, setProduct] = useState({});
    const [visible, setVisible] = useState(false);
    const [currentPaymentMethod, setCurrentPaymentMethod] = useState(1);
    const [quantityToBuy, setQuantityToBuy] = useState(0);

    useEffect(() => {
        const foundProduct = products.find(item => item.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            setCurrentPaymentMethod(foundProduct.payment_methods[0]);
        }
    }, [products]);

    const handleClick = (e) => {
        console.log("Payment method clicked:", e.target.id);
        setCurrentPaymentMethod(parseInt(e.target.id));
    };
    const toggleVisibility = () => setVisible(!visible);
    const increment = () => {
        const availableProducts = products.filter(item => item.name_product === product.name_product).sort((a, b) => a.id - b.id);
        if (availableProducts.length === 0) {
            alert("No hay productos disponibles para agregar al carrito.");
            return;
        }
        if (quantityToBuy >= availableProducts.length) {
            alert("No hay suficientes unidades disponibles para agregar al carrito.");
            return;
        }
        if (quantityToBuy < 0) {
            alert("La cantidad a comprar no puede ser negativa.");
            return;
        }
        if (quantityToBuy < availableProducts.length) {
            setQuantityToBuy(quantityToBuy + 1);
        }
    };
    const decrement = () => quantityToBuy > 0 ? setQuantityToBuy(quantityToBuy - 1) : 0;
    const addToCart = () => {
        const availableProducts = products.filter(item => item.name_product === product.name_product).sort((a, b) => a.id - b.id);
        if (availableProducts.length === 0) {
            alert("No hay productos disponibles para agregar al carrito.");
            return;
        }
        if (availableProducts.length < quantityToBuy) {
            alert("No hay suficientes unidades disponibles para agregar al carrito.");
            return;
        }
        if (quantityToBuy === 0) {
            alert("Por favor, agregue al menos una unidad del producto a su carrito.");
            return;
        }
        if (quantityToBuy < 0) {
            alert("La cantidad a comprar no puede ser negativa.");
            return;
        }
        if (quantityToBuy > availableProducts.length) {
            alert("No hay tantas unidades disponibles. Intente agregar menos unidades de ese producto a su carrito.");
            return;
        }
        const itemsToAdd = availableProducts.slice(0, quantityToBuy);
        console.log("Items to add:", itemsToAdd);
        itemsToAdd.forEach(item => {
            addItem(item, currentPaymentMethod);
        });
        setQuantityToBuy(0);
    }
   return (
    <>
        <section className="product-details">
            <img className="product-details__image" src={product.front_img} alt={`Imagen de funko pop de ${product.name_product}`} />
            <div className="product-details__info">
                <p className="product-details__license">{product.license}</p>
                <h3 className="product-details__name">{product.name_product}</h3>
                <p className="product-details__description">{product.description}</p>
                <p className="product-details__price">{"$ " + product.price}</p>
                <div className="product-details__input-wrapper">
                    <input  className="product-details__input" 
                            type="number" 
                            value={quantityToBuy}
                            onChange={(e) => setQuantityToBuy(parseInt(e.target.value) || 0)} />
                    <div className="product-details__button-wrapper">
                        <button 
                            className={`product-details__button product-details__button--increment`}
                            onClick={increment}
                            disabled={quantityToBuy === products.filter(item => item.name_product === product.name_product).length}
                            >{<ItemShopPlus />}</button>
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
                        - { 
                            currentPaymentMethod === 1 ? 
                            "Efectivo o débito automático" : 
                            `${currentPaymentMethod} CUOTAS SIN INTERÉS`}
                    </p>
                </div>
                <ul className={ visible ? 
                                "product-details__payment-methods": 
                                "product-details__payment-methods hidden"}>
                    {Array.isArray(product.payment_methods) &&
                      product.payment_methods.map((method, index) => (
                        <li 
                          id={method}
                          onClick={handleClick}
                          key={index}
                          className="product-details__payment-method-item"
                        >
                          {method === 1 ? "Efectivo o débito automático" : `${method} CUOTAS SIN INTERÉS`}
                        </li>
                      ))
                    }
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