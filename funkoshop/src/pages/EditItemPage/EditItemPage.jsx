import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './EditItemPage.css';
import ComboBox from '../../components/ComboBox';
import { useUser } from '../../context/UserContext.js';
import SelectArrowDown from '../../components/svgComponents/SelectArrowDown.jsx';
import { replaceImagesByUrls } from "../../lib/supabase/replaceImagesByUrls.js";
import { updateProductsInProducts } from '../../lib/db/updateProductsInProducts.js';

export default function EditItemPage() {
  const { products } = useUser();
  const [categories, setCategories] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [stock, setStock] = useState(0);
  const [stockInputArray, setStockInputArray] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedLicense, setSelectedLicense] = useState('');
  const [selectedOption, setSelectedOption] = useState({
    payment_methods: "rgba(185, 185, 185, 1)",
    is_new: "rgba(185, 185, 185, 1)",
    is_special_edition: "rgba(185, 185, 185, 1)",
    is_favorite: "rgba(185, 185, 185, 1)"
  });
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productsToEditArray, setProductsToEditArray] = useState([]);
  const [editedProduct, setEditedProduct] = useState({});
  const singleSkuWrapper = useRef(null);
  const selectRef = useRef(null);
  const params = useParams();

  useEffect(() => {
    setCategories([...new Set(products.map(product => product.collection))]);
    setLicenses([...new Set(products.map(product => product.license))]);
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
          <div className="edit-form__field edit-form__field--sku-multiple" id={`sku_${i}`} key={`sku_${i}`}>
            <label className="edit-form__label edit-form__label--sku" htmlFor={`sku_${i}`}>{`SKU para el item n° ${i}:`}</label>
            <input 
              className="edit-form__input edit-form__input--sku"
              type="text" 
              name={`sku_${i}`}
              placeholder="SSK111AB001"
              defaultValue={firstSkuInput.value === "" ? "" : firstSkuInput.value + ` (${i})`} 
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

  const onSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  const skuObj = Object.keys(data)
    .filter(key => key.slice(0, 3) === "sku")
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  const productsToUpdateArray = Object.values(skuObj)
    .map(sku => products.find(product => product.sku === sku))
    .filter(Boolean);

  if (!selectedFiles || selectedFiles.length !== 2) {
    alert("Debes seleccionar 2 imágenes para actualizar.");
    return;
  }

  const currentImageUrls = [
    productsToUpdateArray?.[0]?.front_img ?? '',
    productsToUpdateArray?.[0]?.back_img ?? ''
  ];

  let newImageUrls = [];
  try {
    newImageUrls = await replaceImagesByUrls(currentImageUrls, selectedFiles);
  } catch (error) {
    console.error("Error al reemplazar imágenes:", error);
    alert("Hubo un error al subir las nuevas imágenes.");
    return;
  }

  const productsUpdatedArray = productsToUpdateArray.map(product => ({
    ...product,
    collection: data.collection,
    license: data.license,
    name_product: data.name_product,
    description: data.description,
    price: parseInt(data.price),
    discounts: parseInt(data.discounts),
    payment_methods: [parseInt(data.payment_methods)],
    is_new: data.is_new === "true",
    is_special_edition: data.is_special_edition === "true",
    is_favorite: data.is_favorite === "true",
    front_img: newImageUrls[0],
    back_img: newImageUrls[1]
  }));

  try {
    await updateProductsInProducts(productsUpdatedArray);
    alert("Productos actualizados con éxito.");
  } catch (err) {
    console.error("Error al actualizar productos en la base de datos", err);
    alert("No se pudieron actualizar los productos.");
  }
};


  return (
    <main className="edit-form">
      <h1 className="edit-form__title">Editar ítem</h1>
      <form className="edit-form__body" onSubmit={onSubmit}>
        <section className="edit-form__group">
          <div className="edit-form__field edit-form__field--collection">
            <label className="edit-form__label edit-form__label--collection" htmlFor="collection">Categoría:</label>
            <ComboBox
              setValueState={setSelectedCollection}
              optionsArray={categories}
              inputId="collection"
            />
          </div>
          <div className="edit-form__field edit-form__field--license">
            <label className="edit-form__label edit-form__label--license" htmlFor="license">Licencia:</label>
            <ComboBox
              setValueState={setSelectedLicense}
              optionsArray={licenses}
              inputId="license"
            />
          </div>
        </section>
        <div className="edit-form__field edit-form__field--name">
          <label className="edit-form__label edit-form__label--name_product" htmlFor="name_product">Nombre del producto:</label>
          <input
            className="edit-form__input edit-form__input--name"
            type="text"
            id="name_product"
            name="name_product"
            placeholder="Kakashi Hatake Shippuden Saga"
            defaultValue={productToEdit ? productToEdit.name_product : ""}
            required
          />
        </div>
        <textarea
          className="edit-form__textarea"
          name="description"
          id="description"
          placeholder="Descripción del producto..."
          defaultValue={productToEdit ? productToEdit.description : ""}
          required
        >
        </textarea>
        <section className="edit-form__group edit-form__group--bottom">
          <div className="edit-form__field edit-form__field--sku" ref={singleSkuWrapper}>
            <label className="edit-form__label edit-form__label--sku" htmlFor="sku">
              {stock <= 1 ? "SKU:" : "SKU para el item n° 1:"}
            </label>
            <input
              className="edit-form__input edit-form__input--sku"
              type="text"
              name="sku"
              id="sku"
              placeholder="SSK111AB001"
              required
            />
          </div>
          {stockInputArray.map(input => input)}
          <div className="edit-form__field edit-form__field--price">
            <label className="edit-form__label" htmlFor="price">Precio:</label>
            <input
              className="edit-form__input edit-form__input--price"
              type="number"
              name="price"
              id="price"
              placeholder={productToEdit ? "$ " +  productToEdit.price : "$ 0"}
              defaultValue={productToEdit ? productToEdit.price : ""}
              required
            />
          </div>
          <div className="edit-form__field edit-form__field--stock">
            <label className="edit-form__label" htmlFor="stock">Stock:</label>
            <input
              className="edit-form__input edit-form__input--stock"
              type="number"
              name="stock"
              id="stock"
              placeholder="0"
              defaultValue={productsToEditArray ? productsToEditArray.length : 1}
              onBlur={handleChangeStock}
              required
            />
          </div>
          <div className="edit-form__field edit-form__field--discounts">
            <label className="edit-form__label" htmlFor="discounts">Descuento:</label>
            <input
              className="edit-form__input edit-form__input--discounts"
              type="number"
              name="discounts"
              id="discounts"
              placeholder="0%"
              defaultValue={productToEdit ? productToEdit.discounts : ""}
              required
            />
          </div>
          <div className="edit-form__field edit-form__field--payment_methods">
            <label className="edit-form__label" htmlFor="payment_methods">Cuotas:</label>
            <div className="edit-form__select-wrapper">
              <select
                className="edit-form__select edit-form__select--payment_methods"
                name="payment_methods"
                id="payment_methods"
                defaultValue={"0"}
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
              <SelectArrowDown className="edit-form__select-arrow edit-form__select-arrow--payment_methods" onClick={handleArrowClick} />
            </div>
          </div>
          <div className="edit-form__field edit-form__field--is-new">
            <label className="edit-form__label edit-form__label--is-new" htmlFor="is_new">Es nuevo:</label>
            <div className="edit-form__select-wrapper">
              <select className="edit-form__select edit-form__select--is-new" name="is_new" id="is_new" defaultValue={""} required>
                <option value="" disabled>Seleccionar</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
              <SelectArrowDown className="edit-form__select-arrow edit-form__select-arrow--is_new" />
            </div>
          </div>
          <div className="edit-form__field edit-form__field--is-special-edition">
            <label className="edit-form__label edit-form__label--is-special-edition" htmlFor="is_special_edition">Edición especial:</label>
            <div className="edit-form__select-wrapper">
              <select className="edit-form__select edit-form__select--is-special-edition" name="is_special_edition" id="is_special_edition" defaultValue="">
                <option value="" disabled>Seleccionar</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
              <SelectArrowDown className="edit-form__select-arrow edit-form__select-arrow--is_special_edition" />
            </div>
          </div>
          <div className="edit-form__field edit-form__field--is-favorite">
            <label className="edit-form__label edit-form__label--is-favorite" htmlFor="is_favorite">Es favorito:</label>
            <div className="edit-form__select-wrapper">
              <select className="edit-form__select edit-form__select--is-favorite" name="is_favorite" id="is_favorite" defaultValue="">
                <option value="" disabled>Seleccionar</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
              <SelectArrowDown className="edit-form__select-arrow edit-form__select-arrow--is_favorite" />
            </div>
          </div>
          <div className="edit-form__field edit-form__field--images">
            <div className="edit-form__field--images--images-wrapper">
              <p className="edit-form__label">Imágenes:</p>
              <label className="edit-form__file-label" htmlFor="images">
                <button className="edit-form__file-button">Elegir archivos</button>
                <p className="edit-form__file-status">
                  {selectedFiles === null ? "No se ha seleccionado ningún archivo" : "2 archivos"}
                </p>
                <input
                  className="edit-form__input edit-form__input--file"
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  required
                  onChange={handleFileChange}
                />
            </label>
            </div>
            <div className="edit-form__preview-wrapper">
              {productToEdit ? (
                <article className="edit-form__preview edit-form__preview--front">
                  <figure className="preview-figure preview-figure--front">
                    <img className="preview-figure__img" src={productToEdit.front_img} alt={`${productToEdit.description} Imagen frontal del producto.`} />
                    <figcaption className="preview-figure__caption">Frente</figcaption>
                  </figure>
                </article>
              ) : <p className="edit-form__loading-text">Cargando imagen frontal del producto...</p>}
    
              {productToEdit ? (
                <article className="edit-form__preview edit-form__preview--back">
                  <figure className="preview-figure preview-figure--back">
                    <img className="preview-figure__img" src={productToEdit.back_img} alt={`${productToEdit.description} Imagen trasera del producto.`} />
                    <figcaption className="preview-figure__caption">Dorso</figcaption>
                  </figure>
                </article>
              ) : <p className="edit-form__loading-text">Cargando imagen trasera del producto...</p>}
            </div>
          </div>
        </section>
        <button className="edit-form__button edit-form__button--submit" type="submit">Modificar producto</button>
      </form>
    </main>
  )
}
