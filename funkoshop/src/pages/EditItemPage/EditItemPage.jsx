import React, { useEffect, useState, UseRef } from 'react';
import './EditItemPage.css'
import ComboBox from '../../components/ComboBox';
import { useUser } from '../../context/UserContext.js';

export default function EditItemPage() {
  const { products } = useUser();
  const [categories, setCategories] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [stock, setStock] = useState(0);
  const [stockInputArray, setStockInputArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLicense, setSelectedLicense] = useState('');
  const singleSkuWrapper = UseRef(null);

  useEffect(() => {
    setCategories([...new Set(products.map(product => product.collection))]);
    setLicenses([...new Set(products.map(product => product.license))]);
  }, [products]);

  const handleChangeStock = (event) => {
    const firstSkuInput = singleSkuWrapper.current.lastChild;
    const stockNumber = Number(event.target.value);
    const stockArr = [];
    
    if (stockNumber < 0) {
      alert("El stock debe ser mayor a 0");
      event.target.value = 0;
      setStock(0);
      setStockInputArray([]);
      return;
    } else {
      for (let i = stockNumber; i > 1; i--) {
        stockArr.unshift(
          <div id={`sku_${i}`} key={`sku_${i}`}>
            <label htmlFor={`sku_${i}`}>{`SKU para el item n° ${i}:`}</label>
            <input 
              type="text" 
              name={`sku_${i}`}
              placeholder="SSK111AB001"
              defaultValue={firstSkuInput.value === "" ? "" : firstSkuInput + ` (${i})`} 
              required />
          </div>
        )
      }
      setStock(stockNumber);
      setStockInputArray(stockArr);
    }
  }

  return (
    <main>
      <h1>editar item</h1>
      <div>
        <label htmlFor='category' >Categoría:</label>
        <ComboBox 
          setValueState={setSelectedCategory} 
          optionsArray={categories} 
          inputId={'category'} />
      </div>
      <div>
        <label htmlFor="license">Licencia:</label>
        <ComboBox
          setValueState={setSelectedLicense} 
          optionsArray={licenses} 
          inputId={'license'} />
      </div>
      <div>
        <label htmlFor="name_product">Nombre del producto:</label>
        <input 
          type="text" 
          id="name_product" 
          name="name_product" 
          placeholder="Kakashi Hatake Shippuden Saga"
          required />
      </div>
      <textarea 
        name="description" 
        id="description" 
        placeholder="Descripción del producto" 
        required ></textarea>
      <section>
        <div ref={singleSkuWrapper}>
          <label htmlFor="sku">
            {stock <= 1 ? "SKU:" : "SKU para el item n° 1:"}
          </label>
          <input 
            type="text" 
            name="sku" 
            id="sku" 
            placeholder="SSK111AB001" 
            required />
        </div>
        {stockInputArray.map(input => input)}
        <div>
          <label htmlFor="price">Precio:</label>
          <input 
            type="number" 
            name="price" 
            id="price" 
            placeholder="0" 
            required />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input 
            type="number" 
            name="stock" 
            id="stock" 
            placeholder="0" 
            onChange={handleChangeStock} 
            required />
        </div>
      </section>
    </main>
  )
}
