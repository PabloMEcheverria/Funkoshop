import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import '../assets/css/Carousel.css';
import useWindowWidth from '../hooks/useWindowWidth';
import { useUser } from '../context/UserContext';

export default function Carousel({ location = 'HomePage' }) {
  const [startIndex, setStartIndex] = useState(0);
  const { products } = useUser();
  const windowWidth = useWindowWidth();

  const getCardCount = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth >= 768 && windowWidth <= 1279) return 2;
    return 3;
  };

  const cardCount = getCardCount();

  const uniqueProducts = useMemo(() => {
    const unique = Array.from(new Set(products.map(p => p.name_product)))
      .map(name => products.find(p => p.name_product === name));
    return unique;
  }, [products]);

  const slicedProducts = useMemo(() => {
    return uniqueProducts.slice(startIndex, startIndex + cardCount);
  }, [startIndex, cardCount, uniqueProducts]);

  const disableButtons = useMemo(() => ({
    beforeButton: startIndex === 0,
    nextButton: startIndex + cardCount >= uniqueProducts.length
  }), [startIndex, cardCount, uniqueProducts.length]);

  const getJustifyContent = () => {
    if (cardCount === 3) return 'flex_justify_spaceBetween';
    if (cardCount === 2) return 'flex_justify_spaceAround';
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

  const handlePreviousClick = () => {
    setStartIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNextClick = () => {
    const maxStartIndex = Math.max(0, uniqueProducts.length - cardCount);
    setStartIndex(prev => Math.min(prev + 1, maxStartIndex));
  };

  return (
    <div className={`${location}-carousel ${getJustifyContent()}`}>
      <button className="previousButton" onClick={handlePreviousClick} disabled={disableButtons.beforeButton}>
        <FontAwesomeIcon icon={faAngleLeft} className="previousButton__icon" />
      </button>
      <button className="nextButton" onClick={handleNextClick} disabled={disableButtons.nextButton}>
        <FontAwesomeIcon icon={faAngleRight} className="nextButton__icon" />
      </button>
      {productToCardDisplay(slicedProducts)}
    </div>
  );
}