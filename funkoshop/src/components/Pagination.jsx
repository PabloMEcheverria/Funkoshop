import React, { useEffect, useState } from "react";
import "../assets/css/Pagination.css";
import PaginationButton from "./PaginationButton";

export default function Pagination({ displayProductArr, setProductArr, paginationData, setPaginationData }) {
    const [buttonData, setButtonData] = useState({
        prevDisabled: false, 
        nextDisabled: false, 
        moveTo: function moveTo(e) {
            console.log(e.target);
        }
    });
    useEffect(() => {
        console.log(pagination(displayProductArr));
        setPaginationData(pagination(displayProductArr));
    }, [displayProductArr, setPaginationData]);

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
                return (<PaginationButton buttonData={buttonData} index={i + 1} />)
            } else if (arr.length > 7) {
                if (positionInPagination <= 2) {
                    if (i + 1 <= 3 || i + 1 === arr.length) {
                        return (<PaginationButton buttonData={buttonData} index={i + 1} />)
                    } else if (i + 1 === 4) {
                        return (<PaginationButton buttonData={buttonData} isEllipsis={true} />)
                    }
                }
                if (positionInPagination === 3) {
                    if (i + 1 <= 4 || i + 1 === arr.length) {
                        return (<PaginationButton buttonData={buttonData} index={i + 1} />)
                    } else if (i + 1 === 5) {
                        return (<PaginationButton buttonData={buttonData} isEllipsis={true} />)
                    }
                }
                if (positionInPagination > 3 && positionInPagination <= arr.length - 2) {
                    if (i + 1 === 1 || 
                        i + 1 === arr.length || (
                        i + 1 >= positionInPagination - 1 && i + 1 <= positionInPagination + 1
                    )) {
                        return (<PaginationButton buttonData={buttonData} index={i + 1} />)
                    } else if (i + 1 === 2 || i + 1 === arr.length - 1) {
                        return (<PaginationButton buttonData={buttonData} isEllipsis={true} />)
                    }
                }
                if (positionInPagination === arr.length - 2) {
                    if (i + 1 === 1 || i + 1 >= arr.legend - 3) {
                        return (<PaginationButton buttonData={buttonData} index={i + 1} />)
                    } else if (i + 1 === 2) {
                        return (<PaginationButton buttonData={buttonData} isEllipsis={true} />)
                    }
                }
                if (positionInPagination >= arr.length - 1) {
                    if (i + 1 === 1 || i + 1 >= arr.length - 2) {
                        return (<PaginationButton buttonData={buttonData} index={i + 1} />)
                    } else if (i + 1 === 2) {
                        return (<PaginationButton buttonData={buttonData} isEllipsis={true} />)
                    }
                }
            }
        });
        paginationLinkArr = paginationLinkArr.filter(element => element !== undefined);
        paginationLinkArr.unshift(<PaginationButton buttonData={buttonData} isPrev={true} />);
        paginationLinkArr.push(<PaginationButton buttonData={buttonData} isNext={true} />);
        newPaginationData.paginationList = <ul>{paginationLinkArr.map((link, i, arr) => {
            if (i === 0) {
                return (<li key={"prev"} id={"prev"} className="pagination__item">{link}</li>)
            } else if (i === arr.length - 1) {
                return (<li key={"next"} id={"next"} className="pagination__item">{link}</li>)
            } else {
                console.log(link.props.index);
                if (link.props.index === paginationData.positionInPagination) {
                    return (<li key={i} id={i} className="pagination__item--selected">{link}</li>)
                } else {
                    return (<li key={i} id={i} className="pagination__item">{link}</li>)
                }
            }
        })}</ul>;
        console.log(newPaginationData.paginationList.props.children);
        //disable ellipsis button. CHECKED.
        //select "selected" number's button. CHECKED.
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