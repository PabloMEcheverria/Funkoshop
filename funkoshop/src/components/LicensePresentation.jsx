import '../assets/css/LicensePresentation.css';
import { Link } from 'react-router-dom';

export default function LicensePresentation({ title, license_description, img, index, filterData, setFilterData }) {
    if (index % 2 !== 0) {
        return (
            <article className='product'>
                <section className='product__info product__info--odd'>
                    <div className='product__details'>
                        <h3 className='product__title'>{title}</h3>
                        <p className='product__description'>{license_description}</p>
                    </div>
                    <Link to="/shop" onClick={() => {
                        console.log({ ...filterData, nameOrCategory: title });
                        setFilterData({ ...filterData, nameOrCategory: title });
                    }} className='product__button'>ver colección</Link>
                </section>
                <img className='product__image product__image--odd' src={img} alt={`Imagen de figura Funko de la franquicia ${title}.`} />
            </article>
        )
    } else {
        return (
            <article className='product'>
                <section className='product__info product__info--even'>
                    <div className='product__details'>
                        <h3 className='product__title'>{title}</h3>
                        <p className='product__description'>{license_description}</p>
                    </div>
                    <Link to="/shop" className='product__button' onClick={() => {
                        console.log({ ...filterData, nameOrCategory: title });
                        setFilterData({ ...filterData, nameOrCategory: title });
                    }} >ver colección</Link>
                </section>
                <img className='product__image product__image--even' src={img} alt={`Imagen de figura Funko de la franquicia ${title}.`} />
            </article>
        )
    }
    
}