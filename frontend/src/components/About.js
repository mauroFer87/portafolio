// src/components/About.js
import React, { useState, useEffect } from 'react';
import { getAbout } from '../api';
import '../styles/About.css'; 

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await getAbout();
        setAbout(response.data);
      } catch (error) {
        console.error('Error fetching about:', error);
      }
    };

    fetchAbout();
  }, []);

  return (
    <section id="about" className="about">

      <h1>Sobre mi</h1>
      {about && about.image ? <img src={about.image} alt="About" /> : <p>Loading...</p>}
      {about ? <p>{about.text}</p> : <p>Loading...</p>}
      
    </section>
  );
};

export default About;
