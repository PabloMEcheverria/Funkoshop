import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import '../assets/css/Carousel.css';
import useWindowWidth from '../hooks/useWindowWidth';

export default function Carousel({ productsStock, location = 'HomePage' }) {
    const windowWidth = useWindowWidth();

    const getCardCount = () => {
        if (windowWidth < 768) return 1;
        if (windowWidth >= 768 && windowWidth < 1280) return 2;
        return 3;
    };

    const productToCardDisplay = (productArr) => {
        return productArr.map((product, i, arr) => (
            <Link key={product.id} to={`/shop/${product.id}`}>
                <Card key={i} product={product} className={arr.length > 1 ? 'flex_justify_spaceBetween' : 'flex_justify_center'} />
            </Link>
        ));
    };

    const [cardsToDisplay, setCardsToDisplay] = useState(productToCardDisplay(productsStock.uniqueProductsArr.slice(0, getCardCount())));
    const [disableButtons, setDisableButtons] = useState({ beforeButton: true, nextButton: false });

    useEffect(() => {
        const cardCount = getCardCount();
        setCardsToDisplay(productToCardDisplay(productsStock.uniqueProductsArr.slice(0, cardCount)));
    }, [windowWidth, productsStock]);

    const handlePreviousClick = (e) => {
        const firstProductId = cardsToDisplay[0].props.children.props.product.id;
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

    const handleNextClick = (e) => {
        const lastProductId = cardsToDisplay[cardsToDisplay.length - 1].props.children.props.product.id;
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
        <div className={location + '-carousel' + (getCardCount() > 1 ? ' flex_justify_spaceBetween' : ' flex_justify_center')}>
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
