import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const fetchCart = async () => {
            const { data, error } = await supabase.from("cart_items").select("*");
            if (error) {
                console.error("Error fetching cart items:", error);
            } else {
                setCart(data);
            }
        }
        fetchCart();
    }, []);

    const addItem = async (product) => {
        const { data, error } = await supabase.from("cart_items").insert([product]);
        if (error) {
            console.error("Error adding item to cart:", error);
        } else {
            setCart(prevCart => [...prevCart, data[0]]);
        }
    };

    const removeItem = async (id) => {
        const { error } = await supabase.from("cart_items").delete().eq("id", id);
        if (error) {
            console.error("Error removing item from cart:", error);
        } else {
            setCart(prevCart => prevCart.filter(item => item.id !== id));
        }
    }

    const clearCart = async () => {
        const { error} = await supabase.from("cart_items").delete();
        if (error) {
            console.error("Error clearing cart:", error);
        } else {
            setCart([]);
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