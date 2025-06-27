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
            const productsInCart = productsArr.filter(product =>
                cartArr.some(item => item.product_id === product.id)
            );

            const grouped = {};
            for (const product of productsInCart) {
                const key = product.name_product;
                if (!grouped[key]) {
                grouped[key] = [];
                }
                grouped[key].push(product);
            }

            const finalGroups = Object.entries(grouped).map(([groupName, productGroup]) => {
                const sortedGroup = [...productGroup].sort((a, b) => a.id - b.id);
                const quantity = sortedGroup.length;
            
                const totalPrice = (
                quantity === 0 ? 0 :
                quantity === 1 ? sortedGroup[0].price :
                sortedGroup[0].price * quantity - 1
                ).toFixed(2);
            
                const paymentMethods = cartArr
                .filter(item => sortedGroup.some(p => p.id === item.product_id))
                .map(item => item.current_payment_method);
            
                const methodStats = Array.from(new Set(paymentMethods)).map(method => ({
                method,
                quantity: paymentMethods.filter(m => m === method).length
                })).sort((a, b) => a.method - b.method);
            
                return {
                groupName,
                product: sortedGroup[0],
                productGroup: sortedGroup,
                product_quantity: quantity,
                totalPrice,
                paymentMethods: methodStats,
                userId: user?.id
                };
            });
            
            const orderedGroups = finalGroups.sort((a, b) =>
                a.groupName.localeCompare(b.groupName)
            );
            setGroupsInCart(orderedGroups);
            return orderedGroups;
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
                    const updatedCart = cart.filter(item => item.product_id !== product_id);
                    setCart(updatedCart);
                    console.log(mergeCartProducts(products, updatedCart));
                    mergeCartProducts(products, updatedCart);
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

            return (
                <CartContext.Provider value={{ cart, groupsInCart, addItem, removeItem }}>
                    {children}
                </CartContext.Provider>
            )
        }

        export const useCart = () =>{
            return useContext(CartContext);
        }