import "../assets/css/PaginationButton.css";

export default function PaginationButton({ buttonData, onClickFunction, index = "...", disabledValue = false }) {
    return (
        <button className="pagination__button" onClick={onClickFunction} disabled={disabledValue} >
            {index !== "..." ? index + 1 : index}
        </button>
    )
}