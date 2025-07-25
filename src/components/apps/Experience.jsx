import './AppStyles.css'

const AboutMe = () => {
  return (
    <div className="app-container">
      <div className="app-header">
        <h1>👨‍💻 About Me</h1>
      </div>
      
      <div className="app-content">
        <div className="profile-section">
          <div className="profile-image">
            <div className="avatar">🚀</div>
          </div>
          
          <div className="profile-info">
            <h2>Hello, I'm a Full-Stack Developer</h2>
            <p className="intro">
              Welcome to my OS-style portfolio! I'm a passionate developer who loves creating 
              innovative web applications and user experiences. With expertise in modern 
              technologies, I bring ideas to life through clean, efficient code.
            </p>
            
            <div className="highlights">
              <div className="highlight-item">
                <span className="highlight-icon">💡</span>
                <span className="highlight-text">Creative Problem Solver</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🎯</span>
                <span className="highlight-text">Detail-Oriented</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🤝</span>
                <span className="highlight-text">Team Collaborator</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🚀</span>
                <span className="highlight-text">Always Learning</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">3+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">10+</div>
            <div className="stat-label">Technologies</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">∞</div>
            <div className="stat-label">Cups of Coffee</div>
          </div>
        </div>

        <div className="journey-section">
          <h3>My Journey</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Started Programming</h4>
                <p>Began my journey with HTML, CSS, and JavaScript</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>First Web Application</h4>
                <p>Built my first full-stack application using React and Node.js</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Professional Development</h4>
                <p>Started working on real-world projects and expanding my skill set</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Continuous Learning</h4>
                <p>Always exploring new technologies and best practices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
