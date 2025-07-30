import supabase from "../../config/supabaseClient";

export const updateProductsInProducts = async (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    console.warn('No products to update');
    return;
  }

  try {
    const updates = products.map((product) =>
      supabase
        .from('products')
        .update(product)
        .eq('id', product.id)
    );

    const results = await Promise.all(updates);
    console.log('Products updated:', results);
  } catch (error) {
    console.error('Failed to update products:', error);
  }
};
