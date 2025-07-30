import React from 'react';

const ProjectsSection = () => {
  const projects = [
    { id: 1, title: 'Project One', image: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Project Two', image: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Project Three', image: 'https://via.placeholder.com/300' }
  ];

  return (
    <section id="projects">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-tile">
            <a href="#" target="_blank" rel="noreferrer">
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