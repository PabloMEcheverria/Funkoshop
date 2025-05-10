import React, { useContext, useEffect, useState, useRef } from 'react';
import './CreateItemPage.css';
import UserContext from '../../context/UserContext';
import ComboBox from '../../components/ComboBox';
import SelectArrowDown from '../../components/svgComponents/SelectArrowDown.jsx';

export default function CreateItemPage() {
  const { products } = useContext(UserContext);
  const selectRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLicense, setSelectedLicense] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    payment_methods: "rgba(185, 185, 185, 1)",
    is_new: "rgba(185, 185, 185, 1)",
    is_special_edition: "rgba(185, 185, 185, 1)",
    is_favorite: "rgba(185, 185, 185, 1)"
  });
  const [selectedFiles, setSelectedFiles] = useState(null);
  
  useEffect(() => {
    setCategories([...new Set(products.map(product => product.collection))]);
    setLicenses([...new Set(products.map(product => product.license))]);
  }, [products]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const stock = event.target.stock.value;
    const isValidStock = /^[0-9]+$/.test(stock);
    const newItemArr = [];
    if (isValidStock) {
      for (let i = 0; i < stock; i++) {
        const sku = event.target.sku.value;
        newItemArr.push({
          sku: event.target.sku.value, 
          name_product: event.target.name_product.value, 
          collection: event.target.collection.value, 
          license: event.target.license.value, 
          description: event.target.description.value, 
          price: event.target.price.value, 
          payment_methods: event.target.payment_methods.value, 
          discounts: event.target.discounts.value, 
          front_img: [...event.target.images.files][0], 
          back_img: [...event.target.images.files][1], 
          is_new: event.target.is_new.value, 
          is_special_edition: event.target.is_special_edition.value, 
          is_favorite: event.target.is_favorite.value
        });
      }
    }
    const newItem = {
      sku: event.target.sku.value, 
      name_product: event.target.name_product.value, 
      collection: event.target.collection.value, 
      license: event.target.license.value, 
      description: event.target.description.value, 
      price: event.target.price.value, 
      payment_methods: event.target.payment_methods.value, 
      discounts: event.target.discounts.value, 
      front_img: [...event.target.images.files][0], 
      back_img: [...event.target.images.files][1], 
      is_new: event.target.is_new.value, 
      is_special_edition: event.target.is_special_edition.value, 
      is_favorite: event.target.is_favorite.value, 
      stock: event.target.stock.value
    }
    console.log(newItem);
  }

  const handleArrowClick = () => {
    console.log(selectRef.current);
    selectRef.current.focus();
  };

  const handleFileChange = (event) => {
    console.log([...event.target.files]);
    const files = event.target.files;
    if (files.length !== 2) {
      alert("Debes seleccionar exactamente dos archivos.");
      event.target.value = ""; // Limpia la selección si no cumple la condición
    } else {
      setSelectedFiles([...files]);
    }
  }; 

  return (
    <>
      <h1 className="form__title">Crear nuevo ítem</h1>
      <form className="form" onSubmit={handleSubmit}>
        <section className="form__field-group">
          <div className="form__field form__field--category">
            <label className="form__label--collection form__label--combobox" htmlFor="collection">Categoría:</label>
            <ComboBox
              valueState={selectedCategory}
              setValueState={setSelectedCategory}
              optionsArray={categories}
              inputId="collection"
            />
          </div>
          <div className="form__field form__field--license">
            <label className="form__label--license form__label--combobox" htmlFor="license">Licencia:</label>
            <ComboBox
              valueState={selectedLicense}
              setValueState={setSelectedLicense}
              optionsArray={licenses}
              inputId="license"
            />
          </div>
        </section>
        <div className="form__field form__field--product-name">
          <label className="form__label" htmlFor="name_product" >Nombre del producto:</label>
          <input className="form__input form__input--product-name" type="text" id="name_product" name="name_product" placeholder="Kakashi Hatake Shippuden Saga" required />
        </div>
        <textarea className="form__textarea" name="description" id="description" placeholder="Descripción del producto" required ></textarea>
        <section className="form__field-group form__field-group--bottom">
          <div className="form__field form__field--sku">
            <label className="form__label form__label--sku" htmlFor="sku">SKU:</label>
            <input className="form__input form__input--sku" type="text" id="sku" name="sku" placeholder="SSK111AB001" required />
          </div>
          <div className="form__field form__field--price">
            <label className="form__label" htmlFor="price">Precio:</label>
            <input className="form__input form__input--price" type="number" id="price" name="price" placeholder="$ 0.000,00" step=".01" required />
          </div>
          <div className="form__field form__field--stock">
            <label className="form__label" htmlFor="stock">Stock:</label>
            <input className="form__input form__input--stock" type="number" id="stock" name="stock" placeholder="0" required />
          </div>
          <div className="form__field form__field--discounts">
            <label className="form__label" htmlFor="discounts">Descuento:</label>
            <input className="form__input form__input--discounts" type="number" id="discounts" name="discounts" placeholder="0%" required />
          </div>
          <div className="form__field form__field--payment-methods">
            <label className="form__label" htmlFor="payment_methods">Cuotas:</label>
            <div className="form__select-wrapper">
              <select 
                className="form__select" 
                name="payment_methods" 
                id="payment_methods" 
                defaultValue="" 
                ref={selectRef}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setSelectedOption({ ...selectedOption, payment_methods: "rgba(185, 185, 185, 1)" });
                  } else {
                    setSelectedOption({ ...selectedOption, payment_methods: "rgba(31, 31, 31, 1)" });
                  }
                }}
                style={{ color: selectedOption.payment_methods }}
                required 
              >
                <option className="form__option--placeholder" value="" disabled>3 Cuotas sin interés</option>
                <option className="form__option" value="1">Efectivo o débito automático</option>
                <option className="form__option" value="3">3 Cuotas sin interés</option>
                <option className="form__option" value="6">6 Cuotas sin interés</option>
                <option className="form__option" value="12">12 Cuotas sin interés</option>
              </select>
              <SelectArrowDown onClick={handleArrowClick} className="form__select-arrow form__select-arrow--payment_methods" />
            </div>
          </div>
          <div className="form__field form__field--images">
            <p className="form__label form__label--file" >Imágenes:</p>
            <label className={selectedFiles === null ? "form__file-custom-wrapper" : "form__file-custom-wrapper form__file-custom-wrapper--justify-flex-start"} htmlFor="images">
                <button className="form__input--button">Elegir archivos</button>
                <p className="form__input--text">
                  {selectedFiles === null ? "No se ha seleccionado ningún archivo" : "2 archivos"}
                </p> 
                <input 
                  className="form__input form__input--file"
                  type="file" 
                  id="images" 
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  required />
            </label>
          </div>
          <div className="form__field form__field--new-item">
            <label className="form__label form__label--new-item" htmlFor="is_new">Es nuevo:</label>
            <select className="form__select form__select--new-item" name="is_new" id="is_new" defaultValue="" required >
              <option value="" disabled>Seleccionar</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
            <SelectArrowDown className="form__select-arrow form__select-arrow--new-item" />
          </div>
          <div className="form__field form__field--special-edition">
            <label className="form__label form__label--special-edition" htmlFor="is_special_edition">Es edición especial:</label>
            <select className="form__select form__select--special-edition" name="is_special_edition" id="is_special_edition" defaultValue="" required >
              <option value="" disabled>Seleccionar</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
            <SelectArrowDown className="form__select-arrow form__select-arrow--special-edition" />
          </div>
          <div className="form__field form__field--favorites">
            <label className="form__label form__label--favorites" htmlFor="is_favorite">Es favorito:</label>
            <select className="form__select form__select--favorites" name="is_favorite" id="is_favorite" defaultValue="" required>
              <option value="" disabled>Seleccionar</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
            <SelectArrowDown className="form__select-arrow form__select-arrow--favorites" />
          </div>
        </section>
        <section className="form__actions">
          <button className="form__button form__button--submit" type="submit">Agregar producto</button>
          <button className="form__button form__button--reset" type="reset">Limpiar</button>
        </section>
      </form>
    </>
  );
}
