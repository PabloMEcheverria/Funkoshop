import { uniqueProductsArr } from "../../data/products";
import productsArr from "../../data/products";
import { useState, useEffect } from "react";
import "./ShopPage.css";
import FilterShop from "../../components/FilterShop.jsx";
import CatalogueShop from "../../components/CatalogueShop.jsx";
import Pagination from "../../components/Pagination.jsx";
import PaginationButton from "../../components/PaginationButton.jsx";

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
            paginationList: <ul className="pagination__list"></ul>,
            positionInPagination: 1 , 
            segmentedProductArr: [], 
            moveTo: function moveTo(e) {
                if (!isNaN(parseInt(e.target.id))) {
                    setPaginationData(prevPaginationData => {
                        let newPaginationData = {
                            ...prevPaginationData, 
                            positionInPagination: parseInt(e.target.id)
                        }
                        newPaginationData = {
                            ...newPaginationData, 
                            paginationList: <ul className="pagination__list">{setPaginationList(newPaginationData.segmentedProductArr, newPaginationData)}</ul>
                        }
                        return newPaginationData
                    })
                } else if (e.target.id === "prev_button") {
                    console.log("prev click");
                    setPaginationData(prevPaginationData => {
                        let newPaginationData = {
                            ...prevPaginationData, 
                            positionInPagination: prevPaginationData.positionInPagination - 1
                        }
                        newPaginationData = {
                            ...newPaginationData, 
                            paginationList: <ul className="pagination__list">{setPaginationList(newPaginationData.segmentedProductArr, newPaginationData)}</ul>
                        }
                        return newPaginationData
                    })
                } else if (e.target.id === "next_button") {
                    console.log("next click");
                    setPaginationData(prevPaginationData => {
                        let newPaginationData = {
                            ...prevPaginationData, 
                            positionInPagination: prevPaginationData.positionInPagination + 1
                        }
                        newPaginationData = {
                            ...newPaginationData, 
                            paginationList: <ul className="pagination__list">{setPaginationList(newPaginationData.segmentedProductArr, newPaginationData)}</ul>
                        }
                        return newPaginationData
                    })
                }
            }
        }
    );
    
    useEffect(() => {
        setPaginationData(pagination(displayProductArr));
    }, [displayProductArr, setPaginationData]);


    function setSegmentedProductArr(productArr) {
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
            newProductArr.push(productArr);
        }
        return newProductArr
    }
    function setPaginationList(segmentedProductArr, paginationDataObj = paginationData) {
        let liPaginationArr = segmentedProductArr.map((productArr, i, arr) => {
            let pos = paginationDataObj.positionInPagination;
            if (arr.length <= 7) {
                return (<PaginationButton paginationData={paginationDataObj} index={i + 1} key={i + 1} />)
            } else {
                if(pos <= 2) {
                    if (i + 1 <= 3 || i + 1 === arr.length) {
                        return (<PaginationButton paginationData={paginationDataObj} index={i + 1} key={i + 1} />)
                    } else if (i + 1 === 4) {
                        return (<PaginationButton paginationData={paginationDataObj} isEllipsis={true} key={"ellipsis_" + (i + 1)} />)
                    }
                } else if (pos === 3) {
                    if (i + 1 <= 4 || i + 1 === arr.length) {
                        return (<PaginationButton paginationData={paginationDataObj} index={i + 1} key={i + 1} />)
                    } else if (i + 1 === 5) {
                        return (<PaginationButton paginationData={paginationDataObj} isEllipsis={true} key={"ellipsis_" + (i + 1)} />)
                    }
                } else if (pos >= 4 && pos <= arr.length - 3) {
                    if (i + 1 === 1 || 
                        (i + 1 >= pos - 1 && i + 1 <= pos + 1) ||  
                        i + 1 === arr.length ) {
                            return (<PaginationButton paginationData={paginationDataObj} index={i + 1} key={i + 1} />)
                        } else if (i + 1 === 2 || i + 1 === pos + 2) {
                            return (<PaginationButton paginationData={paginationDataObj} isEllipsis={true} key={"ellipsis_" + (i + 1)} />)
                        }
                } else if (pos === arr.length - 2) {
                    if (i + 1 === 1 || i + 1 >= pos - 1) {
                        return (<PaginationButton paginationData={paginationDataObj} index={i + 1} key={i + 1} />)
                    } else if (i + 1 === 2) {
                       return (<PaginationButton paginationData={paginationDataObj} isEllipsis={true} key={"ellipsis_" + (i + 1)} />)
                    }
                } else if (pos >= arr.length - 1) {
                    if (i + 1 === 1 || i + 1 >= arr.length - 2) {
                        return (<PaginationButton paginationData={paginationDataObj} index={i + 1} key={i + 1} />)
                    } else if (i + 1 === 2) {
                        return (<PaginationButton paginationData={paginationDataObj} isEllipsis={true} key={"ellipsis_" + (i + 1)} />)
                    }
                }
            }
        })
        liPaginationArr = liPaginationArr.filter(value => value !== undefined && true);
        liPaginationArr.unshift(<PaginationButton paginationData={paginationDataObj} isPrev={true} key={"prev"} />);
        liPaginationArr.push(<PaginationButton paginationData={paginationDataObj} isNext={true} key={"next"} />);
        return liPaginationArr
    }
    
    function pagination(productArr) {
        let newPaginationData = {...paginationData};
        newPaginationData.segmentedProductArr = setSegmentedProductArr(productArr);
        let newPaginationList = setPaginationList(newPaginationData.segmentedProductArr);
        newPaginationData.paginationList = <ul className="pagination__list">{newPaginationList}</ul>;
        console.log(newPaginationData);
        return newPaginationData
    }
    return (
        <>
        <main className="shop">
            <FilterShop 
                filterData={filterData} 
                setFilterData={setFilterData} 
                setDisplayProductArr={setDisplayProductArr} 
                paginationData={paginationData} 
                setPaginationData={setPaginationData} />
            <CatalogueShop 
                displayProductArr={displayProductArr} 
                paginationData={paginationData} 
                setPaginationData={setPaginationData} />
            <Pagination 
                displayProductArr={displayProductArr} 
                setDisplayProductArr={setDisplayProductArr} 
                paginationData={paginationData} 
                setPaginationData={setPaginationData} />
        </main>
        </>
    )
}