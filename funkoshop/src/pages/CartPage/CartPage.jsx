import "./CartPage.css";
import CartItem from "../../components/CartItem";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.js";
import { useUser } from "../../context/UserContext.js";

export default function CartPage({ itemsInCart, setItemsInCart, productsStock, setProductsStock, groupProducts }) {
    const [tableRowsArr, setTableRowsArr] = useState([]);
    const { cart } = useCart();
    const { products } = useUser();
    
    useEffect(() => {
        createRowArr();
    }, [cart]);
    
    const createRowArr = () => {
        console.log(cart);
        console.log(products);
        let productsInCart = [];
        let uniqueItemsArr = [];
        for (let i = 0; i < cart.length; i++) {
            productsInCart.push(products.filter(product => product.id === cart[i].product_id));
        }
        productsInCart = productsInCart.flat();
        productsInCart = productsInCart.map(product => product = product.name_product);
        console.log(productsInCart);
        for (let i = 0; i < productsInCart.length; i++) {
            if (i === 0) {
                uniqueItemsArr.push(productsInCart[i]);
            } else {
                if (!uniqueItemsArr.includes(productsInCart[i])) {
                    uniqueItemsArr.push(productsInCart[i]);
                }
            }
        }
        uniqueItemsArr = uniqueItemsArr.map(item => {
            return {
                name_product: item,
                stock: productsInCart.filter(product => product === item).length
            }
        });
        console.log(uniqueItemsArr);
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
                        <p className="summary__value">{itemsInCart.items.length}</p>
                    </li>
                    <li className="summary__item">
                        <p className="summary__text">subtotal</p>
                        <p className="summary__value">{parseFloat(itemsInCart.items.reduce((total, value) => {return total + value.price}, 0).toFixed(2))}</p>
                    </li>
                    <li className="summary__item">
                        <p className="summary__text">envio</p>
                        <p className="summary__value">$ 0,00</p>
                    </li>
                    <li className="summary__item--total">
                        <p className="summary__text--total">total</p>
                        <p className="summary__value--total">{parseFloat((itemsInCart.items.reduce((total, value) => {return total + value.price}, 0) + 0).toFixed(2))}</p>
                    </li>
                </ul>
                <button className="summary__button">ir a pagar</button>
            </section>
        </>
    )
}