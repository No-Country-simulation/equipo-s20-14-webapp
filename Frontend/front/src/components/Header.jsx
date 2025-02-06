import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/WebappFinanzas/logo.png";
import { useAuthStore } from "../store/auth";
import { useCategoryStore } from "../store/category";
import "../style/Header.css";

const Header = () => {
  // Estado para determinar si el usuario hizo scroll
  const [isScrolled, setIsScrolled] = useState(false);

  const isAuth = useAuthStore((state) => state.isAuth);
  const logout = useAuthStore((state) => state.logOut);
  const cleanCategorias = useCategoryStore((state) => state.cleanCategorias);
  const navigate = useNavigate();

  // Detecta el scroll del usuario
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
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
        <img src={logo} alt="Clara logo" className="logo" />
      </div>
      <nav>
        <ul className="nav-list">
          <li>
            <a href="#inicio">Inicio</a>
          </li>
          <li>
            <a href="#nosotros">Nosotros</a>
          </li>
        </ul>
      </nav>
      <button
        className="login-button"
        onClick={() => {
          logout();
          cleanCategorias();
          navigate("/login");
        }}
      >
        {isAuth ? "Cerrar sesión" : "Iniciar sesión"}
      </button>
    </header>
  );
};

export default Header;
