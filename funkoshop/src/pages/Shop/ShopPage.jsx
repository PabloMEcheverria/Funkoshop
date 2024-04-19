import { uniqueProductsArr } from "../../data/products";
import productsArr from "../../data/products";
import Card from "../../components/Card.jsx";
import { Link/*, Outlet*/ } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ShopPage.css";
export default function ShopPage() {
    const [displayProductArr, setDisplayProductArr] = useState(uniqueProductsArr);
    //const [displayProductArr, setDisplayProductArr] = useState(productsArr);
    const [filterData, setFilterData] = useState(
        {   
            nameOrCategory:"",
            sortBy: "",
            price: {min: undefined, max: undefined},
            filterByNew: false,
            filterByOffer: false,
            filterBySpecialEdition: false,
            filterByFavorites: false
        }
    );
    const [paginationData, setPaginationData] = useState(
        {
            paginationList: <ul></ul>,
            positionInPagination: 1
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
        setFilterData(newFilterData);
        filterEngine(newFilterData);
        //pagination(displayProductArr);
    }

    function filterEngine(filterDataObj) {
        console.log(filterDataObj);
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
        if (!isNaN(min) && min >= 0 && min <= max) {
            newUniqueProductArr = newUniqueProductArr.filter(product => product.price >= min);
        }
        if (!isNaN(max) && max >= 0 && min <= max) {
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
        console.log(newUniqueProductArr);
        setDisplayProductArr(newUniqueProductArr);
    }

    function pagination(productArr) {
        let newProductArr = [];
        if (productArr.length > 9) {
            for (let i = 0; i < productArr.length; i += 9) {
                if (productArr.length - i > 9) {
                    newProductArr.push(productArr.slice(i, i + 9));
                } else {
                    newProductArr.push(productArr.slice(i));
                }
            }
        } else {
            newProductArr = productArr;
        }
        console.log(newProductArr);
        let paginationLinkArr = newProductArr.map((productArr, i, arr) => {
            let positionInPagination = paginationData.positionInPagination;
            if (arr.length <= 7) {
                return (
                    <li>
                        <button>
                            {i + 1}
                        </button>
                    </li>
                )
            } else if (arr.length > 7) {
                if (positionInPagination <= 2) {
                    if (i + 1 <= 3 || i + 1 === arr.length) {
                        return (
                            <li>
                                <button>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 4) {
                        return (
                            <li>
                                <button isEllipsis={true}>
                                    ...
                                </button>
                            </li>
                        )
                    }
                }
                if (positionInPagination === 3) {
                    if (i + 1 <= 4 || i + 1 === arr.length) {
                        return (
                            <li>
                                <button>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 5) {
                        return (
                            <li>
                                <button isEllipsis={true}>
                                    ...
                                </button>
                            </li>
                        )
                    }
                }
                if (positionInPagination > 3 && positionInPagination <= arr.length - 2) {
                    if (i + 1 === 1 || 
                        i + 1 === arr.length || (
                        i + 1 >= positionInPagination - 1 && i + 1 <= positionInPagination + 1
                    )) {
                        return (
                            <li>
                                <button>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 2 || i + 1 === arr.length - 1) {
                        return (
                            <li>
                                <button isEllipsis={true}>
                                    ...
                                </button>
                            </li>
                        )
                    }
                }
                if (positionInPagination === arr.length - 2) {
                    if (i + 1 === 1 || i + 1 >= arr.legend - 3) {
                        return (
                            <li>
                                <button>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 2) {
                        <li>
                            <button isEllipsis={true}>
                                ...
                            </button>
                        </li>
                    }
                }
                if (positionInPagination >= arr.length - 1) {
                    if (i + 1 === 1 || i + 1 >= arr.length - 2) {
                        return (
                            <li>
                                <button>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 2) {
                        return (
                            <li>
                                <button isEllipsis={true}>
                                    ...
                                </button>
                            </li>
                        )
                    }
                }
            }
        });
        paginationLinkArr = paginationLinkArr.filter(element => element !== undefined);
        paginationLinkArr.unshift(<li><button>prev</button></li>);
        paginationLinkArr.push(<li><button>next</button></li>);
        console.log(paginationData.positionInPagination, paginationLinkArr.map(element => element.props.children.props.children));
        let newPaginationData = {...paginationData};
        newPaginationData.paginationList = <ul>{paginationLinkArr.map((link, i) => <li key={i}>{link.props.children}</li>)}</ul>;
        console.log(newPaginationData);
        return newPaginationData;
    }

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

    const linkProductArr = displayProductArr.map(product => (
        <Link key={product.id} to={`/shop/${product.id}`} className="product-grid__item">
            <Card key={product.id} product={product} customClassName="product-grid__card" />
        </Link>
    ));
    //setPaginationData(pagination(displayProductArr));

    return (
        <main className="shop">
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
                            <label htmlFor="min">min</label>
                            <input type="number" name="price" id="min" placeholder="0" onChange={handleInputChange}/>
                            <p>-</p>
                            <label htmlFor="max">max</label>
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
            <section className="product-grid">
                {linkProductArr}
            </section>
            <section className="pagination-bar">
                {paginationData.paginationList}
            </section>
        </main>
    )
}