import { Link } from "react-router-dom";
import "./CartPage.css";
import CartItem from "../../components/CartItem";
import { useEffect, useState } from "react";

export default function CartPage({ itemsInCart, setItemsInCart, productsStock, setProductsStock, groupProducts }) {
    const [tableRowsArr, setTableRowsArr] = useState([]);
    
    useEffect(() => {
        setTableRowsArr(itemsInCart.groupedItems.map((value, index) => {
            let totalPrice;
            let item;
            if (itemsInCart.items.findIndex(currentValue => currentValue.nameProduct === value.nameProduct) >= 0) {
                totalPrice = itemsInCart.items.find(currentValue => currentValue.nameProduct === value.nameProduct).price * value.quantity;
                totalPrice = Math.round(totalPrice * 100) / 100;
                item = itemsInCart.items.find(currentValue => currentValue.nameProduct === value.nameProduct);
            } else {
                totalPrice = 0;
                item = productsStock.productsArr.find(currentValue => currentValue.nameProduct === value.nameProduct);
            }
            return (
                    <CartItem   
                            key={item.nameProduct + "__" + index}
                            value={value} 
                            index={index} 
                            item={item} 
                            totalPrice={totalPrice} 
                            itemsInCart={itemsInCart} 
                            setItemsInCart={setItemsInCart}
                            productsStock={productsStock} 
                            setProductsStock={setProductsStock} 
                            groupProducts={groupProducts}
                        />
                    )
                }
            )
        )
    }, [itemsInCart]);


    
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
                        <p className="summary__value--total">{parseFloat((itemsInCart.items.reduce((total, value) => {return total + value.price}, 0) + 0).toFixed(2))}</p>{/*The "+ 0" has to be replaced with the shipping price.*/}
                    </li>
                </ul>
                <button className="summary__button">ir a pagar</button>
            </section>
        </>
    )
}