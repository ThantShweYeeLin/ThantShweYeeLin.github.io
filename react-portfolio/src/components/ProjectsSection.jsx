import React from 'react';
import PetStorePage from '../assets/PetStorePage.png';
import vatCalPage from '../assets/vatCalPage.png';
import quotationPage from '../assets/quotationPage.png';

const ProjectsSection = () => {
  const projects = [
    { 
      id: 1, 
      title: 'Pet Store', 
      image: PetStorePage,
      url: 'https://thantshweyeelin.github.io/petstore/'
    },
    { 
      id: 2, 
      title: 'React VAT Calculator', 
      image: vatCalPage,
      url: 'https://thantshweyeelin.github.io/react-vat-calculator/'
    },
    { 
      id: 3, 
      title: 'Quotation', 
      image: quotationPage,
      url: 'https://thantshweyeelin.github.io/quotation/'
    }
  ];

  return (
    <section id="projects">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-tile">
            <a href={project.url} target="_blank" rel="noreferrer">
              <img src={project.image} alt={project.title} />
              <p>{project.title}</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;