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
  
  useEffect(() => {
    setCategories([...new Set(products.map(product => product.collection))]);
    setLicenses([...new Set(products.map(product => product.license))]);
  }, [products]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("SKU: ", event.target.sku.value);
    console.log("Stock: ", event.target.stock.value);
  }

  const handleArrowClick = () => {
    console.log(selectRef.current);
    selectRef.current.focus();
  };

  return (
    <>
      <h1 className="form__title">Crear nuevo ítem</h1>
      <form className="form" onSubmit={handleSubmit}>
        <section className="form__field-group">
          <div className="form__field form__field--category">
            <label className="form__label--combobox" htmlFor="collection">Categoría:</label>
            <ComboBox
              valueState={selectedCategory}
              setValueState={setSelectedCategory}
              optionsArray={categories}
              inputId="collection"
            />
          </div>
          <div className="form__field form__field--license">
            <label className="form__label--combobox" htmlFor="license">Licencia:</label>
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
          <input className="form__input" type="text" id="name_product" name="name_product" placeholder="Kakashi Hatake Shippuden Saga" />
        </div>
        <textarea className="form__textarea" name="description" id="description" placeholder="Descripción del producto"></textarea>
        <section className="form__field-group form__field-group--bottom">
          <div className="form__field form__field--sku">
            <label className="form__label" htmlFor="sku">SKU:</label>
            <input className="form__input" type="text" id="sku" name="sku" />
          </div>
          <div className="form__field form__field--price">
            <label className="form__label" htmlFor="price">Precio:</label>
            <input className="form__input form__input--price" type="number" id="price" name="price" placeholder="$ 0.000,00" />
          </div>
          <div className="form__field form__field--stock">
            <label className="form__label" htmlFor="stock">Stock:</label>
            <input className="form__input form__input--stock" type="number" id="stock" name="stock" placeholder="0" />
          </div>
          <div className="form__field form__field--discount">
            <label className="form__label" htmlFor="discounts">Descuento:</label>
            <input className="form__input form__input--discounts" type="number" id="discounts" name="discounts" placeholder="0%" />
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
            <label className="form__label form__label--file" htmlFor="images">Imágenes:</label>
            <input className="form__input--file" type="file" id="images" />
          </div>
          <div className="form__field form__field--new-item">
            <label className="form__label" htmlFor="is_new">Es nuevo:</label>
            <select className="form__select" name="is_new" id="is_new" defaultValue="">
              <option value="" disabled>Seleccionar</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="form__field form__field--special-edition">
            <label className="form__label" htmlFor="is_special_edition">Es edición especial:</label>
            <select className="form__select" name="is_special_edition" id="is_special_edition" defaultValue="">
              <option value="" disabled>Seleccionar</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="form__field form__field--favorites">
            <label className="form__label" htmlFor="is_favorite">Es de la sección Favoritos:</label>
            <select className="form__select" name="is_favorite" id="is_favorite" defaultValue="">
              <option value="" disabled>Seleccionar</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
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
