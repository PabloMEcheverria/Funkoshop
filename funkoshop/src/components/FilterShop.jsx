import "../assets/css/FilterShop.css";
import { uniqueProductsArr } from "../data/products";

export default function FilterShop({ filterData, setFilterData, setDisplayProductArr, paginationData, setPaginationData }) {
    function handleInputChange(e) {
        const { name, value, id } = e.target;
        let newFilterData;
        if (name === "nameOrCategory" || name === "sortBy") {
            newFilterData = {...filterData, [name]: value};
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
        filterEngine(newFilterData);
    }

    function filterEngine(filterDataObj) {
        let {//nameOrCategory, 
             sortBy, 
             price,
             filterByNew, 
             filterByOffer, 
             filterBySpecialEdition, 
             filterByFavorites} = filterDataObj;
        let min = Number(price.min);
        let max = Number(price.max);
        let newUniqueProductArr;
        /*----------Filter by name or category----------*/
        if (filterDataObj.nameOrCategory.lenght !== 0) {
            let nameOrCategory = filterDataObj.nameOrCategory.trim();
            nameOrCategory = nameOrCategory.toLowerCase();
            newUniqueProductArr = uniqueProductsArr.filter( product => {
                let nameProduct = product.nameProduct.toLowerCase();
                let license = product.license.toLowerCase();
                if (nameProduct.includes(nameOrCategory) || license.includes(nameOrCategory)) {
                    return true
                } else {
                    return false
                }
            })
        }
        /*---------------------------------------------*/
        /*----------Filter by min and max price----------*/
        if (!isNaN(min) && min >= 0 && (min <= max || isNaN(max))) {
            newUniqueProductArr = newUniqueProductArr.filter(product => product.price >= min);
        }
        if (!isNaN(max) && max >= 0 && (min <= max || isNaN(min))) {
            newUniqueProductArr = newUniqueProductArr.filter(product => product.price <= max);
        }
        /*-----------------------------------------------*/
        /*----------Filter by new----------*/
        if (filterByNew) {
            newUniqueProductArr = newUniqueProductArr.filter(product => product.isNew);
        }
        /*---------------------------------*/
        /*----------Filter by offer----------*/
        if (filterByOffer) {
            newUniqueProductArr = newUniqueProductArr.filter(product => product.discounts > 0);
        }
        /*-----------------------------------*/
        /*----------Filter by special edition----------*/
        if (filterBySpecialEdition) {
            newUniqueProductArr = newUniqueProductArr.filter(product => product.isSpecialEdition);
        }
        /*---------------------------------------------*/
        /*----------Filter by favorites----------*/
        if (filterByFavorites) {
            newUniqueProductArr = newUniqueProductArr.filter(product => product.isFavorite);
        }
        /*---------------------------------------*/
        /*----------Sort----------*/
        if (sortBy === "alphabet") {
            newUniqueProductArr.sort((a, b) => {
                let nameA = a.nameProduct.toUpperCase();
                let nameB = b.nameProduct.toUpperCase();
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
            })
        } else if (sortBy === "largestFirst") {
            newUniqueProductArr.sort((a, b) => b.price - a.price);
        } else if (sortBy === "smallestFirst") {
            newUniqueProductArr.sort((a, b) => a.price - b.price);
        }
        /*------------------------*/
        setDisplayProductArr(newUniqueProductArr);
        let newPaginationData = {...paginationData, positionInPagination: 1};
        setPaginationData(newPaginationData);
    }

    return (
        <aside>
            <form>
                <label>buscar
                    <input type="text" placeholder="Item o categoría" name="nameOrCategory" onChange={handleInputChange}/>
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
                        <input type="number" name="price" id="min" placeholder="0" onChange={handleInputChange}/>
                        <p className="middleDash">-</p>
                        <label className="max" htmlFor="max">max</label>
                        <input type="number" name="price" id="max" placeholder="0" onChange={handleInputChange} />
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