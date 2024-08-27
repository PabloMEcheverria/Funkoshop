import { Link } from "react-router-dom";
import "./CartPage.css";
import CartItem from "../../components/CartItem";
import { useEffect, useState } from "react";

import ItemShopMinus from "../../components/svgComponents/ItemShopMinus";
import ItemShopPlus from "../../components/svgComponents/ItemShopPlus";
import CancelIcon from "../../components/svgComponents/CancelIcon";

export default function CartPage({ itemsInCart, setItemsInCart, productsStock, setProductsStock, groupProducts }) {
    const [buttonAvailability, setButtonAvailability] = useState({
        isDisabledIncrement: productsStock.productsArr.find(value => value.nameProduct === itemsInCart.groupedItems.nameProduct) ? false : true,
        isDisabledDecrement: itemsInCart.items.find(value => value.nameProduct === itemsInCart.groupedItems.nameProduct) ? false : true
    });
    const [tableRowsArr, setTableRowsArr] = useState([]);
    useEffect(() => {
        setTableRowsArr(itemsInCart.groupedItems.map((value, index) => {
            let totalPrice = itemsInCart.items.find(currentValue => currentValue.nameProduct === value.nameProduct).price * value.quantity;
            totalPrice = Math.round(totalPrice * 100) / 100;
            let item = itemsInCart.items.find(currentValue => currentValue.nameProduct === value.nameProduct);
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
                                        onClick={(event) => handleIncrement(event, value, itemsInCart.items, productsStock)}>
                                        {<ItemShopPlus 
                                            className="cart-item__icon cart-item__icon--plus" 
                                            fill={getAvailability(itemsInCart.groupedItems[index]).isDisabledIncrement ? "#F7C7B9" : "#F24E1E"} />}
                                    </button>
                                    <button 
                                        className="cart-item__button cart-item__button--minus" 
                                        disabled={getAvailability(itemsInCart.groupedItems[index]).isDisabledDecrement} 
                                        onClick={(event) => handleDecrement(event, value, itemsInCart.items, productsStock)}>
                                        {<ItemShopMinus 
                                            className="cart-item__icon cart-item__icon--minus" 
                                            fill={getAvailability(itemsInCart.groupedItems[index]).isDisabledDecrement ? "#F7C7B9" : "#F24E1E"} />}
                                    </button>
                                </div>
                            </div>
                            <div className="cart-item__summary">
                                <p className="cart-item__total-price">{totalPrice}</p> {/*Sum of price of all products that are the same item.*/}
                            </div>
                            <div>
                                <button className="cart-item__remove-button-wrapper">
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

    /**/
    const handleIncrement = (event, groupedItem, cart, stock) => {
        const clickedButton = event.currentTarget;
        const itemInStock = stock.productsArr.find(currentValue => currentValue.nameProduct === groupedItem.nameProduct);
        const indexItemInStock = stock.productsArr.findIndex(currentValue => currentValue.nameProduct === groupedItem.nameProduct);
        let newCart = structuredClone(cart);
        let newStock = structuredClone(stock);
        let newItemsInCart;
        if (indexItemInStock >= 0) {
            newCart = [...newCart, itemInStock];
            newStock.productsArr = newStock.productsArr.toSpliced(indexItemInStock, 1);
            newItemsInCart = {items: newCart, groupedItems: groupProducts(newCart)};
            setItemsInCart(newItemsInCart);
            setProductsStock(newStock);
        }
        if (newStock.productsArr.findIndex(currentValue => currentValue.nameProduct === groupedItem.nameProduct) < 0) {
            clickedButton.disabled = true;
        }
        console.log(itemsInCart, newItemsInCart);
    }

    const handleDecrement = (event, groupedItem, cart, stock) => {
        const clickedButton = event.currentTarget;
        const itemInCart = cart.find(currentValue => currentValue.nameProduct === groupedItem.nameProduct);
        const indexItemInCart = cart.findIndex(currentValue => currentValue.nameProduct === groupedItem.nameProduct);
        console.log(clickedButton, itemInCart, indexItemInCart);
        let newCart = structuredClone(cart);
        let newStock = structuredClone(stock);
        let newItemsInCart;
        if (indexItemInCart >= 0) {
            console.log(indexItemInCart >= 0, indexItemInCart);
            newCart = newCart.toSpliced(indexItemInCart, 1);
            newStock.productsArr = [...newStock.productsArr, itemInCart];
            newItemsInCart = {items: newCart, groupedItems: groupProducts(newCart)};
            setItemsInCart(newItemsInCart);
            setProductsStock(newStock);
        }
        console.log(newCart.findIndex(currentValue => currentValue.nameProduct === groupedItem.nameProduct) >= 0);
        if (newCart.findIndex(currentValue => currentValue.nameProduct === groupedItem.nameProduct) >= 0) {
            clickedButton.disabled = false;
        } else {
            clickedButton.disabled = true;
        }
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
            isDisabledDecrement = itemsInCart.items.find(value => value.nameProduct === groupedItem.nameProduct) ? false : true;
            availability.isDisabledIncrement = isDisabledIncrement;
            availability.isDisabledDecrement = isDisabledDecrement;
        }
        return availability
        
    }
    /**/
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
        </>
    )
}