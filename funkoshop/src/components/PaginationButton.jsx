import "../assets/css/PaginationButton.css";

export default function PaginationButton(
    { buttonData, index = "...", isPrev = false, isNext = false, isEllipsis = false, disabledValue = false }) {
    const {moveTo} = buttonData;
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
        <button className={isEllipsis ? "pagination__button--ellipsis": "pagination__button"} 
                onClick={moveTo} 
                disabled={isEllipsis ? true : disabledValue} >
            {content}
        </button>
    )
}