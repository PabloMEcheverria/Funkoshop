import { Link } from "react-router-dom";
import "./CartPage.css";
import CartItem from "../../components/CartItem";
export default function CartPage({ itemsInCart, setItemsInCart }) {
    function groupSameProduct(itemsInCart) {
    }
    groupSameProduct(itemsInCart);
    return (
        <>
            <h1 className="cart__title">Carrito de compras</h1>
            <table className="cart__table">
                <thead className="cart__thead">
                    <tr className="cart__row">
                        <th className="cart__header">detalle de producto</th>
                        <th className="cart__header">cantidad</th>
                        <th className="cart__header">total</th>
                    </tr>
                </thead>
                <tbody className="cart__tbody">
                    {}
                </tbody>
            </table>
        </>
    )
}