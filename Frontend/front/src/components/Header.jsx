import '../style/Header.css';
import logo from '../assets/WebappFinanzas/logo.png';
import { useState, useEffect } from "react";

const Header = () => {

    // Estado para determinar si el usuario hizo scroll
    const [isScrolled, setIsScrolled] = useState(false);

    // Detecta el scroll del usuario
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) { // Si el scroll es mayor a 50px
                setIsScrolled(true); // Cambia el estado a true
            } else {
                setIsScrolled(false); // Vuelve el estado a false
            }
        };

        // Agrega el evento de scroll
        window.addEventListener("scroll", handleScroll);

        // Limpia el evento al desmontar el componente
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? "scrolled" : ""}`}>
            <div className="logo-container">
                <img src={logo} alt='Clara logo' className='logo' />
            </div>
            <nav>
                <ul className="nav-list">
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#nosotros">Nosotros</a></li>

                </ul>
            </nav>
            <button className='login-button'>Iniciar sesión</button>
        </header>
    );
};

export default Header;
