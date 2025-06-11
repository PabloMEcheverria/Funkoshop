    import { createContext, useContext, useState, useEffect } from "react";
    import supabase from "../config/supabaseClient";
    import { useUser } from "./UserContext";

    const CartContext = createContext();

    export const CartProvider = ({ children }) => {
        const { fetchProducts } = useUser();
        const [cart, setCart] = useState([]);
        const { user } = useUser();
        useEffect(() => {
            fetchCart();
        }, []);

        const fetchCart = async () => {
            const { data, error } = await supabase.from("cart_items").select("*");
            if (error) {
                console.error("Error fetching cart items:", error);
            } else {
                setCart(data);
            }
        }

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

        const removeItem = async (id) => {
            const { error } = await supabase.from("cart_items").delete().eq("id", id);
            if (error) {
                console.error("Error removing item from cart:", error);
            } else {
                setCart(prevCart => prevCart.filter(item => item.id !== id));
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
                            .eq("id", item.id);
                        if (updateError) {
                            console.error("Error updating product availability:", updateError);
                        } else {
                            console.log("Product marked as available in products table: ", item.id);
                        }
                    });
                    setCart([]);
                    console.log("Carrito vacío.");
                }
            }
            
        }

        return (
            <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
                {children}
            </CartContext.Provider>
        )
    }

    export const useCart = () =>{
        return useContext(CartContext);
    }