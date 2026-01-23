import { useEffect } from "react";
import "../assets/css/FilterShop.css";
import { useUser } from "../context/UserContext.js";


export default function FilterShop({ filterData, setFilterData, paginationData, setPaginationData, segmentedDisplayProductsArr, uniqueByNameProduct }) {
  
    const { products } = useUser();
    useEffect(() => {
        const filteredProducts = filterEngine(filterData, products);
        const uniqueProductsArr = uniqueByNameProduct(filteredProducts);
        const segmentedDisplayProducts = segmentedDisplayProductsArr(uniqueProductsArr);

        setPaginationData({ ...paginationData, segmentedProductArr: segmentedDisplayProducts });
    }, [filterData]);

    const handleInputChange = e => {
        const { name, value, id } = e.target;
        let newFilterData;

        if (name === "nameOrCategory" || name === "sortBy") {
            newFilterData = { ...filterData, [name]: value };
        }

        if (name === "price") {
            if (id === "min") {
                newFilterData = {...filterData, [name]: {...filterData.price, min: value}};
            } else if (id === "max") {
                newFilterData = {...filterData, [name]: {...filterData.price, max: value}};
            }
        }
        
        if (name === "filterByNew") {
            newFilterData = {...filterData, [name]: !filterData.filterByNew};
        }

        if (name === "filterByOffer") {
            newFilterData = {...filterData, [name]: !filterData.filterByOffer};
        }

        if (name === "filterBySpecialEdition") {
            newFilterData = {...filterData, [name]: !filterData.filterBySpecialEdition};
        }

        if (name === "filterByFavorites") {
            newFilterData = {...filterData, [name]: !filterData.filterByFavorites};
        }

        setFilterData(newFilterData);
    };
    const filterEngine = (filterDataObj, arr) => {
        const {
                nameOrCategory, 
                sortBy, 
                price,
                filterByNew, 
                filterByOffer, 
                filterBySpecialEdition, 
                filterByFavorites
        } = filterDataObj;
        const min = filterData.price.min === "" ? null : Number(filterData.price.min);
        const max = filterData.price.max === "" ? null : Number(filterData.price.max);

        let newUniqueProductArr = [...arr];
        /*----------Filter by name or category----------*/
        if (nameOrCategory.length !== 0) {
            let newNameOrCategory = nameOrCategory.trim().toLowerCase();
            newUniqueProductArr = products.filter( product => {
                let name_product = product.name_product.toLowerCase();
                let license = product.license.toLowerCase();
                if (name_product.includes(newNameOrCategory) || license.includes(newNameOrCategory)) {
                    return true
                } else {
                    return false
                }
            })
        }
        /*---------------------------------------------*/
        /*----------Filter by min and max price----------*/
        if (!isNaN(min) && !isNaN(max) && max < min) {
             return [];
        }
        if (min !== null && !isNaN(min) && min >= 0) {
            newUniqueProductArr = newUniqueProductArr.filter(product => product.price >= min);
        }
        if (max !== null && !isNaN(max) && max >= 0) {
            newUniqueProductArr = newUniqueProductArr.filter(product => product.price <= max);
        }
        /*---------------------------------------------*/
        /*----------Filter by new----------*/
        if (filterByNew) {
            newUniqueProductArr = newUniqueProductArr.filter(product => product.is_new);
        }
        /*---------------------------------*/
        /*----------Filter by offer----------*/
        if (filterByOffer) {
            newUniqueProductArr = newUniqueProductArr.filter(product => product.discounts > 0);
        }
        /*-----------------------------------*/
        /*----------Filter by special edition----------*/
        if (filterBySpecialEdition) {
            newUniqueProductArr = newUniqueProductArr.filter(product => product.is_special_edition);
        }
        /*---------------------------------------------*/
        /*----------Filter by favorites----------*/
        if (filterByFavorites) {
            newUniqueProductArr = newUniqueProductArr.filter(product => product.is_favorite);
        }
        /*---------------------------------------*/
        /*----------Sort----------*/
        if (sortBy === "alphabet") {
            newUniqueProductArr.sort((a, b) => a.name_product.localeCompare(b.name_product, "es", { sensitivity: "base" }));
        } else if (sortBy === "largestFirst") {
            newUniqueProductArr.sort((a, b) => b.price - a.price);
        } else if (sortBy === "smallestFirst") {
            newUniqueProductArr.sort((a, b) => a.price - b.price);
        }
        /*------------------------*/
        return newUniqueProductArr
    }

    return (
        <aside>
            <form>
                <label>buscar
                    <input type="text" placeholder="Item o categoría" name="nameOrCategory" onChange={handleInputChange}
                    value={typeof filterData.nameOrCategory === "string" ? filterData.nameOrCategory : ""}/>
                </label>

                <label>ordenar por
                    <select name="sortBy" defaultValue="defaultValue" onChange={handleInputChange}>
                        <option value="defaultValue" disabled>
                            Elija una opción
                        </option>
                        <option value="alphabet">
                            Alfabéticamente
                        </option>
                        <option value="largestFirst">
                            Mayor a menor
                        </option>
                        <option value="smallestFirst">
                            Menor a mayor
                        </option>
                    </select>
                </label>

                <fieldset>
                    <legend>precio</legend>
                    <div>
                        <label className="min" htmlFor="min">min</label>
                        <input type="number" name="price" id="min" placeholder="0" min={0} onChange={handleInputChange}/>
                        <p className="middleDash">-</p>
                        <label className="max" htmlFor="max">max</label>
                        <input type="number" name="price" id="max" placeholder="0" min={0} onChange={handleInputChange} />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>filtrar</legend>
                    <div>
                    <label htmlFor="filterByNew">
                        <input 
                            type="checkbox" 
                            id="filterByNew" 
                            name="filterByNew" 
                            value="isNew"
                            checked={filterData.filterByNew}
                            onChange={handleInputChange} />
                        nuevos
                    </label>

                    <label htmlFor="filterByOffer">
                        <input 
                            type="checkbox" 
                            id="filterByOffer" 
                            name="filterByOffer" 
                            value="isOffer"
                            checked={filterData.filterByOffer}
                            onChange={handleInputChange} />
                        ofertas
                    </label>

                    <label htmlFor="filterBySpecialEdition">
                        <input 
                            type="checkbox" 
                            id="filterBySpecialEdition" 
                            name="filterBySpecialEdition" 
                            value="isSpecialEdition"
                            checked={filterData.filterBySpecialEdition}
                            onChange={handleInputChange} />
                        edición especial
                    </label>

                    <label htmlFor="filterByFavorites">
                        <input 
                        type="checkbox" 
                        id="filterByFavorites" 
                        name="filterByFavorites" 
                        value="isFavorite"
                        checked={filterData.filterByFavorites}
                        onChange={handleInputChange} />
                        favoritos
                    </label>
                    </div>
                </fieldset>
            </form>
        </aside>
    )
}