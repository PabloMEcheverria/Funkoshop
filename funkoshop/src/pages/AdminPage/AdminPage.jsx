import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import supabase from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import AdminPageAdd from '../../components/svgComponents/AdminPageAdd.jsx';
import AdminPageDelete from '../../components/svgComponents/AdminPageDelete.jsx';
import AdminPageEdit from '../../components/svgComponents/AdminPageEdit.jsx';
import AdminPageSearch from '../../components/svgComponents/AdminPageSearch.jsx';
import { useUser } from '../../context/UserContext.js';

export default function AdminPage() {
  const navigate = useNavigate();
  const { products, setProducts } = useUser();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  function normalizeString(str) {
    return str
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function handleSearch(e) {
    e.preventDefault();
    const normalizedSearch = normalizeString(searchTerm);

    if (normalizedSearch === '') {
      setFilteredProducts(products);
      return;
    }

    const filteredArray = products.filter(product => {
      const fields = [
        product.sku,
        product.name_product,
        product.license,
      ].map(normalizeString);

      return fields.some(field => field.includes(normalizedSearch));
    });

    if (filteredArray.length === 0) {
      alert('No se encontraron productos que coincidan con la búsqueda.');
    }

    setFilteredProducts(filteredArray);
  }

  function handleCreate() {
    navigate('/create');
  }

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmDelete) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;

      const newProducts = products.filter(product => product.id !== id);
      setProducts(newProducts);
      setFilteredProducts(prev => prev.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error.message);
      alert('Ocurrió un error al eliminar el producto.');
    }
  }

  if (!products || products.length === 0) {
    return <p>Cargando productos...</p>;
  }

  return (
    <main className="admin-page">
      <section className="admin-page__search">
        <form className="admin-page__form" onSubmit={handleSearch}>
          <input
            className="admin-page__input"
            type="text"
            placeholder="código, nombre o categoría"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              <button onClick={handleCreate} className="admin-page__add-button" type="button">
                <AdminPageAdd />
              </button>
            </div>
          </div>
        </header>

        <table className="admin-page__table" role="table" aria-label="Listado de productos">
          <thead className="admin-page__table-header">
            <tr className="admin-page__table-header-row">
              <th className="admin-page__table-header-cell">ID</th>
              <th className="admin-page__table-header-cell">Código</th>
              <th className="admin-page__table-header-cell">Nombre del Producto</th>
              <th className="admin-page__table-header-cell">Categoría</th>
              <th className="admin-page__table-header-cell">Acciones</th>
            </tr>
          </thead>
          <tbody className="admin-page__table-body">
            {Array.isArray(filteredProducts) && filteredProducts.map(product => (
              <tr className="admin-page__table-row" key={product.id}>
                <td className="admin-page__table-body-cell">{product.id}</td>
                <td className="admin-page__table-body-cell">{product.sku}</td>
                <td className="admin-page__table-body-cell">{product.name_product}</td>
                <td className="admin-page__table-body-cell">{product.license}</td>
                <td className="admin-page__table-actions">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="admin-page__button admin-page__edit-button"
                    type="button"
                  >
                    <AdminPageEdit width={32} height={33} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="admin-page__button admin-page__delete-button"
                    type="button"
                  >
                    <AdminPageDelete width={34} height={34} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}