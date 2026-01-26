import "../assets/css/PaginationButton.css";

export default function PaginationButton({ paginationData, index, isEllipsis = false }) {
    const { positionInPagination } = paginationData;
    return (
        <button className={positionInPagination === index ? "pagination__button--active" : "pagination__button"}>
            {isEllipsis || index === "..." ? "..." : index}
        </button>
    )
}
//export default function PaginationButton(
//    { paginationData, index = "...", isPrev = false, isNext = false, isEllipsis = false }) {
//    const { positionInPagination, segmentedProductArr, moveTo } = paginationData;
//
//    const content = isPrev ? <PaginationPrevious /> : 
//                    isNext ? <PaginationNext /> : 
//                    isEllipsis || index === "..." ? "..." : index;
//
//    const idValue = isPrev ? "prev" : isNext ? "next" : content;
//
//    const disabledValue = isPrev && positionInPagination === 1 ? true :
//                          isNext && positionInPagination === segmentedProductArr.length ? true :
//                          isEllipsis ? true :
//                          false;
//
//    const classValueItem =  disabledValue ? "pagination__item--disabled" : 
//                            positionInPagination === index ? "pagination__item--active" : 
//                            "pagination__item";
//
//    const classValueButton =  disabledValue ? "pagination__button--disabled" : 
//                              positionInPagination === index ? "pagination__button--active" : 
//                              "pagination__button";
//
//    return (
//        <li id={idValue + "_li"} className={classValueItem} >
//            <button id={idValue} 
//                    className={classValueButton}
//                    onClick={moveTo} 
//                    disabled={disabledValue} >
//                {content}
//            </button>
//        </li>
//    )
//}