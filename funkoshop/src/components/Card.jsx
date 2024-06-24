import '../assets/css/Card.css';
import { useState, useEffect } from 'react';

export default function Card({ product, customClassName }) {
    const [cardImg, setCardImg] = useState(product.frontImg);
    useEffect(() => {setCardImg(product.frontImg)}, [product]);
    const handleOnMouseEnter = () => setCardImg(product.backImg);
    const handleOnMouseLeave = () => setCardImg(product.frontImg);
    return (
        <div className={`card ${customClassName ? customClassName: ""}`}
             onMouseEnter={handleOnMouseEnter} 
             onMouseLeave={handleOnMouseLeave}>
            {product.isNew && <div className='card__isNew'><p className='card__isNewText'>Nuevo</p></div>}
            <img className='card__img' 
                 src={cardImg} 
                 alt={"Imagen de funko pop de " + product.nameProduct} />
            <p className='card__license'>{product.license}</p>
            <h5 className='card__nameProduct'>{product.nameProduct}</h5>
            <p className='card__price'>{"$ " + product.price}</p>
            {product.paymentMethods.length === 1 && product.paymentMethods[0] === 1
                ? <p className='card__paymentMethods'>precio final</p> 
                : <p className='card__paymentMethods'>
                        {product.paymentMethods[0] === 1 
                            ? product.paymentMethods[1] + " cuotas sin interés" 
                            : product.paymentMethods[0] + " cuotas sin interés"}</p>
                        }
        </div>
    )
}