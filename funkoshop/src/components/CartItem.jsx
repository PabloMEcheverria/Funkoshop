import "../assets/css/CartItem.css";
import ItemShopMinus from "./svgComponents/ItemShopMinus";
import ItemShopPlus from "./svgComponents/ItemShopPlus";
import CancelIcon from "./svgComponents/CancelIcon";    

export default function CartItem({ value, index, item, totalPrice, itemsInCart, setItemsInCart, productsStock, setProductsStock, groupProducts}) {
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
        <tr className="cart-item">
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
                <div className="cart-item__remove-button-wrapper">
                    <button className="cart-item__remove-button"
                            onClick={() => handleRemove(value)}>
                        <CancelIcon />
                    </button>
                </div>
            </td>
        </tr>
    )
}