import '../assets/css/LicensePresentation.css';

export default function LicensePresentation({ title, license_description, img, index }) {
    if (index % 2 !== 0) {
        return (
            <article className='product'>
                <section className='product__info product__info--odd'>
                    <div className='product__details'>
                        <h3 className='product__title'>{title}</h3>
                        <p className='product__description'>{license_description}</p>
                    </div>
                    <button className='product__button'>ver colección</button>
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
                    <button className='product__button'>ver colección</button>
                </section>
                <img className='product__image product__image--even' src={img} alt={`Imagen de figura Funko de la franquicia ${title}.`} />
            </article>
        )
    }
    
}