import "../assets/css/CartItem.css";
import ItemShopMinus from "./svgComponents/ItemShopMinus";
import ItemShopPlus from "./svgComponents/ItemShopPlus";
import CancelIcon from "./svgComponents/CancelIcon";

export default function CartItem({ name, quantity, itemsInCart, setItemsInCart }) {
    const item = itemsInCart.find(currentValue => currentValue.nameProduct === name);
    return (
        <>
            <tr className="cart-item">
                <td className="cart-item__details">
                    <div className="cart-item__image">
                        <img src={item.frontImg} alt={item.description} />
                    </div>
                    <div className="cart-item__info">
                        <h4 className="cart-item__name">{item.nameProduct}</h4>
                        <p className="cart-item__collection">{item.collection}</p>
                        <p className="cart-item__price">${item.price}</p>
                    </div>
                    <div className="cart-item__controls">
                        <input className="cart-item__quantity" type="number" defaultValue={quantity} />
                        <button className="cart-item__button">
                            {<ItemShopPlus />}
                        </button>
                        <button className="cart-item__button">
                            {<ItemShopMinus />}
                        </button>
                    </div>
                    <p className="cart-item__total-price">$ lorem,ipsum</p> {/*Sum of price of all products that are the same item.*/}
                    <CancelIcon className="cart-item__remove-button" />
                </td>
            </tr>
        </>
    )
}