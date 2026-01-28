import { useState, useEffect, useMemo } from "react";
import "./ShopPage.css";
import FilterShop from "../../components/FilterShop.jsx";
import CatalogueShop from "../../components/CatalogueShop.jsx";
import Pagination from "../../components/Pagination.jsx";
import { useUser } from "../../context/UserContext.js";

export default function ShopPage({ filterData, setFilterData }) {
    const { products } = useUser();
    const segmentedDisplayProductsArr = arr => {
        if (!Array.isArray(arr)) {
            return [];
        }

        const segmentedArr = [];
        for (let i = 0; i < arr.length; i += 9) {
            segmentedArr.push(arr.slice(i, i + 9));
        }

        return segmentedArr;
    };
    function uniqueByNameProduct(arr) {
        if (!Array.isArray(arr)) return [];
        
        const seen = new Set();
        return arr.filter(item => {
          if (!item || typeof item.name_product !== "string") return false;
          const name = item.name_product.toLowerCase().trim();
          if (seen.has(name)) {
            return false;
          }
          seen.add(name);
          return true
        });
    }

    const [paginationData, setPaginationData] = useState(
        {
            paginationList: <ul className="pagination__list"></ul>,
            positionInPagination: 1, 
            segmentedProductArr: segmentedDisplayProductsArr(uniqueByNameProduct(products))
            //segmentedProductArr: segmentedDisplayProductsArr(products)
        }
    );

    useEffect(() => {
        setPaginationData({ ...paginationData, segmentedProductArr: segmentedDisplayProductsArr(uniqueByNameProduct(products))});
        //setPaginationData({ ...paginationData, segmentedProductArr: segmentedDisplayProductsArr(products)});
    }, [products]);

    return (
        <>
            <main className="shop">
                <div className="flex-wrapper">
                    <FilterShop 
                        filterData={filterData} 
                        setFilterData={setFilterData}
                        paginationData={paginationData} 
                        setPaginationData={setPaginationData}
                        segmentedDisplayProductsArr={segmentedDisplayProductsArr}
                        uniqueByNameProduct={uniqueByNameProduct} />
                    <div className="catalogue-wrapper">
                        <CatalogueShop paginationData={paginationData} />
                        <Pagination 
                            paginationData={paginationData}
                            setPaginationData={setPaginationData} />
                    </div>
                </div>
            </main>
        </>
    )
}