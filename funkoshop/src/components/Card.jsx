import '../assets/css/Card.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Card({ product, customClassName, isInCatalogue = false, isInCarousel = false }) {
    const [cardImg, setCardImg] = useState(product.front_img);
    useEffect(() => {setCardImg(product.front_img)}, [product]);
    const handleOnMouseEnter = () => setCardImg(product.back_img);
    const handleOnMouseLeave = () => setCardImg(product.front_img);
    const handleOnClick = () => {window.location.href = `/shop/${product.id}`}; //Can't fix the lack of auto re-render even when the url changes correctly, so this function will force to reload whole page.
    return (
        <Link   key={product.id} 
                to={`/shop/${product.id}`} 
                className={isInCatalogue ? "product-grid__item" : "CatalogueCard"} 
                onClick={handleOnClick}>
            <div className={`card ${customClassName ? customClassName: ""}`}
                 onMouseEnter={handleOnMouseEnter} 
                 onMouseLeave={handleOnMouseLeave}>
                {product.is_new && <div className='card__isNew'><p className='card__isNewText'>Nuevo</p></div>}
                <img className='card__img' 
                     src={cardImg} 
                     alt={"Imagen de funko pop de " + product.name_product} />
                <p className='card__license'>{product.license}</p>
                <h5 className='card__nameProduct'>{product.name_product}</h5>
                <p className='card__price'>{"$ " + product.price}</p>
                {product.payment_methods.length === 1 && product.payment_methods[0] === 1
                    ? <p className='card__paymentMethods'>precio final</p> 
                    : <p className='card__paymentMethods'>
                            {product.payment_methods[0] === 1 
                                ? product.payment_methods[1] + " cuotas sin interés" 
                                : product.payment_methods[0] + " cuotas sin interés"}</p>
                            }
            </div>
        </Link>
    )
}