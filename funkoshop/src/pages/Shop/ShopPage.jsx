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
            price: {bothFieldsAreEmpty: true, min: 0, max: 0},
            filterByNew: false,
            filterByOffer: false,
            filterBySpecialEdition: false,
            filterByFavorites: false
        }
    );

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFilterData(previousState => {return {...previousState, [name]: value}});
    }

    return (
        <>
            <main></main>
            <aside>
                <form action="">
                    <label>buscar
                        <input type="text" placeholder="ítem o categoría" onChange={(e) => {
                            filterData.nameOrCategory = e.target.value;
                            setFilterData(filterData);
                        }}/>
                    </label>
                    <label>ordenar por
                        <select name="" id="">
                            <option value="">
                                Alfabéticamente
                            </option>
                            <option value="">
                                Mayor a menor
                            </option>
                            <option value="">
                                Menor a mayor
                            </option>
                        </select>
                    </label>
                    <fieldset>
                        <legend>precio</legend>

                        <label htmlFor="">min
                            <input type="number" name="" id="" />
                        </label>
                        <label htmlFor="">max
                            <input type="number" name="" id="" />
                        </label>
                    </fieldset>
                    <fieldset>
                        <legend>filtrar</legend>

                        <input type="checkbox" id="" name="" value=""/>
                        <label htmlFor="">nuevos</label>

                        <input type="checkbox" id="" name="" value=""/>
                        <label htmlFor="">ofertas</label>

                        <input type="checkbox" id="" name="" value=""/>
                        <label htmlFor="">edición especial</label>

                        <input type="checkbox" id="" name="" value=""/>
                        <label htmlFor="">favoritos</label>
                    </fieldset>
                </form>
            </aside>
        </>
    )
}