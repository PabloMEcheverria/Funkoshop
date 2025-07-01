import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import '../assets/css/Carousel.css';
import useWindowWidth from '../hooks/useWindowWidth';
import { useUser } from '../context/UserContext';

export default function Carousel({ uniqueProductsArr, location = 'HomePage' }) {
  const { products } = useUser();
  const windowWidth = useWindowWidth();

  const getCardCount = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth >= 768 && windowWidth <= 1279) return 2;
    return 3;
  };

  const getJustifyContent = () => {
    const count = getCardCount();
    if (count === 3) return 'flex_justify_spaceBetween';
    if (count === 2) return 'flex_justify_spaceAround';
    return 'flex_justify_center';
  };

  const productToCardDisplay = (productSlice) => {
    return productSlice.map((product, i, arr) => (
      <Card
        key={product.id}
        product={product}
        customClassName={arr.length > 1 ? 'flex_justify_spaceBetween' : 'flex_justify_center'}
        isInCarousel={true}
      />
    ));
  };

  const [startIndex, setStartIndex] = useState(0);
  const [cardsToDisplay, setCardsToDisplay] = useState([]);
  const [disableButtons, setDisableButtons] = useState({ beforeButton: true, nextButton: false });

  useEffect(() => {
    const slicedProducts = uniqueProductsArr.slice(startIndex, startIndex + getCardCount());
    setCardsToDisplay(productToCardDisplay(slicedProducts));
  }, [startIndex, windowWidth, uniqueProductsArr]);

  useEffect(() => {
    const total = uniqueProductsArr.length;
    const count = getCardCount();
    setDisableButtons({
      beforeButton: startIndex === 0,
      nextButton: startIndex + count >= total
    });
  }, [startIndex, windowWidth, uniqueProductsArr]);

  const handlePreviousClick = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextClick = () => {
    const count = getCardCount();
    const maxStartIndex = Math.max(0, uniqueProductsArr.length - count);
    setStartIndex((prev) => Math.min(prev + 1, maxStartIndex));
  };

  return (
    <div className={`${location}-carousel ${getJustifyContent()}`}>
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