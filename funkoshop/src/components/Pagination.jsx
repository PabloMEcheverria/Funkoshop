import React, { useEffect, useState } from "react";
import "../assets/css/Pagination.css";
import PaginationButton from "./PaginationButton";

export default function Pagination({ displayProductArr, setProductArr, paginationData, setPaginationData }) {
    console.log(paginationData);
    /*const [buttonData, setButtonData] = useState({
        prevDisabled: false, 
        nextDisabled: false, 
        moveTo: function moveTo(e) {
            console.log(parseInt(e.target.id));
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
                if (i + 1 === positionInPagination) {
                    return (<PaginationButton buttonData={buttonData} index={i + 1} disabledValue={true} />)
                } else {
                    return (<PaginationButton buttonData={buttonData} index={i + 1} />)
                }
            } else if (arr.length > 7) {
                if (positionInPagination <= 2) {
                    if (i + 1 <= 3 || i + 1 === arr.length) {
                        if (i + 1 === positionInPagination) {
                            return (<PaginationButton buttonData={buttonData} index={i + 1} disabledValue={true} />)
                        } else {
                            return (<PaginationButton buttonData={buttonData} index={i + 1} />)
                        }
                    } else if (i + 1 === 4) {
                        return (<PaginationButton buttonData={buttonData} isEllipsis={true} />)
                    }
                }
                if (positionInPagination === 3) {
                    if (i + 1 <= 4 || i + 1 === arr.length) {
                        if (i + 1 === positionInPagination) {
                            return (<PaginationButton buttonData={buttonData} index={i + 1} disabledValue={true} />)
                        } else {
                            return (<PaginationButton buttonData={buttonData} index={i + 1} />)
                        }
                    } else if (i + 1 === 5) {
                        return (<PaginationButton buttonData={buttonData} isEllipsis={true} />)
                    }
                }
                if (positionInPagination > 3 && positionInPagination <= arr.length - 2) {
                    if (i + 1 === 1 || 
                        i + 1 === arr.length || (
                        i + 1 >= positionInPagination - 1 && i + 1 <= positionInPagination + 1
                    )) {
                        if (i + 1 === positionInPagination) {
                            return (<PaginationButton buttonData={buttonData} index={i + 1} disabledValue={true} />)
                        } else {
                            return (<PaginationButton buttonData={buttonData} index={i + 1} />)
                        }
                    } else if (i + 1 === 2 || i + 1 === arr.length - 1) {
                        return (<PaginationButton buttonData={buttonData} isEllipsis={true} />)
                    }
                }
                if (positionInPagination === arr.length - 2) {
                    if (i + 1 === 1 || i + 1 >= arr.legend - 3) {
                        if (i + 1 === positionInPagination) {
                            return (<PaginationButton buttonData={buttonData} index={i + 1} disabledValue={true} />)
                        } else {
                            return (<PaginationButton buttonData={buttonData} index={i + 1} />)
                        }
                    } else if (i + 1 === 2) {
                        return (<PaginationButton buttonData={buttonData} isEllipsis={true} />)
                    }
                }
                if (positionInPagination >= arr.length - 1) {
                    if (i + 1 === 1 || i + 1 >= arr.length - 2) {
                        if (i + 1 === positionInPagination) {
                            return (<PaginationButton buttonData={buttonData} index={i + 1} disabledValue={true} />)
                        } else {
                            return (<PaginationButton buttonData={buttonData} index={i + 1} />)
                        }
                    } else if (i + 1 === 2) {
                        return (<PaginationButton buttonData={buttonData} isEllipsis={true} />)
                    }
                }
            }
        });
        paginationLinkArr = paginationLinkArr.filter(element => element !== undefined);
        if (paginationData.positionInPagination === 1) {
            paginationLinkArr.unshift(<PaginationButton buttonData={buttonData} isPrev={true} disabledValue={true} />);
        } else {
            paginationLinkArr.unshift(<PaginationButton buttonData={buttonData} isPrev={true} />);
        }
        if (paginationLinkArr[paginationLinkArr.length - 1].props.index === paginationData.positionInPagination) {
            paginationLinkArr.push(<PaginationButton buttonData={buttonData} isNext={true} disabledValue={true} />);
        } else {
            paginationLinkArr.push(<PaginationButton buttonData={buttonData} isNext={true} />);
        }
        newPaginationData.paginationList = <ul>{paginationLinkArr.map((link, i, arr) => {
            if (i === 0) {
                if (paginationData.positionInPagination === 1) {
                    return (<li key={"prev"} id={"prev"} className="pagination__item--disabled">{link}</li>)
                } else {
                    return (<li key={"prev"} id={"prev"} className="pagination__item">{link}</li>)
                }
            } else if (i === arr.length - 1) {
                if (arr[i - 1].props.index === paginationData.positionInPagination) {
                    return (<li key={"next"} id={"next"} className="pagination__item--disabled">{link}</li>)
                } else {
                    return (<li key={"next"} id={"next"} className="pagination__item">{link}</li>)
                }
            } else {
                if (link.props.isEllipsis === true) {
                    return (<li key={"...-" + i} id={link.props.index} className="pagination__item">{link}</li>)
                } else if (link.props.index === paginationData.positionInPagination) {
                    return (<li key={link.props.index} id={link.props.index} className="pagination__item--selected">{link}</li>)
                } else {
                    return (<li key={link.props.index} id={link.props.index} className="pagination__item">{link}</li>)
                }
            }
        })}</ul>;
        //disable ellipsis button. CHECKED.
        //select "selected" number's button. CHECKED.
        //disable prev when "1" button is selected. CHECKED.
        //disable next when last number button is selected. CHECKED.
        //disable prev and next when there is just one numbered button. CHECKED.
        //disabled number botton when its selected. CHECKED.
        return newPaginationData;
    };*/
    return (
        <section className="paginationSection">
            {paginationData.paginationList}
        </section>
    )
}