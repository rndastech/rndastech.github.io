import './AppStyles.css'
import signalPredictorImg from '../../assets/projects/signal-predictor.png'
import clinicalTrialImg from '../../assets/projects/clinical-trial.png'
import binaryRecognizerImg from '../../assets/projects/binary-recognizer.png'
import carRacingImg from '../../assets/projects/car-racing.jpeg'
import portfolioImg from '../../assets/projects/portfolio.svg'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Signal Predictor",
      description: "A cutting-edge full-stack web application for advanced time-series signal analysis using Fast Fourier Transform (FFT), multi-sinusoidal curve fitting, and machine learning techniques.",
      tech: ["Django", "PostgreSQL", "React", "SciPy"],
      image: signalPredictorImg,
      status: "Completed",
      github: "https://github.com/rndastech/Signal-Predictor",
      demo: "https://signal-predictor.pages.dev"
    },
    {
      id: 2,
      title: "Clinical Trial Recommender",
      description: "This project uses AI to transform clinical trial design processes by providing advanced recommendations.",
      tech: ["Neo4J", "FAISS", "Gemma", "Stella"],
      image: clinicalTrialImg,
      status: "Completed",
      github: "https://github.com/rndastech/Clinical-Trial-Recommender",
      demo: "#"
    },
    {
      id: 3,
      title: "Binary Recognizer",
      description: "A powerful tool designed to interpret and process handwritten binary symbols via static frontend.",
      tech: ["Tensorflow JS", "HTML", "CSS", "JS"],
      image: binaryRecognizerImg,
      status: "Completed",
      github: "https://github.com/rndastech/Binary-Recognizer",
      demo: "https://rndastech.github.io/Binary-Recognizer/"
    },
    {
      id: 4,
      title: "3D Car Racing",
      description: "An immersive 3D car racing game. Race against CPU-controlled opponents, manage your fuel consumption, and aim for the best lap times while avoiding collisions.",
      tech: ["Three.JS", "React", "WebGL", "HTML"],
      image: carRacingImg,
      status: "Completed",
      github: "https://github.com/rndastech/3D-Car-Racing/tree/main",
      demo: "#"
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "This very OS-style portfolio you're looking at right now!",
      tech: ["React", "Vite", "CSS3","HTML"],
      image: portfolioImg,
      status: "Completed",
      github: "#",
      demo: "#"
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#28c940'
      case 'In Progress': return '#ffbe2e'
      case 'Planned': return '#007aff'
      default: return '#999'
    }
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>💼 My Projects</h1>
        <p>A showcase of my development work and technical capabilities</p>
      </div>
      
      <div className="app-content">
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-img"
                />
              </div>
              
              <div className="project-content">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span 
                    className="project-status"
                    style={{ backgroundColor: getStatusColor(project.status) }}
                  >
                    {project.status}
                  </span>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-actions">
                  {project.demo !== "#" && (
                    <button 
                      className="project-btn primary"
                      onClick={() => window.open(project.demo, '_blank')}
                    >
                      Live Demo
                    </button>
                  )}
                  <button 
                    className="project-btn secondary"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    GitHub
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="github-profile-link">
          <div className="github-card">
            <div className="github-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div className="github-content">
              <h3>Check out my GitHub</h3>
              <p>Explore more of my projects and contributions on GitHub</p>
              <button 
                className="github-btn"
                onClick={() => window.open('https://github.com/rndastech', '_blank')}
              >
                Visit GitHub Profile →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
