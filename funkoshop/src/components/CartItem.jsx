import "../assets/css/CartItem.css";
import ItemShopMinus from "./svgComponents/ItemShopMinus";
import ItemShopPlus from "./svgComponents/ItemShopPlus";
import CancelIcon from "./svgComponents/CancelIcon";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export default function CartItem({ group }) {
    const { product, productGroup, product_quantity, totalPrice, paymentMethods } = group;
    const { cart, addItem, removeItem} = useCart();
    const { products } = useUser();
    const inputRef = useRef(null);
    const [quantity, setQuantity] = useState(product_quantity);
    const [totalPriceGroup, setTotalPriceGroup] = useState(totalPrice);

    useEffect(() => {
        setQuantity(product_quantity);
        setTotalPriceGroup(totalPrice); 
    }, [cart, product_quantity, totalPrice]);

    const handleIncrement = async () => {
        const availableProducts = products.filter(product => product.name_product === group.groupName && product.is_available);
        availableProducts.sort((a, b) => a.id - b.id);
        if (availableProducts.length === 0) {
            console.log("No hay productos disponibles para agregar al carrito.");
            return;
        } else {
            const productToAdd = availableProducts[0];
            addItem(productToAdd, paymentMethods[paymentMethods.length - 1].method);
            setQuantity(prev => prev + 1);
            console.log("Producto agregado al carrito:", productToAdd);
        }
    };

    const handleDecrement = () => {
        console.log(group);
        const itemsInCart = [];
        cart.forEach(item => {
            productGroup.forEach(product => {
                if (item.product_id === product.id) {
                    itemsInCart.push(item);
                }
            });
        });
        itemsInCart.sort((a, b) => b.product_id - a.product_id);
        const productToRemove = itemsInCart[0];
        if (productToRemove) {
            removeItem(productToRemove);
            setQuantity(prev => Math.max(prev - 1, 0));
            console.log("Producto removido del carrito:", productToRemove);
        } else {
            console.warn("No se encontró item de carrito para remover.");
        }
    };

    const handleRemoveGroup = () => {
        const productsToDelete = JSON.parse(JSON.stringify(productGroup));
        const cartToDelete = cart.filter(item => productsToDelete.some(product => product.id === item.product_id));
        cartToDelete.forEach(item => {
            removeItem(item);
        });
        console.log("Grupo de productos removido del carrito:", productsToDelete);
        console.log("Carrito actualizado:", cart);
        setQuantity(0);
    };

    const getAvailability = () => {};

    return (
        <tr className="cart-item">
            <td className="cart-item__details">
                <div className="cart-item__info">
                    <div className="cart-item__image">
                        <img src={product.front_img} alt={product.description} />
                    </div>
                    <div className="cart-item__description">
                        <h4 className="cart-item__name">{product.name_product}</h4>
                        <p className="cart-item__license">{product.license}</p>
                        <p className="cart-item__price">precio: $ {product.price}</p>
                    </div>
                </div>
                <div className="cart-item__controls">
                    <input ref={inputRef} className="cart-item__quantity" type="number" value={quantity} readOnly />
                    <div className="cart-item__buttons">
                        <button 
                            className="cart-item__button cart-item__button--plus" 
                            disabled={getAvailability()} 
                            onClick={() => handleIncrement()}>
                            {<ItemShopPlus 
                                width="18"
                                className="cart-item__icon cart-item__icon--plus" 
                                fill={getAvailability() ? "#F7C7B9" : "#F24E1E"} />}
                        </button>
                        <button 
                            className="cart-item__button cart-item__button--minus" 
                            disabled={getAvailability()} 
                            onClick={() => handleDecrement()}>
                            {<ItemShopMinus 
                                className="cart-item__icon cart-item__icon--minus" 
                                fill={getAvailability() ? "#F7C7B9" : "#F24E1E"} />}
                        </button>
                    </div>
                </div>
                <div className="cart-item__summary">
                    <p className="cart-item__total-price">{"$ " + totalPriceGroup}</p>
                </div>
                <div className="cart-item__remove-button-wrapper">
                    <button className="cart-item__remove-button"
                            onClick={() => handleRemoveGroup()}>
                        <CancelIcon className="cart-item__remove-icon" />
                    </button>
                </div>
            </td>
        </tr>
    )
}