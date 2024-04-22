import { useEffect } from "react";
import "../assets/css/Pagination.css";

export default function Pagination({ displayProductArr, setProductArr, paginationData, setPaginationData }) {
    useEffect(() => {
        setPaginationData(pagination(displayProductArr));
    }, [displayProductArr, setPaginationData]);

    function pagination(productArr) {
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
            newProductArr = productArr;
        }
        let paginationLinkArr = newProductArr.map((productArr, i, arr) => {
            let positionInPagination = paginationData.positionInPagination;
            if (arr.length <= 7) {
                return (
                    <li>
                        <button>
                            {i + 1}
                        </button>
                    </li>
                )
            } else if (arr.length > 7) {
                if (positionInPagination <= 2) {
                    if (i + 1 <= 3 || i + 1 === arr.length) {
                        return (
                            <li>
                                <button>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 4) {
                        return (
                            <li>
                                <button isEllipsis={true}>
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
                                <button>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 5) {
                        return (
                            <li>
                                <button isEllipsis={true}>
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
                                <button>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 2 || i + 1 === arr.length - 1) {
                        return (
                            <li>
                                <button isEllipsis={true}>
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
                                <button>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 2) {
                        <li>
                            <button isEllipsis={true}>
                                ...
                            </button>
                        </li>
                    }
                }
                if (positionInPagination >= arr.length - 1) {
                    if (i + 1 === 1 || i + 1 >= arr.length - 2) {
                        return (
                            <li>
                                <button>
                                    {i + 1}
                                </button>
                            </li>
                        )
                    } else if (i + 1 === 2) {
                        return (
                            <li>
                                <button isEllipsis={true}>
                                    ...
                                </button>
                            </li>
                        )
                    }
                }
            }
        });
        paginationLinkArr = paginationLinkArr.filter(element => element !== undefined);
        paginationLinkArr.unshift(<li><button>prev</button></li>);
        paginationLinkArr.push(<li><button>next</button></li>);
        let newPaginationData = {...paginationData};
        newPaginationData.paginationList = <ul>{paginationLinkArr.map((link, i, arr) => {
            if (i === 0) {
                return (<li key={"prev"}>{link.props.children}</li>)
            } else if (i === arr.length - 1) {
                return (<li key={"next"}>{link.props.children}</li>)
            } else {
                return (<li key={i}>{link.props.children}</li>)       
            }
        })}</ul>;
        return newPaginationData;

        
    };
    console.log(paginationData);
    return (
        <section className="pagination">
            {paginationData.paginationList}
        </section>
    )
}