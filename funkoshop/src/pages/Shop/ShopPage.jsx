import { uniqueProductsArr } from "../../data/products";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "./ShopPage.css";

export default function ShopPage() {
    /*const linkProductArr = uniqueProductsArr.map((product) => (
        <Link key={product.id} to={`/shop/${product.id}`} style={{display: "block", marginBottom: "5px", marginLeft: "5px"}}>
            Product: {product.id}
        </Link>
    ));
    return (
        <>
            {linkProductArr}
            <Outlet />
        </>
    )*/

    const [filterData, setFilterData] = useState(
        {   
            nameOrCategory:"",
            sortBy: "",
            price: {bothFieldsAreEmpty: true, min: undefined, max: undefined},
            filterByNew: false,
            filterByOffer: false,
            filterBySpecialEdition: false,
            filterByFavorites: false
        }
    );

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

        console.log(newFilterData);
        console.log("nameOrCategory: " + newFilterData.nameOrCategory);
        console.log("sortBy: " + newFilterData.sortBy);
        console.log("price (bothFieldsAreEmpty): " + newFilterData.price.bothFieldsAreEmpty);
        console.log("price (min): " + newFilterData.price.min);
        console.log("price (max): " + newFilterData.price.max);
        console.log("filterByNew: " + newFilterData.filterByNew);
        console.log("filterByOffer: " + newFilterData.filterByOffer);
        console.log("filterBySpecialEdition: " + newFilterData.filterBySpecialEdition);
        console.log("filterByFavorites: " + newFilterData.filterByFavorites);
        setFilterData(newFilterData);
    }

    return (
        <>
            <main></main>
            <aside>
                <form action="">
                    <label>buscar
                        <input type="text" placeholder="ítem o categoría" name="nameOrCategory" onChange={handleInputChange}/>
                    </label>

                    <label>ordenar por
                        <select name="sortBy" onChange={handleInputChange}>
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

                        <label>min
                            <input type="number" name="price" id="min" onChange={handleInputChange}/>
                        </label>

                        <p>-</p>

                        <label>max
                            <input type="number" name="price" id="max" onChange={handleInputChange} />
                        </label>
                    </fieldset>

                    <fieldset>
                        <legend>filtrar</legend>

                        <input 
                            type="checkbox" 
                            id="filterByNew" 
                            name="filterByNew" 
                            value="isNew"
                            checked={filterData.filterByNew}
                            onChange={handleInputChange} />
                        <label htmlFor="filterByNew">nuevos</label>

                        <input 
                            type="checkbox" 
                            id="filterByOffer" 
                            name="filterByOffer" 
                            value="isOffer"
                            checked={filterData.filterByOffer}
                            onChange={handleInputChange} />
                        <label htmlFor="filterByOffer">ofertas</label>

                        <input 
                            type="checkbox" 
                            id="filterBySpecialEdition" 
                            name="filterBySpecialEdition" 
                            value="isSpecialEdition"
                            checked={filterData.filterBySpecialEdition}
                            onChange={handleInputChange} />
                        <label htmlFor="filterBySpecialEdition">edición especial</label>

                        <input 
                            type="checkbox" 
                            id="filterByFavorites" 
                            name="filterByFavorites" 
                            value="isFavorite"
                            checked={filterData.filterByFavorites}
                            onChange={handleInputChange} />
                        <label htmlFor="filterByFavorites">favoritos</label>
                    </fieldset>
                </form>
            </aside>
        </>
    )
}