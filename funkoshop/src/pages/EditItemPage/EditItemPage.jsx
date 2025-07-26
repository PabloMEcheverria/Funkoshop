import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './EditItemPage.css';
import ComboBox from '../../components/ComboBox';
import { useUser } from '../../context/UserContext.js';
import SelectArrowDown from '../../components/svgComponents/SelectArrowDown.jsx';

export default function EditItemPage() {
  const { products } = useUser();
  const [categories, setCategories] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [stock, setStock] = useState(0);
  const [stockInputArray, setStockInputArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLicense, setSelectedLicense] = useState('');
  const [selectedOption, setSelectedOption] = useState({
    payment_methods: "rgba(185, 185, 185, 1)",
    is_new: "rgba(185, 185, 185, 1)",
    is_special_edition: "rgba(185, 185, 185, 1)",
    is_favorite: "rgba(185, 185, 185, 1)"
  });
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const singleSkuWrapper = useRef(null);
  const selectRef = useRef(null);
  const params = useParams();

  useEffect(() => {
    setCategories([...new Set(products.map(product => product.collection))]);
    setLicenses([...new Set(products.map(product => product.license))]);
    setProductToEdit(products.find(product => String(product.id) === params.itemId));
    console.log(products.find(product => String(product.id) === params.itemId));
  }, [products, params]);

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

  const handleArrowClick = () => {
    selectRef.current.focus();
  }

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 2) {
      alert("Debes seleccionar exactamente 2 archivos.");
      event.target.value = '';
    } else {
      setSelectedFiles([...files]);
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
        <div>
          <label htmlFor="discounts">Descuento:</label>
          <input 
            type="number" 
            name="discounts" 
            id="discounts" 
            placeholder="0%"
            required />
        </div>
        <div>
          <label htmlFor="payment-methods">Cuotas:</label>
          <div>
            <select 
              name="payment-methods" 
              id="payment-methods" 
              defaultValue={"0"} 
              ref={selectRef}
              onChange={(e) => {
                if (e.target.value === "") {
                  setSelectedOption({ ...selectedOption, payment_methods: "rgba(185, 185, 185, 1)" });
                } else {
                  setSelectedOption({ ...selectedOption, payment_methods: "rgba(31, 31, 31, 1)" });
                }
              }}
              style={{color: selectedOption.payment_methods }}
              required
              >
                <option value="" disabled>3 Cuotas sin interés</option>
                <option value="1">Efectivo o débito automático</option>
                <option value="3">3 Cuotas sin interés</option>
                <option value="6">6 Cuotas sin interés</option>
                <option value="12">12 Cuotas sin interés</option>
              </select>
              <SelectArrowDown onClick={handleArrowClick} />
          </div>
        </div>
        <div>
          <label htmlFor="is_new">Es nuevo:</label>
          <select 
            name="is_new" 
            id="is_new" 
            defaultValue={""} 
            required>
            <option value="" disabled>Seleccionar</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
          <SelectArrowDown />
        </div>
        <div>
          <label htmlFor="is_special_edition"></label>
          <select 
            name="is_special_edition" 
            id="is_special_edition">
            <option value="" disabled>Seleccionar</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
          <SelectArrowDown />
        </div>
        <div>
          <label htmlFor="is_favorite"></label>
          <select 
            name="is_favorite" 
            id="is_favorite">
            <option value="" disabled>Seleccionar</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
          <SelectArrowDown />
        </div>
        <div>
          <p>Imágenes:</p>
          <label htmlFor="images">
              <p>
                {selectedFiles === null ? "No se ha seleccionado ningún archivo" : "2 archivos"}
              </p>
              <input 
                type="file" 
                id="images" 
                name="images" 
                accept="image/*" 
                multiple
                required
                onChange={handleFileChange}
               />
          </label>
          <div>
            <article>
              <figure>
                <img src={productToEdit.front_img} alt={productToEdit.description + " Imagen frontal del producto."} />
                <figcaption>Frente</figcaption>
              </figure>
            </article>
            <article>
              <figure>
                <img src={productToEdit.back_img} alt={productToEdit.description + " Imagen trasera o de la caja del producto."} />
                <figcaption>Dorso</figcaption>
              </figure>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
