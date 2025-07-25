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
            <h2>Hello, I'm Ritesh Narayan Das</h2>
            <p className="intro">
              Welcome to my OS-style portfolio! I'm a builder at heart who loves turning wild ideas into slick, innovative real life solutions. Whether it's building AI-powered platforms or full-stack web apps, I bring deep tech and creative chaos together. I don’t just ship code — I ship experiences.
            </p>
            
            <div className="highlights">
              <div className="highlight-item">
                <span className="highlight-icon">💡</span>
                <span className="highlight-text">Competitive Coder</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🎯</span>
                <span className="highlight-text">CodePlus TA</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">💻</span>
                <span className="highlight-text">GDG CC Wing Problem Setter</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🚀</span>
                <span className="highlight-text">Upcoming Intern @Rippling</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">IIITA</div>
            <div className="stat-label">BTech in IT</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">10+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1400+</div>
            <div className="stat-label">Competitive Coding Questions Solved</div>
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
                <p>Began my journey with Competitive Coding</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Web Development and Machine Learning</h4>
                <p>Built full-stack ML based applications using Django</p>
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
