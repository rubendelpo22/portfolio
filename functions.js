document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Highlight active nav link on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // Fetch and populate data from JSON
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Populate Technical Skills
      const technicalSkillsList = document.getElementById('technical-skills');
      data.technicalSkills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        technicalSkillsList.appendChild(li);
      });

      // Populate Soft Skills
      const softSkillsList = document.getElementById('soft-skills');
      data.softSkills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        softSkillsList.appendChild(li);
      });

      // Populate Projects
      const projectsContainer = document.getElementById('projects-container');
      data.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
          <h3>${project.title}</h3>
          <div class="project">
            <img src="${project.image}" alt="${project.title} screenshot" class="project-image">
            <div class="project-overlay">
              <a href="${project.liveDemo}" target="_blank">Live Demo</a>
            </div>          
          </div>
        `;
        projectsContainer.appendChild(projectCard);
      });
    })
    .catch(error => console.error('Error loading JSON:', error));
});