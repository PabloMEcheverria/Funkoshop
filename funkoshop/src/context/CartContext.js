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
            console.log("Productos en el carrito:", productsInCart);
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
                array[i] = {
                    groupName: group[0], 
                    product: group[1], 
                    product_quantity: group.length - 1, 
                    totalPrice: (group[1].price * (group.length - 1)).toFixed(2), 
                    userId: user?.product_id
                };
            });
            console.log(groupedProductsInCart);
            setGroupsInCart(groupedProductsInCart);
            return groupedProductsInCart;
        };

        const addItem = async (product, currentPaymentMethod) => {
            const { data, error } = await supabase
                .from("products")
                .select("id, is_available")
                .eq("id", product.product_id)
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
                    product_id: product.product_id,
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
            console.log("Producto agregado al carrito:", product.product_id);

            const { error: updateError } = await supabase
                .from("products")
                .update({ is_available: false })
                .eq("id", product.product_id);

            if (updateError) {
                console.error("Error updating product availability:", updateError);
            } else {
                console.log("Producto marcado como no disponible:", product.product_id);
            }
            fetchProducts();
        };

        const removeItem = async (id) => {
            const { error } = await supabase.from("cart_items").delete().eq("id", id);
            if (error) {
                console.error("Error removing item from cart:", error);
            } else {
                setCart(prevCart => prevCart.filter(item => item.product_id !== id));
            }
            const { error: updateError } = await supabase
                .from("products")
                .update({is_available: true})
                .eq("id", id);
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