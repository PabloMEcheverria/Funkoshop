import React from 'react';
import './AdminPage.css';
import supabase from '../../config/supabaseClient';
import { useState } from 'react';
import { useEffect } from 'react';
import AdminPageAdd from '../../components/svgComponents/AdminPageAdd.jsx';
import AdminPageDelete from '../../components/svgComponents/AdminPageDelete.jsx';
import AdminPageEdit from '../../components/svgComponents/AdminPageEdit.jsx';
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
    <main className="admin-page">
      <section className="admin-page__search">
        <form className="admin-page__form" onSubmit={handleSeach}>
          <input 
            className="admin-page__input" 
            type="text" 
            placeholder="código, nombre o categoría" 
          />
          <button className="admin-page__button" type="submit">
            <AdminPageSearch />
          </button>
        </form>
      </section>

      <section className="admin-page__products">
        <header className="admin-page__header">
          <div className="admin-page__header-content">
            <h1 className="admin-page__title">Listado de productos</h1>
            <div className="admin-page__actions">
              <p className="admin-page__add-label">Agregar</p>
              <button className="admin-page__add-button" type="button">
                <AdminPageAdd />
              </button>
            </div>
          </div>
        </header>

        <table className="admin-page__table">
          <thead className="admin-page__table-header">
            <tr className="admin-page__table-header-row">
              <th className="admin-page__table-header-cell">ID</th>
              <th className="admin-page__table-header-cell">Código</th>
              <th className="admin-page__table-header-cell">Nombre del Producto</th>
              <th className="admin-page__table-header-cell">Categoria</th>
            </tr>
          </thead>
          <tbody className="admin-page__table-body">
            {filteredProducts.map(product => (
              <tr className="admin-page__table-row" key={product.id}>
                <td className="admin-page__table-body-cell">{product.id}</td>
                <td className="admin-page__table-body-cell">{product.sku}</td>
                <td className="admin-page__table-body-cell">{product.name_product}</td>
                <td className="admin-page__table-body-cell">{product.license}</td>
                <td className="admin-page__table-actions">
                  <button className="admin-page__button admin-page__edit-button" type="button">
                    <AdminPageEdit width={32} height={33} />
                  </button>
                  <button className="admin-page__button admin-page__delete-button" type="button">
                    <AdminPageDelete width={34} height={34} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
