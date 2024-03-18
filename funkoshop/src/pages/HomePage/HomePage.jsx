import './HomePage.css';
import presentationArr from '../../data/licPresentation.js';
import LicensePresentation from '../../components/LicensePresentation.jsx';
import Carousel from '../../components/Carousel.jsx';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <main>
            <section className='newProducts'>
                <div className='newProducts_content'>
                    <h4 className='newProducts_title'>Nuevos Ingresos</h4>
                    <p className='newProducts_description'>Descubrí el próximo Funko Pop de tu colección</p>
                    <Link to="/shop" className='newProducts_button'>Shop</Link>
                </div>
            </section>
            {presentationArr.map( (license, i) => 
                <LicensePresentation 
                    key={license.title}
                    title={license.title}
                    description={license.description}
                    img={license.img}
                    index={i + 1}
                />)
            }
            <section className='news'>
                <h2 className='news__title'>últimos lazamientos</h2>
                <Carousel />
            </section>
        </main>
    )
}