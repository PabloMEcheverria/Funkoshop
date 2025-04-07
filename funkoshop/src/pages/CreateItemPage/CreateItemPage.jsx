import React, { useContext, useEffect, useState } from 'react';
import './CreateItemPage.css';
import CreatableSelect from 'react-select/creatable';
import UserContext from '../../context/UserContext';

export default function CreateItemPage() {
  const { products } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [licenses, setLicenses] = useState([]);

  
  useEffect(() => {
    setCategories([...new Set(products.map(product => product.collection))]);
    setLicenses([...new Set(products.map(product => product.license))]);
  }, [products]);

  const handleChange = (newValue, actionMeta) => {
    console.log('Value changed:', newValue, 'Action:', actionMeta.action);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  }

  return (
    <>
      <h1 className="form__title">Crear nuevo ítem</h1>
      <form className="form" action={handleSubmit}>
        <section className="form__field-group">
          <div className="form__field">
            <label className="form__label" htmlFor="collection">Categoría:</label>
            <CreatableSelect
              id="collection"
              name="collection"
              isClearable
              placeholder="Seleccionar"
              options={categories.map((category) => ({
                value: category,
                label: category,
              }))}
              styles={{
                control: (base, state) => ({
                  ...base,
                  boxSizing: "border-box",
                  height: "44.28px",
                  border: `2px solid ${
                    state.isFocused ? "rgba(255, 51, 51, 1)" : "rgba(48, 52, 63, 1)"
                  }`,
                  borderRadius: "6px",
                  transition: "border-color 0.2s ease",
                  ":hover": {
                    borderColor: "rgba(255, 51, 51, 1)", // Color al hacer hover
                  },
                  padding: "0",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "rgba(0, 0, 0, 1)", // Color del texto principal
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "rgba(185, 185, 185, 1)", // Color del placeholder
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "20px",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "rgba(0, 0, 0, 1)", // Color del valor seleccionado
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "100%",
                }),
                dropdownIndicator: (base, state) => ({
                  ...base,
                  color: state.isFocused ? "rgba(255, 51, 51, 1)" : "rgba(43, 43, 43, 1)",
                  ":hover": {
                    color: "rgba(255, 51, 51, 1)",
                  },
                }),
              }}
/>
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="collection">Categoría:</label>
            <CreatableSelect
              id="license"
              name="license"
              className="form__select"
              isClearable
              onChange={handleChange}
              placeholder="Seleccionar licencia" 
              options={licenses.map(license => ({ value: license, label: license }))}
            />
          </div>
        </section>
        <label className="form__label" htmlFor="name_product">Nombre del producto:</label>
        <input className="form__input" type="text" id="name_product" name="name_product" />
        <textarea className="form__textarea" name="description" id="description" placeholder="Descripción del producto"></textarea>
        <label className="form__label" htmlFor="sku">SKU:</label>
        <input className="form__input" type="text" id="sku" name="sku" />
        <label className="form__label" htmlFor="price">Precio:</label>
        <input className="form__input form__input--price" type="number" id="price" name="price" placeholder="$ 0.000,00" />
        <label className="form__label" htmlFor="stock">Stock:</label>
        <input className="form__input form__input--stock" type="number" id="stock" name="stock" placeholder="0" />
        <label className="form__label" htmlFor="discounts">Descuento:</label>
        <input className="form__input form__input--discounts" type="number" id="discounts" name="discounts" placeholder="0%" />
        <label className="form__label" htmlFor="payment_methods">Cuotas:</label>
        <select className="form__select" name="payment_methods" id="payment_methods">
          <option value="" disabled selected>3 Cuotas sin interés</option>
          <option value="1">Efectivo o débito automático</option>
          <option value="3">3 Cuotas sin interés</option>
          <option value="6">6 Cuotas sin interés</option>
          <option value="12">12 Cuotas sin interés</option>
        </select>
        <label className="form__label" htmlFor="productImages">Imágenes:</label>
        <input className="form__input form__input--file" type="file" id="productImages" name="productImages" accept="image/*" multiple required />
        <label className="form__label" htmlFor="is_new">Es nuevo:</label>
        <select className="form__select" name="is_new" id="is_new">
          <option value="" disabled selected>Seleccionar</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
        <label className="form__label" htmlFor="is_special_edition">Es edición especial:</label>
        <select className="form__select" name="is_special_edition" id="is_special_edition">
          <option value="" disabled selected>Seleccionar</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
        <label className="form__label" htmlFor="is_favorite">Es de la sección Favoritos:</label>
        <select className="form__select" name="is_favorite" id="is_favorite">
          <option value="" disabled selected>Seleccionar</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
        <section className="form__actions">
          <button className="form__button form__button--submit" type="submit">Agregar producto</button>
          <button className="form__button form__button--reset" type="reset">Limpiar</button>
        </section>
      </form>
    </>
  )
}
