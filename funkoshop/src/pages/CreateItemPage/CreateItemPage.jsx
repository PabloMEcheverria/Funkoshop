import React, { useContext, useEffect, useState } from 'react';
import './CreateItemPage.css';
import CreatableSelect from 'react-select/creatable';
import UserContext from '../../context/UserContext';
import ComboBox from '../../components/ComboBox';

export default function CreateItemPage() {
  const { products } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLicense, setSelectedLicense] = useState("");

  
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
      <form className="form" onSubmit={handleSubmit}>
        <section className="form__field-group">
          <div className="form__field--category">
            <label className="form__label" htmlFor="collection">Categoría:</label>
            <ComboBox
              valueState={selectedCategory}
              setValueState={setSelectedCategory}
              optionsArray={categories}
              inputId="collection"
            />
          </div>
          <div className="form__field--license">
            <ComboBox
              valueState={selectedLicense}
              setValueState={setSelectedLicense}
              optionsArray={licenses}
              label="Licencia:"
              inputId="license"
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
        <select className="form__select" name="payment_methods" id="payment_methods" defaultValue={""}>
          <option value="" disabled>3 Cuotas sin interés</option>
          <option value="1">Efectivo o débito automático</option>
          <option value="3">3 Cuotas sin interés</option>
          <option value="6">6 Cuotas sin interés</option>
          <option value="12">12 Cuotas sin interés</option>
        </select>
        <label className="form__label" htmlFor="productImages">Imágenes:</label>
        <input className="form__input form__input--file" type="file" id="productImages" name="productImages" accept="image/*" multiple required />
        <label className="form__label" htmlFor="is_new">Es nuevo:</label>
        <select className="form__select" name="is_new" id="is_new" defaultValue={""}>
          <option value="" disabled>Seleccionar</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
        <label className="form__label" htmlFor="is_special_edition">Es edición especial:</label>
        <select className="form__select" name="is_special_edition" id="is_special_edition" defaultValue={""}>
          <option value="" disabled>Seleccionar</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
        <label className="form__label" htmlFor="is_favorite">Es de la sección Favoritos:</label>
        <select className="form__select" name="is_favorite" id="is_favorite" defaultValue={""}>
          <option value="" disabled>Seleccionar</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
        <section className="form__actions">
          <button className="form__button form__button--submit" type="submit">Agregar producto</button>
          <button className="form__button form__button--reset" type="reset">Limpiar</button>
        </section>
      </form>
    </>
  );
}
