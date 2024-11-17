import React, { useState, useEffect } from 'react';
import { getSkillCategories } from '../api';
import '../styles/Skills.css'; 

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getSkillCategories();
        setSkillCategories(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="skills">
      <h1>Habilidades</h1>
      {skillCategories.map(category => (
        <div key={category.id}>
          <h2>{category.nombre}</h2>
          <ul>
            {category.skills.map(skill => (
              <li key={skill.id}>{skill.nombre}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Skills;
