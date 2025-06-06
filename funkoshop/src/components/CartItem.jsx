import "../assets/css/CartItem.css";
import ItemShopMinus from "./svgComponents/ItemShopMinus";
import ItemShopPlus from "./svgComponents/ItemShopPlus";
import CancelIcon from "./svgComponents/CancelIcon";
import { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import supabase from "../config/supabaseClient";

export default function CartItem({ product, product_quantity }) {
    const inputRef = useRef(null);
    const { cart, addItem, removeItem, clearCart } = useCart();
    useEffect(() => {
        if (cart.length === 0) {
            console.log("El carrito está vacío, espera la carga de datos...");
        } else {
            console.log("cart actualizado:", cart);
        }
    }, [cart]);
    const handleIncrement = async (product) => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("name_product", product.name_product)
            .eq("is_available", true);
        if (error) {
            console.error("Error fetching product availability:", error);
            return;
        }
        console.log("Productos disponibles:", data);
    };

    const handleDecrement = () => {};

    const handleRemove = () => {};

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
                    <input ref={inputRef} className="cart-item__quantity" type="number" value={product_quantity} readOnly />
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
                    <p className="cart-item__total-price">{"$ " + /*totalPrice*/ 0}</p>
                </div>
                <div className="cart-item__remove-button-wrapper">
                    <button className="cart-item__remove-button"
                            onClick={() => handleRemove()}>
                        <CancelIcon className="cart-item__remove-icon" />
                    </button>
                </div>
            </td>
        </tr>
    )
}