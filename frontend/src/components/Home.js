import React from 'react';

import '../styles/Home.css'; 

function Home() {
  return (
      <section id="home" className="home">
          <h1>Bienvenido a Mi Portafolio</h1>
          <p>
              Hola, soy <span className="highlight-name">Mauro Fernández</span>, un desarrollador web dedicado especializado en sitios web dinámicos y responsivos. Ofrezco desarrollo web personalizado, diseño de aplicaciones e integración de sistemas adaptados a tus necesidades. ¡Colaboremos para hacer realidad tus ideas!
          </p>
          <a href="#about" className="cta-button">Conoce Más Sobre Mí</a>
      </section>
  );
}

export default Home;
