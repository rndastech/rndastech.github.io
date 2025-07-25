import { useState, useRef, useEffect } from 'react'
import WindowContent from './WindowContent'
import './Window.css'

const Window = ({ 
  window, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onUpdatePosition, 
  onUpdateSize, 
  onBringToFront 
}) => {
  // Ref for DOM element and smooth dragging
  const windowRef = useRef(null)
  const dragging = useRef(false)
  const dragData = useRef({ pointerX: 0, pointerY: 0, initialX: 0, initialY: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const handleMouseDown = (e) => {
    // Start smooth dragging on titlebar (not controls)
    if (e.target.closest('.window-titlebar') && !e.target.closest('.window-controls') && !window.maximized) {
      e.preventDefault()
      e.stopPropagation()
      dragging.current = true
      dragData.current = {
        pointerX: e.clientX,
        pointerY: e.clientY,
        initialX: window.x,
        initialY: window.y
      }
      // Disable transition for immediate movement
      windowRef.current.style.transition = 'none'
      onBringToFront()
      document.addEventListener('mousemove', handleDrag)
      document.addEventListener('mouseup', handleDragEnd)
    }
  }

  const handleResizeMouseDown = (e, direction) => {
    e.stopPropagation()
    setIsResizing(direction)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: window.width,
      height: window.height
    })
    onBringToFront()
  }
  
  // Smooth drag movement via CSS transform
  const handleDrag = (e) => {
    if (!dragging.current) return
    const deltaX = e.clientX - dragData.current.pointerX
    const deltaY = e.clientY - dragData.current.pointerY
    let newX = dragData.current.initialX + deltaX
    let newY = dragData.current.initialY + deltaY
    // Constrain within viewport with more flexible bottom boundary
    const screenW = globalThis.window.innerWidth
    const screenH = globalThis.window.innerHeight
    const taskbarHeight = 60
    const allowedOverflow = 40 // Allow windows to go 40px below taskbar
    newX = Math.max(-50, Math.min(newX, screenW - 100)) // Allow some overflow on sides
    newY = Math.max(0, Math.min(newY, screenH - 100 + allowedOverflow)) // Allow going below taskbar
    const translateX = newX - window.x
    const translateY = newY - window.y
    if (windowRef.current) {
      windowRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`
    }
  }

  // Commit final position and cleanup
  const handleDragEnd = (e) => {
    if (!dragging.current) return
    const deltaX = e.clientX - dragData.current.pointerX
    const deltaY = e.clientY - dragData.current.pointerY
    let finalX = dragData.current.initialX + deltaX
    let finalY = dragData.current.initialY + deltaY
    const screenW = globalThis.window.innerWidth
    const screenH = globalThis.window.innerHeight
    const allowedOverflow = 40 // Allow windows to go 40px below taskbar
    finalX = Math.max(-50, Math.min(finalX, screenW - 100)) // Allow some overflow on sides
    finalY = Math.max(0, Math.min(finalY, screenH - 100 + allowedOverflow)) // Allow going below taskbar
    onUpdatePosition(window.id, finalX, finalY)
    // Reset transform and transition
    if (windowRef.current) {
      windowRef.current.style.transition = ''
      windowRef.current.style.transform = ''
    }
    dragging.current = false
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', handleDragEnd)
  }

  // Resize logic only
  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y
      let newWidth = resizeStart.width
      let newHeight = resizeStart.height
      if (isResizing.includes('right')) {
        newWidth = Math.max(300, resizeStart.width + deltaX)
      }
      if (isResizing.includes('left')) {
        newWidth = Math.max(300, resizeStart.width - deltaX)
      }
      if (isResizing.includes('bottom')) {
        newHeight = Math.max(200, resizeStart.height + deltaY)
      }
      if (isResizing.includes('top')) {
        newHeight = Math.max(200, resizeStart.height - deltaY)
      }
      onUpdateSize(window.id, newWidth, newHeight)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, resizeStart, window.id, onUpdateSize])

  const windowStyle = {
    left: window.maximized ? 0 : window.x,
    top: window.maximized ? 0 : window.y,
    width: window.maximized ? '100vw' : window.width,
    height: window.maximized ? 'calc(100vh - 60px)' : window.height, // Full height when maximized, just avoid taskbar
    zIndex: window.zIndex
  }

  return (
    <div
      ref={windowRef}
      className={`window ${window.maximized ? 'maximized' : ''}`}
      style={windowStyle}
      onMouseDown={() => onBringToFront()}
    >
      {/* Resize handles */}
      {!window.maximized && (
        <>
          <div className="resize-handle resize-right" onMouseDown={(e) => handleResizeMouseDown(e, 'right')} />
          <div className="resize-handle resize-bottom" onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')} />
          <div className="resize-handle resize-corner" onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')} />
        </>
      )}

      {/* Window titlebar */}
      <div 
        className="window-titlebar" 
        onMouseDown={handleMouseDown}
      >
        <div className="window-title">{window.title}</div>
        <div className="window-controls">
          <button className="window-control minimize" onClick={() => onMinimize(window.id)}>
            −
          </button>
          <button className="window-control maximize" onClick={() => onMaximize(window.id)}>
            {window.maximized ? '⧉' : '□'}
          </button>
          <button className="window-control close" onClick={() => onClose(window.id)}>
            ×
          </button>
        </div>
      </div>

      {/* Window content */}
      <div className="window-content">
        <WindowContent appId={window.appId} />
      </div>
    </div>
  )
}

export default Window
