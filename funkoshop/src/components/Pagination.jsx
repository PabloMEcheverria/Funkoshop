import { useEffect } from "react";
import "../assets/css/Pagination.css";

export default function Pagination({ displayProductArr, setProductArr, paginationData, setPaginationData }) {
    useEffect(() => {
        console.log(pagination(displayProductArr));
        setPaginationData(pagination(displayProductArr));
    }, [displayProductArr, setPaginationData]);

    function moveTo(e) {
        console.log(e.target);
    }

    function pagination(productArr) {
        let newPaginationData = {...paginationData};
        let newProductArr = [];
        if (productArr.length > 9) {
            for (let i = 0; i < productArr.length; i += 9) {
                if (productArr.length - i > 9) {
                    newProductArr.push(productArr.slice(i, i + 9));
                } else {
                    newProductArr.push(productArr.slice(i));
                }
            }
        } else {
            newProductArr.push(productArr);
        }
        newPaginationData.segmentedProductArr = newProductArr;
        let paginationLinkArr = newProductArr.map((productArr, i, arr) => {
            let positionInPagination = paginationData.positionInPagination;
            if (arr.length <= 7) {
                return (
                    <li>
                        <button className="pagination__button" onClick={moveTo}>
                            {i + 1}
                        </button>
                    </li>
                )
            } else if (arr.length > 7) {
                if (positionInPagination <= 2) {
                    if (i + 1 <= 3 || i + 1 === arr.length) {
                        return (
                            <li>
                                <button className="pagination__button" onClick={moveTo}>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 4) {
                        return (
                            <li>
                                <button className="pagination__button" onClick={moveTo} isEllipsis={true}>
                                    ...
                                </button>
                            </li>
                        )
                    }
                }
                if (positionInPagination === 3) {
                    if (i + 1 <= 4 || i + 1 === arr.length) {
                        return (
                            <li>
                                <button className="pagination__button" onClick={moveTo}>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 5) {
                        return (
                            <li>
                                <button className="pagination__button" isEllipsis={true} onClick={moveTo}>
                                    ...
                                </button>
                            </li>
                        )
                    }
                }
                if (positionInPagination > 3 && positionInPagination <= arr.length - 2) {
                    if (i + 1 === 1 || 
                        i + 1 === arr.length || (
                        i + 1 >= positionInPagination - 1 && i + 1 <= positionInPagination + 1
                    )) {
                        return (
                            <li>
                                <button className="pagination__button" onClick={moveTo}>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 2 || i + 1 === arr.length - 1) {
                        return (
                            <li>
                                <button className="pagination__button" onClick={moveTo} isEllipsis={true}>
                                    ...
                                </button>
                            </li>
                        )
                    }
                }
                if (positionInPagination === arr.length - 2) {
                    if (i + 1 === 1 || i + 1 >= arr.legend - 3) {
                        return (
                            <li>
                                <button className="pagination__button" onClick={moveTo}>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 2) {
                        <li>
                            <button className="pagination__button" onClick={moveTo} isEllipsis={true}>
                                ...
                            </button>
                        </li>
                    }
                }
                if (positionInPagination >= arr.length - 1) {
                    if (i + 1 === 1 || i + 1 >= arr.length - 2) {
                        return (
                            <li>
                                <button className="pagination__button" onClick={moveTo}>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 2) {
                        return (
                            <li>
                                <button className="pagination__button" onClick={moveTo} isEllipsis={true}>
                                    ...
                                </button>
                            </li>
                        )
                    }
                }
            }
        });
        paginationLinkArr = paginationLinkArr.filter(element => element !== undefined);
        paginationLinkArr.unshift(<li><button className="pagination__button" onClick={moveTo}>prev</button></li>);
        paginationLinkArr.push(<li><button className="pagination__button" onClick={moveTo}>next</button></li>);
        newPaginationData.paginationList = <ul>{paginationLinkArr.map((link, i, arr) => {
            if (i === 0) {
                return (<li key={"prev"} id={"prev"} className="pagination__item">{link.props.children}</li>)
            } else if (i === arr.length - 1) {
                return (<li key={"next"} id={"next"} className="pagination__item">{link.props.children}</li>)
            } else {
                return (<li key={i} id={i} className="pagination__item">{link.props.children}</li>)       
            }
        })}</ul>;
        //disable ellipsis button.
        //select "selected" number's button.
        //disable prev when "1" button is selected.
        //disable next when last number button is selected.
        //disable prev and next when there is just one numbered button.
        return newPaginationData;
    };
    return (
        <section className="paginationSection">
            {paginationData.paginationList}
        </section>
    )
}