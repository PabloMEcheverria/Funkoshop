import React, { useEffect, useState } from "react";
import "../assets/css/Pagination.css";
import PaginationButton from "./PaginationButton";

export default function Pagination({ displayProductArr, setProductArr, paginationData, setPaginationData }) {
    return (
        <section className="paginationSection">
            {paginationData.paginationList}
        </section>
    )
}