import { uniqueProductsArr } from "../data/products";
import Card from "./Card";
import "../assets/css/Carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function Carousel() {
    useEffect(() => {
        window.addEventListener("resize", modifyCardDisplay);
    })
    function modifyCardDisplay() {
        let newCardsToDisplay;
        if (cardsToDisplay.length === 3 && getCardCount() === 2) {
            newCardsToDisplay = cardsToDisplay.slice(0, 2);
            setCardsToDisplay(newCardsToDisplay);
        }
        if ((cardsToDisplay.length === 3 || cardsToDisplay.length === 2) && getCardCount() === 1) {
            newCardsToDisplay = cardsToDisplay.slice(0, 1);
            setCardsToDisplay(newCardsToDisplay);
        }
        if (cardsToDisplay.length < 3 && getCardCount() > cardsToDisplay.length) {
            let firstProductIndex = uniqueProductsArr.findIndex( product => product.id === cardsToDisplay[0].props.product.id );
            let newProductArr = uniqueProductsArr.slice(firstProductIndex, firstProductIndex + getCardCount());
            newCardsToDisplay = productToCardDisplay(newProductArr);
            setCardsToDisplay(newCardsToDisplay);
        }
    }
    
    const cardCount = getCardCount();
    function getCardCount() {
        let viewportWidth = window.innerWidth;
        let cardCount;
        if (viewportWidth < 768) {
            cardCount = 1;
        } else if (viewportWidth >= 768 && viewportWidth <= 1279) {
            cardCount = 2;
        } else {
            cardCount = 3;
        }
        return cardCount
    }
    const initialProductDisplay = uniqueProductsArr.slice(0, cardCount);
    
    function productToCardDisplay(productArr) {
        let cardsDisplay = productArr.map(( product, i, arr )  => {
            if (arr.length > 1) {
                return <Card key={i} product={product} className="flex_justify_spaceBetween" />
            } else {
                return <Card key={i} product={product} className="flex_justify_center" />
            }
        });
        return cardsDisplay
    }

    const [cardsToDisplay, setCardsToDisplay] = useState(productToCardDisplay(initialProductDisplay));
    const [disableButtons, setDisableButtons] = useState({beforeButton: true, nextButton: false});
    
    function handlePreviousClick(e) {
        if (cardsToDisplay[0].props.product.id === uniqueProductsArr[0].id) {
            setDisableButtons({beforeButton: true, nextButton: false});
        } else {
            let productPreviousIndex = uniqueProductsArr.findIndex( product => product.id === cardsToDisplay[0].props.product.id ) - 1;
            let newProductToDisplay = uniqueProductsArr.slice(productPreviousIndex, productPreviousIndex + cardCount);
            let newCardDisplay = productToCardDisplay(newProductToDisplay);
            setCardsToDisplay(newCardDisplay);
            if (cardsToDisplay[0].props.product.id === uniqueProductsArr[1].id) { //use useEffect here instead of uniqueProductsArr[1].id
                setDisableButtons({beforeButton: true, nextButton: false});
            } else {
                setDisableButtons({beforeButton: false, nextButton: false});
            }
        }
    }

    function handleNextClick(e) {
        if (cardsToDisplay[cardsToDisplay.length - 1].props.product.id === uniqueProductsArr[uniqueProductsArr.length - 1].id) {
            setDisableButtons({beforeButton: false, nextButton: true});
        } else {
            let productNextIndex = uniqueProductsArr.findIndex( product => product.id === cardsToDisplay[0].props.product.id) + 1;
            let newProductToDisplay = uniqueProductsArr.slice(productNextIndex, productNextIndex + cardsToDisplay.length);
            let newCardDisplay = productToCardDisplay(newProductToDisplay);
            setCardsToDisplay(newCardDisplay);
            let lastProductToDisplay = uniqueProductsArr[uniqueProductsArr.findIndex( product => product.id === cardsToDisplay[cardsToDisplay.length - 1].props.product.id) + 1];
            if (lastProductToDisplay.id === uniqueProductsArr[uniqueProductsArr.length - 1].id) {
                setDisableButtons({beforeButton: false, nextButton: true});
            } else {
                setDisableButtons({beforeButton: false, nextButton: false});
            }
        }

    }

    return (
        <div className={"carousel" + (cardCount > 1 ? " flex_justify_spaceBetween" : " flex_justify_center")}>
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