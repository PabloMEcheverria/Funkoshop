import { Link } from "react-router-dom";
import "./CartPage.css";
import CartItem from "../../components/CartItem";
import { useEffect, useState } from "react";
export default function CartPage({ itemsInCart, setItemsInCart, productsStock, setProductsStock }) {
    const [groupedItems, setGroupedItems] = useState([]);
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
                    {groupedItems.map((item, i) => (
                        <CartItem   key={i}
                                    name={item.nameProduct} 
                                    initialQuantity={item.quantity} 
                                    itemsInCart={itemsInCart} 
                                    setItemsInCart={setItemsInCart}
                                    productsStock={productsStock}
                                    setProductsStock={setProductsStock}
                                    groupedItems={groupedItems} />
                    ))}
                </tbody>
            </table>
        </>
    )
}