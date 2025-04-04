import React, { useContext, useEffect, useState } from 'react';
import './CreateItemPage';
import CreatableSelect from 'react-select/creatable';
import UserContext from '../../context/UserContext';

export default function CreateItemPage() {
  const { products, fetchProducts } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  
  useEffect(() => {
    setCategories([...new Set(products.map(product => product.collection))]);
    setLicenses([...new Set(products.map(product => product.license))]);
  }, [products]);

  const handleChange = (newValue, actionMeta) => {
    console.log('Value changed:', newValue, 'Action:', actionMeta.action);
  }

  return (
    <div>
        <h1>Crear nuevo item</h1>
        <form action="">
          <div>
            <CreatableSelect
              isClearable
              onChange={handleChange}
              placeholder="Seleccionar categoria" 
              options={categories.map(category => ({ value: category, label: category }))}
            />
            <CreatableSelect
              isClearable
              onChange={handleChange}
              placeholder="Seleccionar licencia" 
              options={licenses.map(license => ({ value: license, label: license }))}
            />
          </div>
          <label htmlFor="name_product">Nombre del producto:</label>
          <input type="text" id="name_product" name="name_product" />
          <textarea name="description" id="description" placeholder='Descripción del producto' ></textarea>
          <label htmlFor="sku">sku:</label>
          <input type="text" id="sku" name="sku" />
          <label htmlFor="price">Precio:</label>
          <input type="number" id="price" name="price" placeholder='$ 0.000,00' />
          <label htmlFor="stock"></label>
          <input type="number" id="stock" name="stock" placeholder='0' />
          <label htmlFor="discounts"></label>
          <input type="number" id="discounts" name="discounts" placeholder='0%' />
        </form>
        
    </div>
  )
}
