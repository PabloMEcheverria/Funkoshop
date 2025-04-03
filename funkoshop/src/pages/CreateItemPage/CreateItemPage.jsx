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

  console.log('products', products);

  return (
    <div>
        <h1>Create item page</h1>
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
  )
}
