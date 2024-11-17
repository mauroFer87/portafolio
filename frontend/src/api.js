// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL de tu backend Django
});

// Funciones para las peticiones
export const getAbout = async () => { 
    try { return await api.get('/about/'); 

    } catch (error) { console.error('Error fetching about data:', error); throw error; } }; 
    

export const getSkills = async () => { 
    try { return await api.get('/skills/'); 

    } catch (error) { console.error('Error fetching skills data:', error); throw error; } }; 
    
    
    
export const getContact = async () => { 
    try { return await api.get('/contact/'); 

    } catch (error) { console.error('Error fetching contact data:', error); throw error; } }; 
    
        
export const getSkillCategories = async () => { 
    try { return await api.get('/skill-categories/'); 

    } catch (error) { console.error('Error fetching skill categories data:', error); throw error; } }; 
    
    
    
export const sendContactForm = async (data) => { 
    try { return await api.post('/contact-form/', data); 

    } catch (error) { console.error('Error sending contact form:', error); throw error; }};