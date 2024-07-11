import Card from "./Card";
import "../assets/css/Carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Carousel({ productsStock, location = "HomePage" }) {
    useEffect(() => {
        window.addEventListener("resize", modifyCardDisplay);
    })
    function modifyCardDisplay() {
        let newCardsToDisplay;
        if (window.innerWidth < 768) {
            newCardsToDisplay = cardsToDisplay.slice(0, 1);
        } else if (window.innerWidth >= 768 && window.innerWidth <= 1280) {
            newCardsToDisplay = cardsToDisplay.slice(0, 2);
        } else if (window.innerWidth > 1280) {
            newCardsToDisplay = cardsToDisplay;
        }
        setCardsToDisplay(newCardsToDisplay);
    }
    
    let cardCount;
    if (window.innerWidth < 768) {
        cardCount = 1;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1280) {
        cardCount = 2;
    } else if (window.innerWidth > 1280) {
        cardCount = 3;
    }
    const initialProductDisplay = productsStock.uniqueProductsArr.slice(0, cardCount);
    
    function productToCardDisplay(productArr) {
        let cardsDisplay = productArr.map(( product, i, arr )  => (
            <Link key={product.id} to={`/shop/${product.id}`} >
                <Card key={i} product={product} className={arr.length > 1 ? "flex_justify_spaceBetween" : "flex_justify_center"} />
            </Link>
        ));
        console.log(cardsDisplay);
        return cardsDisplay
    }

    const [cardsToDisplay, setCardsToDisplay] = useState(productToCardDisplay(initialProductDisplay));
    const [disableButtons, setDisableButtons] = useState({beforeButton: true, nextButton: false});
    
    function handlePreviousClick(e) {
        if (cardsToDisplay[0].props.children.props.product.id === productsStock.uniqueProductsArr[0].id) {
            setDisableButtons({beforeButton: true, nextButton: false});
        } else {
            let productPreviousIndex = productsStock.uniqueProductsArr.findIndex( product => product.id === cardsToDisplay[0].props.children.props.product.id ) - 1;
            let newProductToDisplay = productsStock.uniqueProductsArr.slice(productPreviousIndex, productPreviousIndex + cardCount);
            let newCardDisplay = productToCardDisplay(newProductToDisplay);
            setCardsToDisplay(newCardDisplay);
            if (cardsToDisplay[0].props.children.props.product.id === productsStock.uniqueProductsArr[1].id) { //use useEffect here instead of uniqueProductsArr[1].id
                setDisableButtons({beforeButton: true, nextButton: false});
            } else {
                setDisableButtons({beforeButton: false, nextButton: false});
            }
        }
    }

    function handleNextClick(e) {
        if (cardsToDisplay[cardsToDisplay.length - 1].props.children.props.product.id === productsStock.uniqueProductsArr[productsStock.uniqueProductsArr.length - 1].id) {
            setDisableButtons({beforeButton: false, nextButton: true});
        } else {
            let productNextIndex = productsStock.uniqueProductsArr.findIndex( product => product.id === cardsToDisplay[0].props.children.props.product.id) + 1;
            let newProductToDisplay = productsStock.uniqueProductsArr.slice(productNextIndex, productNextIndex + cardsToDisplay.length);
            let newCardDisplay = productToCardDisplay(newProductToDisplay);
            setCardsToDisplay(newCardDisplay);
            let lastProductToDisplay = productsStock.uniqueProductsArr[productsStock.uniqueProductsArr.findIndex( product => product.id === cardsToDisplay[cardsToDisplay.length - 1].props.children.props.product.id) + 1];
            if (lastProductToDisplay.id === productsStock.uniqueProductsArr[productsStock.uniqueProductsArr.length - 1].id) {
                setDisableButtons({beforeButton: false, nextButton: true});
            } else {
                setDisableButtons({beforeButton: false, nextButton: false});
            }
        }

    }

    return (
        <div className={location + "-carousel" + (cardCount > 1 ? " flex_justify_spaceBetween" : " flex_justify_center")}>
            <button className="previousButton" onClick={handlePreviousClick} disabled={disableButtons.beforeButton} >
                <FontAwesomeIcon icon={faAngleLeft} className="previousButton__icon" />
            </button>
            <button className="nextButton" onClick={handleNextClick} disabled={disableButtons.nextButton} >
                <FontAwesomeIcon icon={faAngleRight} className="nextButton__icon" />
            </button>
            {cardsToDisplay}
        </div>
    )
}