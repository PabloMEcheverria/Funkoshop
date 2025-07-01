import './HomePage.css';
import LicensePresentation from '../../components/LicensePresentation.jsx';
import Carousel from '../../components/Carousel.jsx';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js'; 

export default function HomePage() {
    const { products } = useUser();
    const uniqueProductsArr = products.filter((product, index, self) => 
        index === self.findIndex((p) => p.name_product === product.name_product)
    );
    uniqueProductsArr.sort((a, b) => a.id - b.id);
    console.log("Unique Products Array:", uniqueProductsArr);
    const licenseShowcase = [];
    products.forEach(product => {
        if (licenseShowcase.length === 0) {
            licenseShowcase.push(product);
        }
        if (!licenseShowcase.some(item => item.license === product.license)) {
            licenseShowcase.push(product);
        }
    });
    licenseShowcase.sort((a, b) => a.id - b.id);
    const presentationArr = [];
    licenseShowcase.forEach(product => {
        if (product.license === "Star Wars") {
            presentationArr.push({...product, title: <>Star Wars & <br />The Mandalorian</>, license_description: "Disfruta de una saga que sigue agregando personajes a su colección."});
        }
        if (product.license === "Pokemon") {
            presentationArr.push({...product, title: "Pokemon", license_description: "Atrapa todos los que puedas y disfruta de una colección llena de amigos."});
        }
        if (product.license === "Harry Potter") {
            presentationArr.push({...product, title: "Harry Potter", license_description: "Revive los recuerdos de una saga llena de magia y encanto."});
        }
        if (product.license === "Naruto Shippuden") {
            presentationArr.push({...product, title: "Naruto Shippuden", license_description: "Sumérgete en un universo de ninjas legendarios y otros seres misteriosos."});
        }
    });

    return (
        <main className='home'>
            <section className='newProducts'>
                <div className='newProducts_content'>
                    <h4 className='newProducts_title'>Nuevos Ingresos</h4>
                    <p className='newProducts_description'>Descubrí el próximo Funko Pop de tu colección</p>
                    <Link to="/shop" className='newProducts_button'>Shop</Link>
                </div>
            </section>
            {presentationArr.map((license, i) => 
                <LicensePresentation 
                    key={i}
                    title={license.title}
                    license_description={license.license_description}
                    img={license.front_img}
                    index={i + 1}
                />)
            }
            <section className='news'>
                <h2 className='news__title'>últimos lazamientos</h2>
                <Carousel uniqueProductsArr={uniqueProductsArr} />
            </section>
        </main>
    )
}