import "../assets/css/Pagination.css";
import "../assets/css/PaginationButton.css";
import PaginationPrevious from "./svgComponents/PaginationPrevious";
import PaginationNext from "./svgComponents/PaginationNext";
import PaginationButton from "./PaginationButton";
import { useState, useEffect } from "react";


export default function Pagination({ paginationData, setPaginationData }) {
    const { positionInPagination, segmentedProductArr } = paginationData;
    const [paginationButtonArr, setPaginationButtonArr] = useState([]);
    
    const moveToPreviousPage = () => {positionInPagination > 1 && setPaginationData({ ...paginationData, positionInPagination: positionInPagination - 1 })};
    const moveToNextPage = () => {positionInPagination < segmentedProductArr.length && setPaginationData({ ...paginationData, positionInPagination: positionInPagination + 1 })};
    const moveToPage = index => {setPaginationData({ ...paginationData, positionInPagination: index })};

    const ellipsisButton =  <li className="pagination__item" key={"ellipsis"}>
                                <PaginationButton paginationData={paginationData} isEllipsis={true} onClick={moveToPage} />
                            </li>;

    useEffect(() => {
        let newPaginationButtonArr = [];
        segmentedProductArr.forEach((segment, i) => {
            newPaginationButtonArr.push(
                <li 
                    className={i + 1 === positionInPagination ? "pagination__item--active" : "pagination_item"} 
                    key={segmentedProductArr.indexOf(segment) + 1}>
                    <PaginationButton 
                        paginationData={paginationData} 
                        index={segmentedProductArr.indexOf(segment) + 1}
                        onClick={moveToPage}
                         />
                </li>
            )
        });

        if (newPaginationButtonArr.length <= 6) {
            setPaginationButtonArr(newPaginationButtonArr);
        }

        if (newPaginationButtonArr.length > 6 && positionInPagination <= 3) { //["1", "2", "3", "...", "n"]
            newPaginationButtonArr = 
                [
                    newPaginationButtonArr.slice(0, 3), 
                    ellipsisButton, 
                    newPaginationButtonArr.slice(-1)
                ];
            setPaginationButtonArr(newPaginationButtonArr);
        } else if (newPaginationButtonArr.length > 6 && positionInPagination >= newPaginationButtonArr.length - 2) { //["1", "...", "n-2", "n-1", "n"]
            newPaginationButtonArr = 
                [
                    newPaginationButtonArr.slice(0, 1), 
                    ellipsisButton, newPaginationButtonArr.slice(-3)
                ];
            setPaginationButtonArr(newPaginationButtonArr);
        } else if (newPaginationButtonArr.length > 6 && positionInPagination > 3 && positionInPagination < newPaginationButtonArr.length - 2) { //["1", "...", "previous", "current", "next", "...", "n"]
            const ellipsisButton_1 = 
            <li 
                className="pagination__item"
                key={"ellipsis_1"}>
                <PaginationButton 
                    paginationData={paginationData}
                    isEllipsis={true}
                    onClick={moveToPage} />
            </li>;

            const ellipsisButton_2 = 
            <li 
                className="pagination__item"
                key={"ellipsis_2"}>
                <PaginationButton 
                    paginationData={paginationData}
                    isEllipsis={true}
                    onClick={moveToPage} />
            </li>;
            newPaginationButtonArr = 
                [
                    newPaginationButtonArr.slice(0, 1), 
                    ellipsisButton_1, 
                    newPaginationButtonArr.slice(positionInPagination -2, positionInPagination + 1), 
                    ellipsisButton_2, 
                    newPaginationButtonArr.slice(-1)
                ];
            setPaginationButtonArr(newPaginationButtonArr);
        }
    }, [paginationData]);

    return (
        <section className="pagination">
            <ul className="pagination__list">
                <li 
                    className={positionInPagination === 1 ? "pagination__item--disabled" : "pagination__item"}
                    onClick={moveToPreviousPage}>
                    <button className="pagination__button">
                        <PaginationPrevious paginationData={paginationData} />
                    </button>
                </li>
                {paginationButtonArr}
                <li 
                    className={positionInPagination === segmentedProductArr.length ? "pagination__item--disabled" : "pagination__item"}
                    onClick={moveToNextPage}>
                    <button className="pagination__button">
                        <PaginationNext paginationData={paginationData} />
                    </button>
                </li>
            </ul>
        </section>
    )
    //return (
    //    <section className="pagination">
    //        {paginationData.paginationList}
    //    </section>
    //)
}