import "../assets/css/Pagination.css";

export default function Pagination({ paginationData }) {
    return (
        <section className="pagination">
            {paginationData.paginationList}
        </section>
    )
}