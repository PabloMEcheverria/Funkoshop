import { uniqueProductsArr } from "../../data/products";
import productsArr from "../../data/products";
import { useState } from "react";
import "./ShopPage.css";
import FilterShop from "../../components/FilterShop.jsx";
import CatalogueShop from "../../components/CatalogueShop.jsx";
import Pagination from "../../components/Pagination.jsx";

export default function ShopPage() {
    const [displayProductArr, setDisplayProductArr] = useState(uniqueProductsArr);
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
            positionInPagination: 1, 
            segmentedProductArr: []
        }
    );

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
    };
    return (
        <>
        <main className="shop">
            <FilterShop 
                filterData={filterData} 
                setFilterData={setFilterData} 
                setDisplayProductArr={setDisplayProductArr} 
                paginationData={paginationData} 
                setPaginationData={setPaginationData} />
            <CatalogueShop displayProductArr={displayProductArr} />
            <Pagination 
                displayProductArr={displayProductArr} 
                setDisplayProductArr={setDisplayProductArr} 
                paginationData={paginationData} 
                setPaginationData={setPaginationData} />
        </main>
        </>
    )
}