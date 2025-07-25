import { useState } from 'react'
import './DesktopIcon.css'

const DesktopIcon = ({ app, onDoubleClick }) => {
  const [selected, setSelected] = useState(false)
  const [clickTimeout, setClickTimeout] = useState(null)

  const handleClick = () => {
    setSelected(true)
    
    // Clear existing timeout
    if (clickTimeout) {
      clearTimeout(clickTimeout)
    }

    // Set timeout to deselect after 2 seconds
    const timeout = setTimeout(() => {
      setSelected(false)
    }, 2000)
    
    setClickTimeout(timeout)
  }

  const handleDoubleClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout)
    }
    setSelected(false)
    onDoubleClick()
  }

  return (
    <div
      className={`desktop-icon ${selected ? 'selected' : ''}`}
      style={{ left: app.x, top: app.y }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="icon-image">
        {app.icon}
      </div>
      <div className="icon-label">
        {app.name}
      </div>
    </div>
  )
}

export default DesktopIcon
