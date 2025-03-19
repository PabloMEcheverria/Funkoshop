import React from 'react';
import './AdminPage.css';
import supabase from '../../config/supabaseClient';
import { useState } from 'react';
import { useEffect } from 'react';
import AdminPageSearch from '../../components/svgComponents/AdminPageSearch.jsx';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        console.log('Error fetching products: ', error.message);
      } else {
        setProducts(data);
        setFilteredProducts(data);
        console.log('Products: ', data);
      }
    };
    fetchProducts();
  }, []);

  function normalizeString(str) {
    return str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function handleSeach(e) {
    e.preventDefault();
    const search = e.target[0].value;
    if (search === '') {
      setFilteredProducts(products);
    } else {
      const normalizedSearch = normalizeString(search);
      const filteredArray = products.filter( product => {
        const normalizedSku = normalizeString(product.sku);
        const normalizedNameProduct = normalizeString(product.name_product);
        const normalizedLicense = normalizeString(product.license);

        return normalizedSku.includes(normalizedSearch) || normalizedNameProduct.includes(normalizedSearch) || normalizedLicense.includes(normalizedSearch);
      });
      setFilteredProducts(filteredArray);
    }
  }
  
  return (
    <div className="admin-page">
      <form onSubmit={handleSeach}>
        <input type="text" placeholder='código, nombre o categoria' />
        <button type='submit'>
          <AdminPageSearch />
        </button>
      </form>
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
            <tbody>
              {
                filteredProducts.map( product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.sku}</td>
                    <td>{product.name_product}</td>
                    <td>{product.license}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
