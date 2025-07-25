import AboutMe from './apps/AboutMe'
import Projects from './apps/Projects'
import Skills from './apps/Skills'
import Contact from './apps/Contact'
import Resume from './apps/Resume'
import Experience from './apps/Experience'
import Terminal from './apps/Terminal'

const WindowContent = ({ appId }) => {
  switch (appId) {
    case 'about':
      return <AboutMe />
    case 'projects':
      return <Projects />
    case 'skills':
      return <Skills />
    case 'contact':
      return <Contact />
    case 'resume':
      return <Resume />
    case 'experience':
      return <Experience />
    case 'terminal':
      return <Terminal />
    default:
      return <div>Unknown application</div>
  }
}

export default WindowContent
