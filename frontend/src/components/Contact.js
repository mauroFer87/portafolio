import React, { useState, useEffect } from 'react';
import { getContact, sendContactForm } from '../api';
import '../styles/Contact.css';

import linkedinIcon from './img/linkedin.png';
import githubIcon from './img/github.png';

const Contact = () => {
  const [contact, setContact] = useState(null);
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await getContact();
        setContact(response.data);
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };

    fetchContact();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Bloquear el botón y cambiar el texto a "Enviando..."

    const honeypot = event.target.honeypot.value;
    if (honeypot) {
      // Si el honeypot está lleno, detén el envío.
      setIsSubmitting(false);
      return;
    }

    const token = await window.grecaptcha.execute('6Lenvn0qAAAAAIg1kk4_Sbjj8iwoRJZ5SSmlWDv6', { action: 'submit' });
    setToken(token);

    const formData = new FormData(event.target);
    formData.append('g-recaptcha-response', token);

    try {
      await sendContactForm(Object.fromEntries(formData));
      alert('Mensaje enviado con éxito!');
    } catch (error) {
      console.error('Error sending contact form:', error);
    } finally {
      setIsSubmitting(false); // Desbloquear el botón después del resultado
    }
  };

  return (
    <section id="contact" className="contact">
      <h2>Contacto</h2>
      <p>Si deseas ponerte en contacto, no dudes en enviarme un correo electrónico o conectar conmigo en las redes sociales. ¡Siempre estoy abierto a nuevas oportunidades y colaboraciones!</p>

      <form id="contact-form" className="contact-form" method="POST" onSubmit={handleSubmit}>
        <input type="text" name="honeypot" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

        <label htmlFor="from_name">Nombre:</label>
        <input type="text" id="from_name" name="from_name" required aria-labelledby="name-label" />

        <label htmlFor="email_id">Correo Electrónico:</label>
        <input type="email" id="email_id" name="email_id" required aria-labelledby="email-label" />

        <label htmlFor="message">Mensaje:</label>
        <textarea id="message" name="message" rows="4" required aria-labelledby="message-label"></textarea>

        <button type="submit" id="submit-button" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </form>

      {contact && (
        <div>
          <p>O contacta conmigo directamente en: <a href={`mailto:${contact.mail}`} className="email-link">{contact.mail}</a></p>

          <div className="social-media">
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="social-media-link">
              <img src={linkedinIcon} alt="Perfil de LinkedIn" className="social-media-icon" />
              LinkedIn
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="social-media-link">
              <img src={githubIcon} alt="Perfil de GitHub" className="social-media-icon" />
              GitHub
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
