
import '../style/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()}Clara-Finanzas Personales. Todo los derechos reservados </p>
                <div className="footer-links">
                    <a href="#nosotros">Sobre Nosotros</a>
                    <a className="#privacy">Politicas de Privacidad</a>
                    <a className="contact">Contacto</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;