import "./CartPage.css";
import CartItem from "../../components/CartItem";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.js";
import { useUser } from "../../context/UserContext.js";

export default function CartPage({ itemsInCart, setItemsInCart, productsStock, setProductsStock, groupProducts }) {
    const [tableRowsArr, setTableRowsArr] = useState([]);
    const { cart } = useCart();
    const { products } = useUser();
    const { user } = useUser();
    
    useEffect(() => {
        createRowArr();
    }, [cart, products, user]);

    const mergeCartProducts = (productsArr, cartArr) => {
        let productsInCart = [];
        let groupedProductsInCart = [];
        productsArr.forEach(product => {
            cartArr.forEach(cartItem => {
                if (product.id === cartItem.product_id) {
                    productsInCart.push(product);
                }
            })
        });
        productsInCart.forEach(product => {
            if (groupedProductsInCart.length === 0) {
                groupedProductsInCart.push([product.name_product, product]);
            } else {
                let rightGroupIndex = groupedProductsInCart.findIndex(groupArray => groupArray[0] === product.name_product);
                if (rightGroupIndex === -1) {
                    groupedProductsInCart.push([product.name_product, product]);
                } else {
                    groupedProductsInCart[rightGroupIndex].push(product);
                }
            }
        });
        groupedProductsInCart.forEach((group, i, array) => {
            array[i] = {
                groupName: group[0], 
                product: group[1], 
                product_quantity: group.length - 1, 
                totalPrice: (group[1].price * (group.length - 1)).toFixed(2), 
                userId: user?.id
            };
        });
        return groupedProductsInCart;
    };

    const createRowArr = () => {
        let groupedProductsInCart = mergeCartProducts(products, cart);
        console.log("Grouped products in cart:", groupedProductsInCart);
        let newTableRowsArr = groupedProductsInCart.map((group, index) => {
            return (
                <CartItem 
                    key={index} 
                    group={group}
                />
            );
        });
        setTableRowsArr(newTableRowsArr);
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