import "../assets/css/CartItem.css";
import ItemShopMinus from "./svgComponents/ItemShopMinus";
import ItemShopPlus from "./svgComponents/ItemShopPlus";
import CancelIcon from "./svgComponents/CancelIcon";
import { useEffect, useState } from "react";

export default function CartItem({ name, initialQuantity, itemsInCart, setItemsInCart, productsStock, setProductsStock }) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [cartProduct, setCartProduct] = useState({
        item: itemsInCart.find(currentValue => currentValue.nameProduct === name), 
        totalPrice: `$ ${Math.round((itemsInCart.find(currentValue => currentValue.nameProduct === name).price * quantity) * 100) / 100}`
    });

    useEffect(() => {
        let total = cartProduct.item.price * quantity;
        total = Math.round(total * 100) / 100;
        setCartProduct({...cartProduct, totalPrice: `$ ${total}`});
    }, [quantity, itemsInCart, productsStock]);

    const handleIncrement = (item, quantity, cart, stock) => {
        const itemInStock = stock.productsArr.find(currentValue => currentValue.nameProduct === item.nameProduct);
        if (itemInStock) {
            let indexItemInStock = stock.productsArr.findIndex(value => value.id === itemInStock.id);
            let newItemsInCart = [...cart, itemInStock];
            let newProductsStock = {...productsStock};
            newProductsStock.productsArr = productsStock.productsArr.toSpliced(indexItemInStock, 1);
            setItemsInCart(newItemsInCart);
            setProductsStock(newProductsStock);
            setQuantity(quantity + 1);
        } else {
            console.log("No se puede agregar más.");
        }
    }

    const handleDecrement = (item, quantity, cart, stock) => {
        console.log(item, quantity, cart, stock);
        const indexItemInCart = cart.findIndex(currentValue => currentValue.nameProduct === item.nameProduct);
        let newItemsInCart =[...itemsInCart];
        newItemsInCart = newItemsInCart.toSpliced(indexItemInCart, 1);
        console.log(indexItemInCart, newItemsInCart);
    }

    return (
        <>
            <tr className="cart-item">
                <td className="cart-item__details">
                    <div className="cart-item__info">
                        <div className="cart-item__image">
                            <img src={cartProduct.item.frontImg} alt={cartProduct.item.description} />
                        </div>
                        <div className="cart-item__description">
                            <h4 className="cart-item__name">{cartProduct.item.nameProduct}</h4>
                            <p className="cart-item__license">{cartProduct.item.license}</p>
                            <p className="cart-item__price">precio: $ {cartProduct.item.price}</p>
                        </div>
                    </div>
                    <div className="cart-item__controls">
                        <input className="cart-item__quantity" type="number" value={quantity} readOnly />
                        <div className="cart-item__buttons">
                            <button className="cart-item__button cart-item__button--plus" 
                                    onClick={() => handleIncrement(cartProduct.item, quantity, itemsInCart, productsStock)}>
                                {<ItemShopPlus className="cart-item__icon cart-item__icon--plus" />}
                            </button>
                            <button className="cart-item__button cart-item__button--minus" 
                                    onClick={() => handleDecrement(cartProduct.item, quantity, itemsInCart, productsStock)}>
                                {<ItemShopMinus className="cart-item__icon cart-item__icon--minus" />}
                            </button>
                        </div>
                    </div>
                    <div className="cart-item__summary">
                        <p className="cart-item__total-price">{cartProduct.totalPrice}</p> {/*Sum of price of all products that are the same item.*/}
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