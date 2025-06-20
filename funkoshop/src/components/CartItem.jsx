import "../assets/css/CartItem.css";
import ItemShopMinus from "./svgComponents/ItemShopMinus";
import ItemShopPlus from "./svgComponents/ItemShopPlus";
import CancelIcon from "./svgComponents/CancelIcon";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import supabase from "../config/supabaseClient";

export default function CartItem({ group }) {
    const { product, product_quantity, totalPrice, userId } = group;
    const { cart, addItem, removeItem, clearCart } = useCart();
    const { products } = useUser();
    const inputRef = useRef(null);
    const [quantity, setQuantity] = useState(product_quantity);

    useEffect(() => {}, [cart]);

    const handleIncrement = async () => {
        console.log("Cart: ", cart);
        console.log("Products: ", products);
        console.log("Group: ", group);
        const availableProducts = products.filter(product => product.name_product === group.groupName && product.is_available);
        availableProducts.sort((a, b) => a.id - b.id);
        console.log("Available Products: ", availableProducts);
        const productsInCart = [];
        cart.forEach(item => {
            products.forEach(product => {
                if (item.product_id === product.id && product.name_product === group.groupName) {
                    productsInCart.push(item);
                }
            });
        });
        productsInCart.sort((a, b) => b.current_payment_method - a.current_payment_method);
        const currentPaymentMethod = productsInCart.length > 0 ? productsInCart[0].current_payment_method : 1;
        console.log("Current Payment Method: ", currentPaymentMethod);
        const productToAdd = availableProducts.length > 0 ? availableProducts[0] : null;
        console.log("Product to Add: ", productToAdd);
        if (productToAdd) {
            addItem(productToAdd, currentPaymentMethod);
            setQuantity(product_quantity + 1);
        }
    };

    const handleDecrement = () => {
        const matchingCartItems = [...cart].reverse().filter(item => {
                const matchingProduct = products.find(product => {
                    return product.id === item.product_id && product.name_product === group.groupName
                });
                return matchingProduct !== undefined;
            });
        const productToRemove = matchingCartItems[0];
        if (productToRemove) {
            removeItem(productToRemove);
            setQuantity(prev => Math.max(prev - 1, 0));
            console.log("Product removed from cart:", productToRemove);
        } else {
            console.warn("No se encontró item de carrito para remover.");
        }
    };

    const handleRemoveGroup = () => {};

    const getAvailability = () => {};

    return (
        <tr className="cart-item">
            <td className="cart-item__details">
                <div className="cart-item__info">
                    <div className="cart-item__image">
                        <img src={product.front_img} alt={product.description} />
                    </div>
                    <div className="cart-item__description">
                        <h4 className="cart-item__name">{product.name_product}</h4>
                        <p className="cart-item__license">{product.license}</p>
                        <p className="cart-item__price">precio: $ {product.price}</p>
                    </div>
                </div>
                <div className="cart-item__controls">
                    <input ref={inputRef} className="cart-item__quantity" type="number" value={quantity} readOnly />
                    <div className="cart-item__buttons">
                        <button 
                            className="cart-item__button cart-item__button--plus" 
                            disabled={getAvailability()} 
                            onClick={() => handleIncrement()}>
                            {<ItemShopPlus 
                                width="30px"
                                className="cart-item__icon cart-item__icon--plus" 
                                fill={getAvailability() ? "#F7C7B9" : "#F24E1E"} />}
                        </button>
                        <button 
                            className="cart-item__button cart-item__button--minus" 
                            disabled={getAvailability()} 
                            onClick={() => handleDecrement()}>
                            {<ItemShopMinus 
                                className="cart-item__icon cart-item__icon--minus" 
                                fill={getAvailability() ? "#F7C7B9" : "#F24E1E"} />}
                        </button>
                    </div>
                </div>
                <div className="cart-item__summary">
                    <p className="cart-item__total-price">{"$ " + totalPrice}</p>
                </div>
                <div className="cart-item__remove-button-wrapper">
                    <button className="cart-item__remove-button"
                            onClick={() => handleRemoveGroup()}>
                        <CancelIcon className="cart-item__remove-icon" />
                    </button>
                </div>
            </td>
        </tr>
    )
}