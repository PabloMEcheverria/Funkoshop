import "../assets/css/PaginationButton.css";
import PaginationPrevious from "../components/svgComponents/PaginationPrevious.jsx";
import PaginationNext from "../components/svgComponents/PaginationNext.jsx";

export default function PaginationButton(
    { paginationData, index = "...", isPrev = false, isNext = false, isEllipsis = false }) {
    const { positionInPagination, segmentedProductArr, moveTo } = paginationData;

    const content = isPrev ? <PaginationPrevious /> : 
                    isNext ? <PaginationNext /> : 
                    isEllipsis || index === "..." ? "..." : index;

    const idValue = isPrev ? "prev" : isNext ? "next" : content;

    const disabledValue = positionInPagination === index ? true : 
                    isPrev && positionInPagination === 1 ? true :
                    isNext && positionInPagination === segmentedProductArr.length ? true :
                    isEllipsis ? true :
                    false;

    const classValue =  disabledValue ? "pagination__button--disabled" : "pagination__button";
    return (
        <li id={idValue + "_li"} className={classValue} >
            <button id={idValue + "_button"} 
                    onClick={moveTo} 
                    disabled={disabledValue} >
                {content}
            </button>
        </li>
    )
}