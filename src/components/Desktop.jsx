"use client"

import { useState } from "react"
import Taskbar from "./Taskbar"
import Window from "./Window"
import DesktopIcon from "./DesktopIcon"
import CodeforcesWidget from "./CodeforcesWidget"
import "./Desktop.css"

const Desktop = () => {
  const [windows, setWindows] = useState([])
  const [nextWindowId, setNextWindowId] = useState(1)

  // Desktop applications
  const desktopApps = [
    { id: "about", name: "About Me", icon: "👨‍💻", x: 60, y: 60 },
    { id: "projects", name: "Projects", icon: "📁", x: 60, y: 180 },
    { id: "skills", name: "Skills", icon: "⚡", x: 60, y: 300 },
    { id: "contact", name: "Contact", icon: "📧", x: 60, y: 420 },
    { id: "resume", name: "Resume", icon: "📋", x: 180, y: 60 },
    { id: "experience", name: "Experience", icon: "🎯", x: 180, y: 180 },
    { id: "terminal", name: "Terminal", icon: "🖥️", x: 180, y: 300 },
  ]

  const openWindow = (app) => {
    // Check if window is already open
    const existingWindow = windows.find((w) => w.appId === app.id)
    if (existingWindow) {
      // Bring window to front
      setWindows((prev) =>
        prev.map((w) =>
          w.id === existingWindow.id ? { ...w, zIndex: Math.max(...prev.map((win) => win.zIndex), 10) + 1 } : w,
        ),
      )
      return
    }

    // Calculate center position with gaps
    const windowWidth = 720  // Reduced by 20% from 900
    const windowHeight = 520  // Reduced by 20% from 650
    const topGap = 80  // Gap from top of screen
    const bottomGap = 140  // Gap from bottom (includes taskbar + extra space)
    const availableHeight = globalThis.window.innerHeight - topGap - bottomGap
    const centerX = (globalThis.window.innerWidth - windowWidth) / 2
    const centerY = topGap + (availableHeight - windowHeight) / 2
    // Stagger windows based on number of open windows
    const offset = windows.length * 20

    // Create new window
    const newWindow = {
      id: nextWindowId,
      appId: app.id,
      title: app.name,
      x: centerX + offset, // center first window, offset based on open windows
      y: centerY + offset,
      width: windowWidth,
      height: windowHeight,
      minimized: false,
      maximized: false,
      zIndex: Math.max(...windows.map((w) => w.zIndex), 10) + 1,
    }

    setWindows((prev) => [...prev, newWindow])
    setNextWindowId((prev) => prev + 1)
  }

  const closeWindow = (windowId) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId))
  }

  const minimizeWindow = (windowId) => {
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, minimized: true } : w)))
  }

  const maximizeWindow = (windowId) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId
          ? {
              ...w,
              maximized: !w.maximized,
              x: w.maximized ? w.originalX || w.x : 0, // Full screen positioning when maximizing
              y: w.maximized ? w.originalY || w.y : 0,
              width: w.maximized ? w.originalWidth || w.width : globalThis.window.innerWidth,
              height: w.maximized ? w.originalHeight || w.height : globalThis.window.innerHeight - 60, // Full height when maximized, just avoid taskbar
              originalX: w.maximized ? w.originalX : w.x,
              originalY: w.maximized ? w.originalY : w.y,
              originalWidth: w.maximized ? w.originalWidth : w.width,
              originalHeight: w.maximized ? w.originalHeight : w.height,
            }
          : w,
      ),
    )
  }

  const updateWindowPosition = (windowId, x, y) => {
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, x, y } : w)))
  }

  const updateWindowSize = (windowId, width, height) => {
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, width, height } : w)))
  }

  const bringToFront = (windowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, zIndex: Math.max(...prev.map((win) => win.zIndex), 10) + 1 } : w)),
    )
  }

  // Restore or bring window to front
  const restoreWindow = (windowId) => {
    setWindows((prev) => {
      const topZ = Math.max(...prev.map((w) => w.zIndex), 10) + 1
      return prev.map((w) => (w.id === windowId ? { ...w, minimized: false, zIndex: topZ } : w))
    })
  }

  return (
    <div className="desktop">
      {/* Desktop Icons */}
      <div className="desktop-icons">
        {desktopApps.map((app) => (
          <DesktopIcon key={app.id} app={app} onDoubleClick={() => openWindow(app)} />
        ))}
      </div>

      {/* Codeforces Widget */}
      <CodeforcesWidget />

      {/* Windows */}
      {windows.map(
        (window) =>
          !window.minimized && (
            <Window
              key={window.id}
              window={window}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onMaximize={() => maximizeWindow(window.id)}
              onUpdatePosition={updateWindowPosition}
              onUpdateSize={updateWindowSize}
              onBringToFront={() => bringToFront(window.id)}
            />
          ),
      )}

      {/* Taskbar */}
      <Taskbar windows={windows} desktopApps={desktopApps} onWindowClick={restoreWindow} onAppClick={openWindow} />
    </div>
  )
}

export default Desktop
