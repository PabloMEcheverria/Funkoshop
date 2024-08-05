import { Link } from "react-router-dom";
import "./CartPage.css";
import CartItem from "../../components/CartItem";
export default function CartPage({ itemsInCart, setItemsInCart }) {
    function groupSameProduct(itemsInCart) {
        let cartArr = [];
        itemsInCart.map(currentValue => {
            let isFirstOfType = true;
            cartArr.map(cv => {
                if(cv.nameProduct === currentValue.nameProduct) {
                    isFirstOfType = !isFirstOfType;
                }
            });
            if (isFirstOfType) {
                cartArr.push({nameProduct: currentValue.nameProduct, quantity: 1});
            } else {
                let productToChange = cartArr.find(cv => cv.nameProduct === currentValue.nameProduct);
                let indexToChange = cartArr.findIndex(cv => cv.nameProduct === currentValue.nameProduct);
                productToChange = {...productToChange, quantity: productToChange.quantity + 1};
                cartArr.splice(indexToChange, 1, productToChange);
            };
        });
        console.log(cartArr);
        return cartArr
    }
    groupSameProduct(itemsInCart);
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
                    {groupSameProduct(itemsInCart).map((item, i) => (
                        <CartItem   key={i}
                                    name={item.nameProduct} 
                                    quantity={item.quantity} 
                                    itemsInCart={itemsInCart} 
                                    setItemsInCart={setItemsInCart} />))}
                </tbody>
            </table>
        </>
    )
}