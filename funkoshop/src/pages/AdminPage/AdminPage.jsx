import React from 'react';
import './AdminPage.css';
import supabase from '../../config/supabaseClient';
import { useState } from 'react';
import { useEffect } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        console.log('Error fetching products: ', error.message);
      } else {
        setProducts(data);
        console.log('Products: ', data);
      }
    };

    fetchProducts();
  }, []);
  
  return (
    <div className="admin-page">
      <section>
        <div>
          <h1 className="admin-page__title">Listado de productos</h1>
          <div>
            <p>agregar</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre del Producto</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
