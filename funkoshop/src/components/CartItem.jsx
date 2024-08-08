import "../assets/css/CartItem.css";
import ItemShopMinus from "./svgComponents/ItemShopMinus";
import ItemShopPlus from "./svgComponents/ItemShopPlus";
import CancelIcon from "./svgComponents/CancelIcon";

export default function CartItem({ name, quantity, itemsInCart, setItemsInCart, productsStock, setProductsStock }) {
    const item = itemsInCart.find(currentValue => currentValue.nameProduct === name);
    return (
        <>
            <tr className="cart-item">
                <td className="cart-item__details">
                    <div className="cart-item__info">
                        <div className="cart-item__image">
                            <img src={item.frontImg} alt={item.description} />
                        </div>
                        <div className="cart-item__description">
                            <h4 className="cart-item__name">{item.nameProduct}</h4>
                            <p className="cart-item__license">{item.license}</p>
                            <p className="cart-item__price">${item.price}</p>
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
                        <p className="cart-item__total-price">$ lorem,ipsum</p> {/*Sum of price of all products that are the same item.*/}
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