import { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import '../assets/css/Carousel.css';
import useWindowWidth from '../hooks/useWindowWidth';
import { useUser } from '../context/UserContext';

export default function Carousel({ location = 'HomePage' }) {
  const { products } = useUser();
  const uniqueProducts = useMemo(() => {
    const uniqueArray = [];
    products.forEach((product) => {
      if (!uniqueArray.some((item) => item.name_product === product.name_product)) {
        uniqueArray.push(product);
      }
    });
    uniqueArray.sort((a, b) => a.name_product.localeCompare(b.name_product));
    console.log("Unique products:", uniqueArray);
    return uniqueArray;
  }, [products]);
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
    const slicedProducts = uniqueProducts.slice(startIndex, startIndex + getCardCount());
    setCardsToDisplay(productToCardDisplay(slicedProducts));
  }, [startIndex, windowWidth, uniqueProducts]);

  useEffect(() => {
    const total = products.length;
    const count = getCardCount();
    setDisableButtons({
      beforeButton: startIndex === 0,
      nextButton: startIndex + count >= total
    });
  }, [startIndex, windowWidth, products]);

  const handlePreviousClick = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextClick = () => {
    const count = getCardCount();
    const maxStartIndex = Math.max(0, products.length - count);
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