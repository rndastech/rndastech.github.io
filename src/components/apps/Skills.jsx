import { useState } from "react"
import { Code2, Globe, Database, Brain, Wrench, BookOpen, Award, ChevronRight } from "lucide-react"
import "./AppStyles.css"

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0)

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code2,
      color: "programming",
      skills: [
        { name: "C++", icon: "🔷" },
        { name: "C", icon: "⚡" },
        { name: "Java", icon: "☕" },
        { name: "Python", icon: "🐍" },
        { name: "JavaScript", icon: "💛" },
      ],
    },
    {
      title: "Web Development",
      icon: Globe,
      color: "web",
      skills: [
        { name: "ReactJS", icon: "⚛️" },
        { name: "HTML", icon: "🌐" },
        { name: "CSS", icon: "🎨" },
        { name: "Django", icon: "🎯" },
        { name: "Flask", icon: "🍶" },
        { name: "FastAPI", icon: "⚡" },
        { name: "Tailwind CSS", icon: "💨" },
      ],
    },
    {
      title: "Cloud & Databases",
      icon: Database,
      color: "cloud",
      skills: [
        { name: "MySQL", icon: "🔵" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "SQLite", icon: "💎" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Neo4j", icon: "🔗" },
        { name: "AWS S3", icon: "☁️" },
        { name: "Cloudflare", icon: "🛡️" },
      ],
    },
    {
      title: "Machine Learning & AI",
      icon: Brain,
      color: "ml",
      skills: [
        { name: "TensorFlow", icon: "🧠" },
        { name: "Keras", icon: "🧪" },
        { name: "Scikit-Learn", icon: "📊" },
        { name: "Hugging Face", icon: "🤗" },
        { name: "NumPy", icon: "🔢" },
        { name: "Pandas", icon: "🐼" },
        { name: "SciPy", icon: "📐" },
        { name: "Matplotlib", icon: "📈" },
        { name: "Seaborn", icon: "🌊" },
        { name: "OpenCV", icon: "👁️" },
      ],
    },
    {
      title: "Developer Tools",
      icon: Wrench,
      color: "tools",
      skills: [
        { name: "Git", icon: "📝" },
        { name: "GitHub", icon: "🐙" },
        { name: "VS Code", icon: "💻" },
        { name: "Figma", icon: "🎨" },
      ],
    },
  ]

  const coursework = [
    { name: "Data Structures & Algorithms", icon: "🏗️" },
    { name: "Operating Systems", icon: "💾" },
    { name: "Database Management Systems", icon: "🗄️" },
    { name: "Object Oriented Programming", icon: "🎯" },
    { name: "Computer Networks", icon: "🌐" },
  ]

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>🛠️ Skills & Technologies</h1>
        <p>My technical expertise across various domains of software development</p>
      </div>

      <div className="app-content">
        {/* Skills Overview Cards */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">🎯</div>
            <div className="stat-label">Programming Expert</div>
            <p style={{ fontSize: "0.9rem", color: "#888", marginTop: "0.5rem" }}>
              Proficient in multiple programming languages with strong foundation in DSA
            </p>
          </div>

          <div className="stat-card">
            <div className="stat-number">⚡</div>
            <div className="stat-label">Full-Stack Developer</div>
            <p style={{ fontSize: "0.9rem", color: "#888", marginTop: "0.5rem" }}>
              Experience with modern web frameworks, databases, and cloud services
            </p>
          </div>

          <div className="stat-card">
            <div className="stat-number">🤖</div>
            <div className="stat-label">ML & AI Enthusiast</div>
            <p style={{ fontSize: "0.9rem", color: "#888", marginTop: "0.5rem" }}>
              Hands-on experience with machine learning frameworks and data science tools
            </p>
          </div>

          <div className="stat-card">
            <div className="stat-number">🎨</div>
            <div className="stat-label">Ui & UX Designer</div>
            <p style={{ fontSize: "0.9rem", color: "#888", marginTop: "0.5rem" }}>
              Experience in prototype development following modern design principles
            </p>
          </div>
        </div>

        {/* Skills Categories */}
        <div style={{ marginBottom: "2rem" }}>
          <h3>Technical Skills</h3>

          {/* Category Navigation */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.title}
                  onClick={() => setActiveCategory(index)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    border: "2px solid rgba(0, 0, 0, 0.1)",
                    background: activeCategory === index ? "#667eea" : "rgba(255, 255, 255, 0.9)",
                    color: activeCategory === index ? "#fff" : "#1a1a1a",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    borderColor: activeCategory === index ? "#667eea" : "rgba(0, 0, 0, 0.1)",
                    boxShadow: activeCategory === index ? "0 4px 16px rgba(102, 126, 234, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== index) {
                      e.target.style.background = "#667eea"
                      e.target.style.color = "#fff"
                      e.target.style.transform = "translateY(-2px)"
                      e.target.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.3)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== index) {
                      e.target.style.background = "rgba(255, 255, 255, 0.9)"
                      e.target.style.color = "#1a1a1a"
                      e.target.style.transform = "translateY(0)"
                      e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)"
                    }
                  }}
                >
                  <IconComponent style={{ width: "16px", height: "16px" }} />
                  <span>{category.title}</span>
                </button>
              )
            })}
          </div>

          {/* Active Category Skills */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              padding: "2rem",
              marginBottom: "2rem",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              {(() => {
                const IconComponent = skillCategories[activeCategory].icon
                return <IconComponent style={{ width: "24px", height: "24px", color: "#667eea" }} />
              })()}
              <h4 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1a1a1a", margin: 0 }}>
                {skillCategories[activeCategory].title}
              </h4>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "1rem",
              }}
            >
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div
                  key={skill.name}
                  style={{
                    background: "rgba(248, 249, 250, 0.9)",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    padding: "1rem",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    animationDelay: `${index * 50}ms`,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)"
                    e.currentTarget.style.borderColor = "#667eea"
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.2)"
                    const icon = e.currentTarget.querySelector(".skill-icon")
                    if (icon) icon.style.transform = "scale(1.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(248, 249, 250, 0.9)"
                    e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)"
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)"
                    const icon = e.currentTarget.querySelector(".skill-icon")
                    if (icon) icon.style.transform = "scale(1)"
                  }}
                >
                  <div
                    className="skill-icon"
                    style={{
                      fontSize: "2rem",
                      marginBottom: "0.5rem",
                      transition: "transform 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "60px",
                      width: "100%",
                      lineHeight: "1",
                      textAlign: "center",
                    }}
                  >
                    {skill.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      color: "#1a1a1a",
                    }}
                  >
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coursework and Certifications */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth > 768 ? "1fr 1fr" : "1fr",
            gap: "2rem",
          }}
        >
          {/* Coursework */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <BookOpen style={{ width: "24px", height: "24px", color: "#667eea" }} />
              <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1a1a1a", margin: 0 }}>Relevant Coursework</h4>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {coursework.map((course, index) => (
                <div
                  key={course.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem",
                    background: "rgba(248, 249, 250, 0.9)",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)"
                    e.currentTarget.style.borderColor = "#667eea"
                    e.currentTarget.style.transform = "translateX(4px)"
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.2)"
                    const arrow = e.currentTarget.querySelector(".coursework-arrow")
                    if (arrow) arrow.style.color = "#667eea"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(248, 249, 250, 0.9)"
                    e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)"
                    e.currentTarget.style.transform = "translateX(0)"
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)"
                    const arrow = e.currentTarget.querySelector(".coursework-arrow")
                    if (arrow) arrow.style.color = "#888"
                  }}
                >
                  <div style={{ 
                    fontSize: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px"
                  }}>{course.icon}</div>
                  <span style={{ flex: 1, fontWeight: "500", color: "#1a1a1a" }}>{course.name}</span>
                  <ChevronRight
                    className="coursework-arrow"
                    style={{ width: "16px", height: "16px", color: "#888", transition: "color 0.3s ease" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <Award style={{ width: "24px", height: "24px", color: "#667eea" }} />
              <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1a1a1a", margin: 0 }}>Certifications</h4>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1.5rem",
                background: "rgba(248, 249, 250, 0.9)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#667eea"
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  background: "#667eea",
                  color: "#fff",
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                🚀
              </div>
              <div>
                <h5
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#1a1a1a",
                    margin: "0 0 0.25rem 0",
                  }}
                >
                  Machine Learning Specialization
                </h5>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    margin: "0 0 0.75rem 0",
                  }}
                >
                  Stanford Online by Andrew Ng
                </p>
                <div>
                  <span
                    style={{
                      background: "#667eea",
                      color: "#fff",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                    }}
                  >
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
