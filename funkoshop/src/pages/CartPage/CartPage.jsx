import { Link } from "react-router-dom";
import "./CartPage.css";
import CartItem from "../../components/CartItem";
import { useEffect, useState } from "react";

import ItemShopMinus from "../../components/svgComponents/ItemShopMinus";
import ItemShopPlus from "../../components/svgComponents/ItemShopPlus";
import CancelIcon from "../../components/svgComponents/CancelIcon";

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
                    <tr className="cart-item" key={item.nameProduct + "__" + index} >
                        <td className="cart-item__details">
                            <div className="cart-item__info">
                                <div className="cart-item__image">
                                    <img src={item.frontImg} alt={item.description} />
                                </div>
                                <div className="cart-item__description">
                                    <h4 className="cart-item__name">{item.nameProduct}</h4>
                                    <p className="cart-item__license">{item.license}</p>
                                    <p className="cart-item__price">precio: $ {item.price}</p>
                                </div>
                            </div>
                            <div className="cart-item__controls">
                                <input className="cart-item__quantity" type="number" value={value.quantity} readOnly />
                                <div className="cart-item__buttons">
                                    <button 
                                        className="cart-item__button cart-item__button--plus" 
                                        disabled={getAvailability(itemsInCart.groupedItems[index]).isDisabledIncrement} 
                                        onClick={() => handleIncrement(value, itemsInCart.items, productsStock)}>
                                        {<ItemShopPlus 
                                            className="cart-item__icon cart-item__icon--plus" 
                                            fill={getAvailability(itemsInCart.groupedItems[index]).isDisabledIncrement ? "#F7C7B9" : "#F24E1E"} />}
                                    </button>
                                    <button 
                                        className="cart-item__button cart-item__button--minus" 
                                        disabled={getAvailability(itemsInCart.groupedItems[index]).isDisabledDecrement} 
                                        onClick={() => handleDecrement(value, itemsInCart.items, productsStock)}>
                                        {<ItemShopMinus 
                                            className="cart-item__icon cart-item__icon--minus" 
                                            fill={getAvailability(itemsInCart.groupedItems[index]).isDisabledDecrement ? "#F7C7B9" : "#F24E1E"} />}
                                    </button>
                                </div>
                            </div>
                            <div className="cart-item__summary">
                                <p className="cart-item__total-price">{totalPrice}</p>
                            </div>
                            <div>
                                <button className="cart-item__remove-button-wrapper" 
                                        onClick={() => handleRemove(value)}>
                                    <CancelIcon className="cart-item__remove-button" />
                                </button>
                            </div>
                        </td>
                    </tr>
                    )
                }
            )
        )
    }, [itemsInCart]);

    const handleIncrement = (groupedItem, cart, stock) => {
        const itemInStock = stock.productsArr.find(currentValue => currentValue.nameProduct === groupedItem.nameProduct);
        const indexItemInStock = stock.productsArr.findIndex(currentValue => currentValue.nameProduct === groupedItem.nameProduct);
        let newCart = structuredClone(cart);
        let newStock = structuredClone(stock);
        let newItemsInCart;
        if (indexItemInStock >= 0) {
            newCart = [...newCart, itemInStock];
            newCart = newCart.sort((a, b) => a.id - b.id);
            newStock.productsArr = newStock.productsArr.toSpliced(indexItemInStock, 1);
            newItemsInCart = {items: newCart, groupedItems: groupProducts(newCart)};
            setItemsInCart(newItemsInCart);
            setProductsStock(newStock);
        }
    }

    const handleDecrement = (groupedItem, cart, stock) => {
        const itemInCart = cart.find(currentValue => currentValue.nameProduct === groupedItem.nameProduct);
        const indexItemInCart = cart.findIndex(currentValue => currentValue.nameProduct === groupedItem.nameProduct);
        let newCart = structuredClone(cart);
        let newStock = structuredClone(stock);
        let newItemsInCart;
        if (indexItemInCart >= 0) {
            newCart = newCart.toSpliced(indexItemInCart, 1);
            newCart = newCart.sort((a, b) => a.id - b.id);
            newStock.productsArr = [...newStock.productsArr, itemInCart];
            newItemsInCart = {items: newCart, groupedItems: groupProducts(newCart)};
            setItemsInCart(newItemsInCart);
            setProductsStock(newStock);
        }
    }

    const handleRemove = (groupedItem) => {
        let newItems = itemsInCart.items.filter(value => value.nameProduct !== groupedItem.nameProduct);
        let newCart = {items: newItems, groupedItems: groupProducts(newItems)};
        setItemsInCart(newCart);
    }

    const getAvailability = (groupedItem) => {
        let isDisabledIncrement;
        let isDisabledDecrement;
        let availability = {
            isDisabledIncrement: true,
            isDisabledDecrement: true
        };
        if (groupedItem !== undefined) {
            isDisabledIncrement = productsStock.productsArr.find(value => value.nameProduct === groupedItem.nameProduct) ? false : true;
            isDisabledDecrement = itemsInCart.items.filter(value => value.nameProduct === groupedItem.nameProduct).length >= 2 ? false : true;
            availability.isDisabledIncrement = isDisabledIncrement;
            availability.isDisabledDecrement = isDisabledDecrement;
        }
        return availability
        
    }
    
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