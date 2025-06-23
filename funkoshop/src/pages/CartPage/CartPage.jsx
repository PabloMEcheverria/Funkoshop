import "./CartPage.css";
import CartItem from "../../components/CartItem";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.js";
import { useUser } from "../../context/UserContext.js";

export default function CartPage({ itemsInCart }) {
    const { cart, groupsInCart } = useCart();
    const { user, products } = useUser();
    const [tableRowsArr, setTableRowsArr] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    
    useEffect(() => {
        createRowArr();
        getSubtotal();
    }, [cart, products, user]);

    const createRowArr = () => {
        let newTableRowsArr = groupsInCart.map((group, index) => {
            return (
                <CartItem 
                    key={index} 
                    group={group}
                />
            );
        });
        setTableRowsArr(newTableRowsArr);
    };

    const getSubtotal = () => {
        let subtotal = 0;
        cart.forEach(item => {
            const product = products.find(product => product.id === item.product_id);
            if (typeof product !== "undefined" && typeof product.price === "number") {
                subtotal += product.price;
            }
        });
        subtotal = parseFloat(subtotal.toFixed(2));
        setSubtotal(subtotal);
        return subtotal;
    };

    return (
        <>
            <h1 className="cart__title">Carrito de compras</h1>
            <table className="cart__table">
                <thead className="cart__thead">
                    <tr className="cart__row--header">
                        <th className="cart__header cart__header--details">detalle de producto</th>
                        <th className="cart__header cart__header--quantity">cantidad</th>
                        <th className="cart__header cart__header--total">total</th>
                    </tr>
                </thead>
                <tbody className="cart__tbody">
                    {tableRowsArr}
                </tbody>
            </table>
            <section className="summary">
                <h2 className="summary__title">resumen</h2>
                <ul className="summary__list">
                    <li className="summary__item">
                        <p className="summary__text">cantidad de elementos</p>
                        <p className="summary__value">{cart.length}</p>
                    </li>
                    <li className="summary__item">
                        <p className="summary__text">subtotal</p>
                        <p className="summary__value">{"$ " + subtotal}</p>
                    </li>
                    <li className="summary__item">
                        <p className="summary__text">envio</p>
                        <p className="summary__value">{"$ " + shippingCost}</p>
                    </li>
                    <li className="summary__item--total">
                        <p className="summary__text--total">total</p>
                        <p className="summary__value--total">{"$ " + (subtotal + shippingCost)}</p>
                    </li>
                </ul>
                <button className="summary__button">ir a pagar</button>
            </section>
        </>
    )
}