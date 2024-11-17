import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 
import logo from '../logo.ico'; // Importar el logo

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.navbar')) {
                closeMenu();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img  src={logo} alt="Logo" />
            </div>
            <ul id="nav-list" className={`nav-list nav-links ${isOpen ? 'open' : ''}`}>
                <li><a href="#home">Inicio</a></li>
                <li><a href="#about">Sobre Mí</a></li>
                <li><a href="#skills">Habilidades</a></li>
                <li><a href="#contact">Contacto</a></li>
            </ul>
            <div className="hamburger" id="hamburger" onClick={toggleMenu}>
                ☰
            </div>
        </nav>
    );
}

export default Navbar;
