import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import '../assets/css/Carousel.css';
import useWindowWidth from '../hooks/useWindowWidth';   

export default function Carousel({ productsStock, location = 'HomePage' }) {
    const windowWidth = useWindowWidth();

    const getCardCount = () => {
        if (windowWidth < 768) return 1;
        if (windowWidth >= 768 && windowWidth <= 1279) return 2;
        return 3;
    };

    const getJustifyContent = () => {
        let justifyContentClass;
        if (getCardCount() === 3) {
            justifyContentClass = 'flex_justify_spaceBetween';
        } else if (getCardCount() === 2) {
            justifyContentClass = 'flex_justify_spaceAround';
        } else {
            justifyContentClass = 'flex_justify_center';
        }
        return justifyContentClass
    }

    const productToCardDisplay = (productArr) => {
        return productArr.map((product, i, arr) => (
            //<Link key={product.id} to={`/shop/${product.id}`} onClick={() => {window.location.href = `/shop/${product.id}`}}>
            //    <Card product={product} customClassName={arr.length > 1 ? 'flex_justify_spaceBetween' : 'flex_justify_center'} />
            //</Link>
            <Card   key={product.id}
                    product={product} 
                    customClassName={arr.length > 1 ? 'flex_justify_spaceBetween' : 'flex_justify_center'}
                    isInCarousel={true} />
        ));
    };
    
    const [cardsToDisplay, setCardsToDisplay] = useState(productToCardDisplay(productsStock.uniqueProductsArr.slice(0, getCardCount())));
    const [disableButtons, setDisableButtons] = useState({ beforeButton: true, nextButton: false });

    useEffect(() => {
        setCardsToDisplay(productToCardDisplay(productsStock.uniqueProductsArr.slice(0, getCardCount())));
    }, [windowWidth, productsStock]);

    const handlePreviousClick = () => {
        const firstProductId = cardsToDisplay[0].props.product.id;
        const firstProductIndex = productsStock.uniqueProductsArr.findIndex(product => product.id === firstProductId);
        if (firstProductIndex === 0) {
            setDisableButtons({ beforeButton: true, nextButton: false });
        } else {
            const newProductIndex = firstProductIndex - 1;
            const newCardsToDisplay = productToCardDisplay(productsStock.uniqueProductsArr.slice(newProductIndex, newProductIndex + getCardCount()));
            setCardsToDisplay(newCardsToDisplay);
            setDisableButtons({ beforeButton: newProductIndex === 0, nextButton: false });
        }
    };

    const handleNextClick = () => {
        const lastProductId = cardsToDisplay[cardsToDisplay.length - 1].props.product.id;
        const lastProductIndex = productsStock.uniqueProductsArr.findIndex(product => product.id === lastProductId);
        if (lastProductIndex === productsStock.uniqueProductsArr.length - 1) {
            setDisableButtons({ beforeButton: false, nextButton: true });
        } else {
            const newProductIndex = lastProductIndex + 1;
            const newCardsToDisplay = productToCardDisplay(productsStock.uniqueProductsArr.slice(newProductIndex, newProductIndex + getCardCount()));
            setCardsToDisplay(newCardsToDisplay);
            setDisableButtons({ beforeButton: false, nextButton: newProductIndex + getCardCount() >= productsStock.uniqueProductsArr.length });
        }
    };

    return (
        <div className={location + '-carousel ' + getJustifyContent()}>
            <button className="previousButton" onClick={handlePreviousClick} disabled={disableButtons.beforeButton}>
                <FontAwesomeIcon icon={faAngleLeft} className="previousButton__icon" />
            </button>
            <button className="nextButton" onClick={handleNextClick} disabled={disableButtons.nextButton}>
                <FontAwesomeIcon icon={faAngleRight} className="nextButton__icon" />
            </button>
            {cardsToDisplay}
        </div>
    );
}
