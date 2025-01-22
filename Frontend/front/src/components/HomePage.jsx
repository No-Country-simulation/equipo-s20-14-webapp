import '../style/HomePage.css';


// Imágenes del carousel
import img1 from '../assets/Webapp Finanzas/Page 1/imagen01.webp';
import img2 from '../assets/Webapp Finanzas/Page 1/imagen04.webp';
import img3 from '../assets/Webapp Finanzas/Page 1/imagen03.webp';
import { useEffect, useState } from 'react';
import Footer from './Footer';


const imagenes = [
    { src: img1, alt: "Organiza tus finanzas fácilmente."},
    { src: img2, alt: "Crea presupuestos personalizados"},
    { src: img3, alt: "Visualiza tus gastos en gráficos claros"}
];


const HomePage = () => {
    //Configuración del carousel automático
    const [currentIndex, setCurrentIndex] = useState(0);

    //Cambiar la imagen cada 3 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex +1) % imagenes.length);
        }, 3000);
        return () => clearInterval(interval);//Limpia elintervalo al desmontar
    }, []);
    
        
    

    return (
        <div className='homepage'>
            {/* Sección de bienvenida */}
            <header className='headerhome'>
                <h1>Bienvenidos a Clara</h1>
            </header>

            {/*Carousel con descripción */}
            <section className='carousel-section'>
            <div className='descripcion-container'>
                    <h2 className='descripcion-titulo'>¿Qué es Clara?</h2>
                    <p className='descripcion-texto'>
                    Clara es una aplicación diseñada para ayudarte a gestionar tus finanzas personales de manera fácil y eficiente. 
                    Con Clara, puedes crear presupuestos personalizados, realizar un seguimiento de tus gastos y visualizar informes 
                    claros que te permitirán tomar decisiones financieras más inteligentes.
                    </p>
                    <button className='btn-probar'
                    aria-label='Probar la aplicación Clara'>
                        Probar</button>
                </div>

                <div className='carousel-container'>
                    <div className='carousel-item'>
                        <img
                        src={imagenes[currentIndex].src}
                        alt={imagenes[currentIndex].alt}
                        className='carousel-imagen'>
                        </img>

                        <p className='carousel-descripcion'>{imagenes[currentIndex].alt}</p>
                    </div>
                </div> 
            </section>

            <Footer/>
            
        </div>
    )
}

export default HomePage;