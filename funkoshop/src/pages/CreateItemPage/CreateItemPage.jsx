import { useContext, useEffect, useState, useRef } from 'react';
import './CreateItemPage.css';
import { useUser } from '../../context/UserContext';
import ComboBox from '../../components/ComboBox';
import SelectArrowDown from '../../components/svgComponents/SelectArrowDown.jsx';
import supabase from '../../config/supabaseClient.js';

export default function CreateItemPage() {
  const { products } = useUser();
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
  const [stock, setStock] = useState(0);
  const [stockInputArray, setStockInputArray] = useState([]);
  const singleSkuWrapper = useRef(null);
  const fieldGroupBottom = useRef(null);
  const [skuArray, setSkuArray] = useState([]);

  useEffect(() => {
    setCategories([...new Set(products.map(product => product.collection))]);
    setLicenses([...new Set(products.map(product => product.license))]);
    if (fieldGroupBottom.current) {
      let sku = fieldGroupBottom.current.querySelectorAll("[id^='sku_']");
      sku = sku.length > 0 ? [...sku].map((input) => input.querySelector("input").value) : [];
      setSkuArray([...sku]);
    }
  }, [products, stockInputArray]);

  const checkIfImageExists = async (fileName) => {
    const { data, error } = await supabase.storage.from("products-images").list("", {search: fileName});

    if (error) {
      console.error("Error al listar archivos:", error.message);
      return false;
    }
    return data.some(file => file.name === fileName);
  };

  const handleChangeStock = (event) => {
    const firstSkuInput = singleSkuWrapper.current.lastChild;
    const stockNumber = Number(event.target.value);
    const stockArr = [];
    if (stockNumber < 0) {
      alert("El stock debe ser mayor a 0");
      event.target.value = "";
      setStock(0);
      setStockInputArray([]);
      return;
    } else {
      for (let i = stockNumber; i > 1; i--) {
        stockArr.unshift(
          <div className="form__field form__field--sku" id={`sku_${i}`} key={`sku_${i}`}>
            <label className="form__label form__label--sku" htmlFor={`sku_${i}`}>{`SKU para el item n° ${i}:`}</label>
            <input className="form__input form__input--sku" type="text" name={`sku_${i}`} placeholder="SSK111AB001" defaultValue={firstSkuInput.value === "" ? "" : firstSkuInput.value + ` (${i})`} required />
          </div>);
      }
      setStock(stockNumber);
      setStockInputArray(stockArr);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const skuInputs = fieldGroupBottom.current.querySelectorAll("[id^='sku_'] input");
    const newSkus = [...skuInputs].map(input => input.value.trim());
    const existingSkusValue = products.map(product => product.sku);
    const existingSkusInputs = [...skuInputs].filter(input => {
      const skuValue = input.value.trim();
      return existingSkusValue.includes(skuValue);
    });
    const duplicatedSkus = newSkus.filter(sku => existingSkusValue.includes(sku));
    const ItemsToCreate = [];
    if (duplicatedSkus.length > 0) {
      alert(`Los siguientes SKUs ya existen: ${duplicatedSkus.join(", ")}`);
      existingSkusInputs.forEach(input => {input.value = ""});
      return;
    } else {
      newSkus.forEach(sku => {
        const formData = new FormData(event.target);
        const item = {
          collection: selectedCategory,
          license: selectedLicense,
          name_product: formData.get("name_product"),
          description: formData.get("description"),
          sku: sku,
          price: formData.get("price"),
          discounts: formData.get("discounts"),
          front_img: selectedFiles[0],
          back_img: selectedFiles[1],
          payment_methods: formData.get("payment_methods") === "1" ? [1] : formData.get("payment_methods") === "3" ? [1, 3] : formData.get("payment_methods") === "6" ? [1, 3, 6] : formData.get("payment_methods") === "12" ? [1, 3, 6, 12] : [1],
          is_new: formData.get("is_new") === "true",
          is_special_edition: formData.get("is_special_edition") === "true",
          is_favorite: formData.get("is_favorite") === "true",
        };
        ItemsToCreate.push(item);
      });

      const handleUpload = async () => {
        try {
          await Promise.all(
            ItemsToCreate.map(async (item) => {
              const getImageUrl = async (faceImage) => {
                let fileName;
                if (faceImage === "front") {
                  fileName = `product_${item.name_product}_front_img.png`;
                } else if (faceImage === "back") {
                  fileName = `product_${item.name_product}_back_img.png`;
                }

                const { data, error } = await supabase
                .storage
                .from("products-images")
                .list("", { search: fileName });

                if (error) {
                  console.error("Error al listar archivos:", error.message);
                  return null;
                } else {
                  const exists = data.some(file => file.name === fileName);
                  if (exists) {
                    const { data: fileData, error: fileError } = await supabase
                      .storage
                      .from("products-images")
                      .getPublicUrl(fileName);
                    if (fileError) {
                      console.error("Error al obtener URL de la imagen:", fileError.message);
                      return null;
                    } else {
                      return fileData.publicUrl;
                    }
                  } else {
                    let renamedFile;
                    if (faceImage === "front") {
                      renamedFile = new File([item.front_img], fileName, { type: item.front_img.type });
                    } else if (faceImage === "back") {
                      renamedFile = new File([item.back_img], fileName, { type: item.back_img.type });
                    }
                    
                    const { data: uploadData, error: uploadError } = await supabase
                      .storage
                      .from("products-images")
                      .upload(fileName, renamedFile);
                    if (uploadError) {
                      console.error("Error al subir la imagen:", uploadError.message);
                      return null;
                    } else {
                      return supabase.storage.from("products-images").getPublicUrl(uploadData.path).data.publicUrl;
                    }
                  }
                }
              }

              const frontImageUrl = await getImageUrl("front");
              const backImageUrl = await getImageUrl("back");

              await supabase.from("products").insert([{
                collection: item.collection,
                license: item.license,
                name_product: item.name_product,
                description: item.description,
                sku: item.sku,
                price: item.price,
                discounts: item.discounts,
                front_img: frontImageUrl,
                back_img: backImageUrl,
                payment_methods: item.payment_methods,
                is_new: item.is_new,
                is_special_edition: item.is_special_edition,
                is_favorite: item.is_favorite
              }]);
              console.log(`Producto ${item.sku} creado con éxito.`);
            })
          );
          alert("Todos los productos fueron creados correctamente!");
        } catch (error) {
          console.error("Error al procesar los productos:", error);
          alert("Hubo un problema al crear los productos.");
        }
      };

      handleUpload();
      event.target.reset();
    }
  }

  const handleArrowClick = () => {
    console.log(selectRef.current);
    selectRef.current.focus();
  };

  const handleFileChange = (event) => {
    const files = [...event.target.files];
    console.log(files);
    if (files.length !== 2) {
      alert("Debes seleccionar exactamente dos archivos.");
      event.target.value = "";
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
        <section className="form__field-group form__field-group--bottom" ref={fieldGroupBottom}>
          <div className="form__field form__field--sku" ref={singleSkuWrapper} id="sku_1">
            <label className="form__label form__label--sku" htmlFor="sku">
              {stock <= 1 ? "SKU:" : "SKU para el item n° 1:"}
            </label>
            <input className="form__input form__input--sku" type="text" id="sku" name="sku" placeholder="SSK111AB001" required />
          </div>
          {stockInputArray.map((input) => input)}
          <div className="form__field form__field--price">
            <label className="form__label" htmlFor="price">Precio:</label>
            <input className="form__input form__input--price" type="number" id="price" name="price" placeholder="$ 0.000,00" step=".01" required />
          </div>
          <div className="form__field form__field--stock">
            <label className="form__label" htmlFor="stock">Stock:</label>
            <input 
              className="form__input form__input--stock" 
              type="number" 
              id="stock" 
              name="stock" 
              placeholder="0" 
              onBlur={handleChangeStock}
              min={1}
              required />
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
