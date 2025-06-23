    import { createContext, useContext, useState, useEffect } from "react";
    import supabase from "../config/supabaseClient";
    import { useUser } from "./UserContext";

    const CartContext = createContext();

    export const CartProvider = ({ children }) => {
        const [cart, setCart] = useState([]);
        const [groupsInCart, setGroupsInCart] = useState([]);
        const { user, products, fetchProducts } = useUser();
        useEffect(() => {
            fetchCart();
            mergeCartProducts(products, cart);
        }, [products, user]);

        const fetchCart = async () => {
            const { data, error } = await supabase.from("cart_items").select("*");
            if (error) {
                console.error("Error fetching cart items:", error);
            } else {
                setCart(data);
            }
        }

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
                const productGroup = group.slice(1).sort((a, b) => a.id - b.id);
                const paymentMethods = [];
                productGroup.forEach(product => {
                    cartArr.forEach(cartItem => {
                        if (product.id === cartItem.product_id) {
                            paymentMethods.push(cartItem.current_payment_method);
                        }
                    });
                });
                paymentMethods.sort((a, b) => a - b);
                let uniquePaymentMethods = new Set(paymentMethods);
                uniquePaymentMethods = Array.from(uniquePaymentMethods);
                uniquePaymentMethods = uniquePaymentMethods.map(method => {
                    method = {method: method, quantity: 0};
                    return method;
                })
                uniquePaymentMethods.forEach(method => {
                    paymentMethods.forEach(num => {
                        if (num === method.method) {
                            method.quantity++;
                        }
                    });
                });
                uniquePaymentMethods.sort((a, b) => a.method - b.method);
                array[i] = {
                    groupName: group[0], 
                    product: group[1], 
                    productGroup: productGroup,
                    product_quantity: group.length - 1, 
                    totalPrice: (group[1].price * (group.length - 1)).toFixed(2), 
                    paymentMethods: uniquePaymentMethods,
                    userId: user?.id
                };
            });
            if (groupedProductsInCart.length > 0) {
                groupedProductsInCart.sort((a, b) => a.groupName.localeCompare(b.groupName));
            }
            setGroupsInCart(groupedProductsInCart);
            return groupedProductsInCart;
        };

        const addItem = async (product, currentPaymentMethod) => {
            const { data, error } = await supabase
                .from("products")
                .select("id, is_available")
                .eq("id", product.id)
                .single();
            if (error || !data) {
                console.error("Error fetching product or product not found:", error);
                return;
            }
            if (!data.is_available) {
                console.error("El producto no está disponible en stock:", product.name_product);
                return;
            }
            const { data: cartData, error: cartError } = await supabase
                .from("cart_items")
                .insert([{
                    user_id: user.id,
                    product_id: product.id,
                    current_payment_method: currentPaymentMethod
                }])
                .select();

            if (cartError) {
                console.error("Error adding item to cart:", cartError);
                return;
            }

            if (cartData?.length > 0) {
                setCart(prevCart => [...prevCart, cartData[0]]);
            }
            console.log("Producto agregado al carrito:", product.id);

            const { error: updateError } = await supabase
                .from("products")
                .update({ is_available: false })
                .eq("id", product.id);

            if (updateError) {
                console.error("Error updating product availability:", updateError);
            } else {
                console.log("Producto marcado como no disponible:", product.id);
            }
            fetchProducts();
        };

        const removeItem = async (cartItem) => {
            const { id, product_id } = cartItem;
            const { error } = await supabase.from("cart_items").delete().eq("id", id);
            if (error) {
                console.error("Error removing item from cart:", error);
            } else {
                setCart(prevCart => prevCart.filter(item => item.product_id !== id));
            }
            const { error: updateError } = await supabase
                .from("products")
                .update({is_available: true})
                .eq("id", product_id);
            if (updateError) {
                console.error("Error updating product availability:", updateError);
            } else {
                console.log("Product marked as available in products table: ", id);
            }
            fetchProducts();
        }

        const clearCart = async () => {
            if (cart.length === 0) {
                console.log("El carrito ya está vacío.");
                return;
            } else {
                const { error } = await supabase.from("cart_items").delete();
                if (error) {
                    console.error("Error clearing cart:", error);
                } else {
                    cart.forEach(async item => {
                        const { error: updateError } = await supabase
                            .from("products")
                            .update({is_available: true})
                            .eq("id", item.product_id);
                        if (updateError) {
                            console.error("Error updating product availability:", updateError);
                        } else {
                            console.log("Product marked as available in products table: ", item.product_id);
                        }
                    });
                    setCart([]);
                    console.log("Carrito vacío.");
                }
            }
            
        }

        return (
            <CartContext.Provider value={{ cart, groupsInCart, addItem, removeItem, clearCart }}>
                {children}
            </CartContext.Provider>
        )
    }

    export const useCart = () =>{
        return useContext(CartContext);
    }