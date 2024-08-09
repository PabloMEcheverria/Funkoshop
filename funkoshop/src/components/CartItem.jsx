import "../assets/css/CartItem.css";
import ItemShopMinus from "./svgComponents/ItemShopMinus";
import ItemShopPlus from "./svgComponents/ItemShopPlus";
import CancelIcon from "./svgComponents/CancelIcon";
import { useEffect, useState } from "react";

export default function CartItem({ name, quantity, itemsInCart, setItemsInCart, productsStock, setProductsStock }) {
    const [cartProduct, setCartProduct] = useState({
        item: itemsInCart.find(currentValue => currentValue.nameProduct === name), 
        totalPrice: "$ "
    });
    useEffect(() => {
        let total = cartProduct.item.price * quantity;
        total = Math.round(total * 100) / 100;
        setCartProduct({...cartProduct, totalPrice: `$ ${total}`});
    }, [quantity, itemsInCart, productsStock, cartProduct]);
    return (
        <>
            <tr className="cart-item">
                <td className="cart-item__details">
                    <div className="cart-item__info">
                        <div className="cart-item__image">
                            <img src={cartProduct.item.frontImg} alt={cartProduct.item.description} />
                        </div>
                        <div className="cart-item__description">
                            <h4 className="cart-item__name">{cartProduct.item.nameProduct}</h4>
                            <p className="cart-item__license">{cartProduct.item.license}</p>
                            <p className="cart-item__price">precio: $ {cartProduct.item.price}</p>
                        </div>
                    </div>
                    <div className="cart-item__controls">
                        <input className="cart-item__quantity" type="number" defaultValue={quantity} />
                        <div className="cart-item__buttons">
                            <button className="cart-item__button cart-item__button--plus">
                                {<ItemShopPlus className="cart-item__icon cart-item__icon--plus" />}
                            </button>
                            <button className="cart-item__button cart-item__button--minus">
                                {<ItemShopMinus className="cart-item__icon cart-item__icon--minus" />}
                            </button>
                        </div>
                    </div>
                    <div className="cart-item__summary">
                        <p className="cart-item__total-price">{cartProduct.totalPrice}</p> {/*Sum of price of all products that are the same item.*/}
                    </div>
                    <div>
                        <button className="cart-item__remove-button-wrapper">
                            <CancelIcon className="cart-item__remove-button" />
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}