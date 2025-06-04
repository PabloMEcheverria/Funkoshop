import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { useUser } from "./UserContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { fetchProducts } = useUser();
    const [cart, setCart] = useState([]);
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

    const addItem = async (product) => {
        const { data, error } = await supabase.from("cart_items").insert([
            {
                user_id: product.user_id,
                product_id: product.product_id,
                current_payment_method: product.current_payment_method
            }
        ]);
        if (error) {
            console.error("Error adding item to cart:", error);
        } else {
            if (data && data.length > 0) {
                setCart(prevCart => [...prevCart, data[0]]);
            }
            const { error: updateError } = await supabase
                .from("products")
                .update({is_available: false})
                .eq("id", product.product_id);
            if (updateError) {
                console.error("Error updating product availability:", updateError);
            } else {
                console.log("Product marked as unavailable in products table: ", product);
            }
            fetchProducts();
        }
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
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () =>{
    return useContext(CartContext);
}