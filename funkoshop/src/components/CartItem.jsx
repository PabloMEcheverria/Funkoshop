import "../assets/css/CartItem.css";
import ItemShopMinus from "./svgComponents/ItemShopMinus";
import ItemShopPlus from "./svgComponents/ItemShopPlus";
import CancelIcon from "./svgComponents/CancelIcon";

export default function CartItem({ item, itemsInCart }) {
    return (
        <>
            <tr>
                <td>
                    <div>
                        <img src={item.frontImg} alt={item.description} />
                        <h4>{item.nameProduct}</h4>
                        <p>{item.collection}</p>
                        <p>{item.price}</p>
                    </div>
                    <div>
                        <input type="number" value="0" /> {/*Value equal to all products of the same item in cart.*/}
                        <button>
                            {<ItemShopPlus />}
                        </button>
                        <button>
                            {<ItemShopMinus />}
                        </button>
                    </div>
                    <p>$ lorem,ipsum</p> {/*Sum of price of all products that are the same item.*/}
                    <CancelIcon />
                </td>
            </tr>
        </>
    )
}