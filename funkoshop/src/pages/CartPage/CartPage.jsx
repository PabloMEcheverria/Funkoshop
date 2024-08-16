import { Link } from "react-router-dom";
import "./CartPage.css";
import CartItem from "../../components/CartItem";
import { useEffect, useState } from "react";

import ItemShopMinus from "../../components/svgComponents/ItemShopMinus";
import ItemShopPlus from "../../components/svgComponents/ItemShopPlus";
import CancelIcon from "../../components/svgComponents/CancelIcon";

export default function CartPage({ itemsInCart, setItemsInCart, productsStock, setProductsStock }) {
    const [groupedItems, setGroupedItems] = useState([]);
    /**/
    const [buttonAvailability, setButtonAvailability] = useState({
        isDisabledIncrement: productsStock.productsArr.find(value => value.nameProduct === groupedItems.nameProduct) ? false : true,
        isDisabledDecrement: itemsInCart.find(value => value.nameProduct === groupedItems.nameProduct) ? false : true
    });
    /**/
    useEffect(() => {
        function groupSameProduct(itemsInCart) {
            let cartArr = [];
            itemsInCart.forEach(currentValue => {
                let existingProduct = cartArr.find(item => item.nameProduct === currentValue.nameProduct);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cartArr.push({ nameProduct: currentValue.nameProduct, quantity: 1 });
                }
            });
            return cartArr;
        }
        setGroupedItems(groupSameProduct(itemsInCart));
    }, [itemsInCart]);

    /**/
    const handleIncrement = (cart, stock) => {
        console.log("increment");
    }

    const handleDecrement = (cart, stock) => {
        console.log("decrement");
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
                    {   
                        //groupedItems.map((item, i) => (
                        //   <CartItem   key={i}
                        //               name={item.nameProduct} 
                        //               initialQuantity={item.quantity} 
                        //               itemsInCart={itemsInCart} 
                        //               setItemsInCart={setItemsInCart}
                        //               productsStock={productsStock}
                        //               setProductsStock={setProductsStock}
                        //               groupedItems={groupedItems} 
                        //               setGroupedItems={setGroupedItems    } />
                        //   ))
                        
                        groupedItems.map((value, index) => {
                            let totalPrice = itemsInCart.find(currentValue => currentValue.nameProduct === value.nameProduct).price * value.quantity;
                            totalPrice = Math.round(totalPrice * 100) / 100;
                            let item = itemsInCart.find(currentValue => currentValue.nameProduct === value.nameProduct);
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
                                                    <button className="cart-item__button cart-item__button--plus" disabled={buttonAvailability.isDisabledIncrement} onClick={() => handleIncrement(itemsInCart, productsStock)}>
                                                        {<ItemShopPlus className="cart-item__icon cart-item__icon--plus" fill={buttonAvailability.isDisabledIncrement ? "#F7C7B9" : "#F24E1E"} />}
                                                    </button>
                                                    <button className="cart-item__button cart-item__button--minus" disabled={buttonAvailability.isDisabledDecrement} onClick={() => handleDecrement(itemsInCart, productsStock)}>
                                                        {<ItemShopMinus className="cart-item__icon cart-item__icon--minus"  fill={buttonAvailability.isDisabledDecrement ? "#F7C7B9" : "#F24E1E"} />}
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
                    }
                </tbody>
            </table>
        </>
    )
}