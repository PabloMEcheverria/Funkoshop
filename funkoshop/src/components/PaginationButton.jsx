import "../assets/css/PaginationButton.css";

export default function PaginationButton(
    { paginationData, index = "...", isPrev = false, isNext = false, isEllipsis = false, disabledValue = false }) {
    const { moveTo } = paginationData;
    let content;
    if (isPrev) {
        content = "prev";
    } else if (isNext) {
        content = "next";
    } else if (isEllipsis) {
        content = "..."
    } else {
        content = index;
    }
    return (
        <button id={isPrev ? "prev" : 
                    isNext ? "next" : 
                    isEllipsis || index === "..." ? "..." : 
                    index}
                className={ isEllipsis ? "pagination__button--ellipsis" : 
                            disabledValue ? "pagination__button--disabled" : 
                            "pagination__button"} 
                onClick={moveTo} 
                disabled={isEllipsis ? true : disabledValue} >
            {content}
        </button>
    )
}