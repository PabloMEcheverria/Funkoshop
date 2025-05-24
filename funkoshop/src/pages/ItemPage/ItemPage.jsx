import "./ItemPage.css";
import ItemShopPlus from "../../components/svgComponents/ItemShopPlus.jsx";
import ItemShopMinus from "../../components/svgComponents/ItemShopMinus.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.js";
import { useUser } from "../../context/UserContext.js";
import Carousel from "../../components/Carousel.jsx";

export default function ItemPage({ itemsInCart, setItemsInCart, productsStock, setProductsStock }) {
    const params = useParams();
    const itemId = params.itemId;
    let prod = productsStock.productsArr.filter(product => parseInt(itemId) === product.id)[0];
    const [product1, setProduct1] = useState(prod);
    const [visible, setVisible] = useState(false);
    
    const { cart, addItem, removeItem, clearCart } = useCart();
    const { products, setProducts } = useUser();
    const [product, setProduct] = useState({payment_methods: []});
    const [currentPaymentMethod, setCurrentPaymentMethod] = useState(1);
    const [quantityToBuy, setQuantityToBuy] = useState(0);
    useEffect(() => {
        if (products.length > 0) {
            let currentProduct = products.filter(product => parseInt(itemId) === product.id)[0];
            if (!currentProduct) {
                currentProduct = products[0];
            }
            setProduct(currentProduct);
            console.log("Producto actual:", currentProduct);
        }
    }, [products]);

    const handleClick =(e) => setCurrentPaymentMethod(parseInt(e.target.id));
    const toggleVisibility = () => setVisible(!visible);
    const increment = () => setQuantityToBuy(quantityToBuy + 1);
    const decrement = () => quantityToBuy > 0 ? setQuantityToBuy(quantityToBuy - 1) : 0;
    const addToCart = () => {
        if (quantityToBuy < 1) {
            alert("Agregue al menos una unidad del producto a su carrito.")
            return;
        } else if (quantityToBuy > products.filter(item => item.name_product === product.name_product).length) {
            alert("No hay tantas unidades disponibles. Intente agregar menos unidades de ese producto a su carrito.");
            return;
        } else {
            const sameTypeProduct = products.filter(item => item.name_product === product.name_product);
            const productsToAdd = sameTypeProduct.slice(0, quantityToBuy);
            const productsReadyToAdd = productsToAdd.map(item => ({...item, current_payment_method: currentPaymentMethod}));
            console.log("Ready to add to cart:", productsReadyToAdd);
        }
    }
   return (
    <>
        <section className="product-details">
            <img className="product-details__image" src={product.front_img} alt={`Imagen de funko pop de ${product1.nameProduct}`} />
            <div className="product-details__info">
                <p className="product-details__license">{product1.license}</p>
                <h3 className="product-details__name">{product1.nameProduct}</h3>
                <p className="product-details__description">{product1.description}</p>
                <p className="product-details__price">{"$ " + product1.price}</p>
                <div className="product-details__input-wrapper">
                    <input  className="product-details__input" 
                            type="number" 
                            value={quantityToBuy}
                            onChange={(e) => setQuantityToBuy(parseInt(e.target.value) || 0)} />
                    <div className="product-details__button-wrapper">
                        <button 
                            className={`product-details__button product-details__button--increment`}
                            onClick={increment}
                            disabled={quantityToBuy === products.filter(item => {
                                return item.name_product === product.name_product
                            }).length}
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
                    {product.payment_methods.map((method, index) => (
                        <li 
                            id={method}
                            onClick={handleClick}
                            key={index} 
                            className="product-details__payment-method-item">
                                {method === 1 ? "Efectivo o débito automático" : `${method} CUOTAS SIN INTERÉS`}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
        <section className="ItemPage-news">
            <h2 className="ItemPage-news__title">productos relacionados</h2>
            <Carousel location="ItemPage" productsStock={productsStock} setProductsStock={setProductsStock} />
        </section>
    </>
   )
}