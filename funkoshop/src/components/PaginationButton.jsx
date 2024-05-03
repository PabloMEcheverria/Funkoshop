import "../assets/css/PaginationButton.css";

export default function PaginationButton(
    { paginationData, index = "...", isPrev = false, isNext = false, isEllipsis = false }) {
    const { positionInPagination, segmentedProductArr, moveTo } = paginationData;
    const content = isPrev ? "prev" : isNext ? "next" : isEllipsis || index === "..." ? "..." : index;
    const idValue = content;
    const disabledValue = positionInPagination === index ? true : 
                    isPrev && positionInPagination === 1 ? true :
                    isNext && positionInPagination === segmentedProductArr.length ? true :
                    isEllipsis ? true :
                    false;
    const classValue =  disabledValue ? "pagination__button--disabled" : 
                        "pagination__button";
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