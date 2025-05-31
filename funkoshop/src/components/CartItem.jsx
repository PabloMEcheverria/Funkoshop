import "../assets/css/CartItem.css";
import ItemShopMinus from "./svgComponents/ItemShopMinus";
import ItemShopPlus from "./svgComponents/ItemShopPlus";
import CancelIcon from "./svgComponents/CancelIcon";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function CartItem({ name_product, stock }) {
    const { cart, addItem, removeItem, clearCart } = useCart();
    const item = cart.find(item => item.name_product === name_product);
    useEffect(() => {
        if (cart.length === 0) {
        console.log("El carrito está vacío, espera la carga de datos...");
        } else {
            console.log("cart actualizado:", cart);
        }
    }, [cart]);
    const handleIncrement = () => {}

    const handleDecrement = () => {}

    const handleRemove = () => {}

    const getAvailability = () => {};

    return (
        <tr className="cart-item">
            <td className="cart-item__details">
                <div className="cart-item__info">
                    <div className="cart-item__image">
                        <img src={item.front_img} alt={item.description} />
                    </div>
                    <div className="cart-item__description">
                        <h4 className="cart-item__name">{item.name_product}</h4>
                        <p className="cart-item__license">{item.license}</p>
                        <p className="cart-item__price">precio: $ {item.price}</p>
                    </div>
                </div>
                <div className="cart-item__controls">
                    <input className="cart-item__quantity" type="number" value={/*value.quantity*/0} readOnly />
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