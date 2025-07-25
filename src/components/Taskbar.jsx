"use client"

import { useState, useEffect } from "react"

/* 
 * WEATHER SETUP:
 * Using Open-Meteo API (no API key required!)
 * - Free weather API service
 * - Shows weather for Kolkata, India
 * - Updates every 10 minutes automatically
 * - Click the weather widget to refresh manually
 */

const Taskbar = ({ windows, desktopApps, onWindowClick, onAppClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showNotifications, setShowNotifications] = useState(false)
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [brightness, setBrightness] = useState(100)
  const [is24Hour, setIs24Hour] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Weather API functionality for Kolkata, India using Open-Meteo
  const fetchWeather = async () => {
    try {
      setWeatherLoading(true)
      
      // Kolkata coordinates: 22.5726° N, 88.3639° E
      const url = 
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude=22.5726&longitude=88.3639" +
        "&current_weather=true" +
        "&hourly=temperature_2m,relative_humidity_2m,precipitation,weathercode" +
        "&timezone=Asia/Kolkata";
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Open-Meteo API error: ${response.status}`)
      }
      
      const data = await response.json()
      const currentWeather = data.current_weather
      const currentHour = new Date().getHours()
      const currentHumidity = data.hourly.relative_humidity_2m[currentHour] || 50
      
      const weatherData = {
        temp: Math.round(currentWeather.temperature),
        description: getWeatherDescription(currentWeather.weathercode),
        icon: getWeatherIconCode(currentWeather.weathercode, currentWeather.is_day),
        location: "Kolkata",
        humidity: currentHumidity,
        windSpeed: Math.round(currentWeather.windspeed),
        windDirection: currentWeather.winddirection,
        time: currentWeather.time
      }
      
      setWeather(weatherData)
      setWeatherLoading(false)
    } catch (error) {
      console.error("Failed to fetch weather:", error)
      setWeather(null)
      setWeatherLoading(false)
    }
  }

  // Convert Open-Meteo weather codes to descriptions
  const getWeatherDescription = (code) => {
    const descriptions = {
      0: "Clear Sky",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing Rime Fog",
      51: "Light Drizzle",
      53: "Moderate Drizzle",
      55: "Dense Drizzle",
      56: "Light Freezing Drizzle",
      57: "Dense Freezing Drizzle",
      61: "Slight Rain",
      63: "Moderate Rain",
      65: "Heavy Rain",
      66: "Light Freezing Rain",
      67: "Heavy Freezing Rain",
      71: "Slight Snow Fall",
      73: "Moderate Snow Fall",
      75: "Heavy Snow Fall",
      77: "Snow Grains",
      80: "Slight Rain Showers",
      81: "Moderate Rain Showers",
      82: "Violent Rain Showers",
      85: "Slight Snow Showers",
      86: "Heavy Snow Showers",
      95: "Thunderstorm",
      96: "Thunderstorm With Hail",
      99: "Thunderstorm With Heavy Hail"
    }
    return descriptions[code] || "Unknown"
  }

  // Convert Open-Meteo weather codes to emoji icons
  const getWeatherIconCode = (code, isDay) => {
    if (code === 0) return isDay ? "01d" : "01n" // Clear sky
    if (code === 1) return isDay ? "01d" : "01n" // Mainly clear
    if (code === 2) return isDay ? "02d" : "02n" // Partly cloudy
    if (code === 3) return isDay ? "03d" : "03n" // Overcast
    if (code >= 45 && code <= 48) return "50d" // Fog
    if (code >= 51 && code <= 57) return "09d" // Drizzle
    if (code >= 61 && code <= 67) return isDay ? "10d" : "10n" // Rain
    if (code >= 71 && code <= 77) return "13d" // Snow
    if (code >= 80 && code <= 82) return "09d" // Rain showers
    if (code >= 85 && code <= 86) return "13d" // Snow showers
    if (code >= 95 && code <= 99) return "11d" // Thunderstorm
    return "02d" // Default partly cloudy
  }

  useEffect(() => {
    fetchWeather()
    // Refresh weather every 10 minutes
    const weatherTimer = setInterval(fetchWeather, 600000)
    return () => clearInterval(weatherTimer)
  }, [])
  // Apply brightness filter to entire page when changed
  useEffect(() => {
    document.body.style.filter = `brightness(${brightness}%)`
  }, [brightness])

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      "01d": "☀️", // clear sky day
      "01n": "🌙", // clear sky night
      "02d": "⛅", // few clouds day
      "02n": "☁️", // few clouds night
      "03d": "☁️", // scattered clouds
      "03n": "☁️",
      "04d": "☁️", // broken clouds
      "04n": "☁️",
      "09d": "🌧️", // shower rain
      "09n": "🌧️",
      "10d": "🌦️", // rain day
      "10n": "🌧️", // rain night
      "11d": "⛈️", // thunderstorm
      "11n": "⛈️",
      "13d": "❄️", // snow
      "13n": "❄️",
      "50d": "🌫️", // mist
      "50n": "🌫️"
    }
    return iconMap[iconCode] || "⛅"
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: !is24Hour,
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <div className="taskbar">
        {/* Start button */}
        <div className="start-button" onClick={() => setShowStartMenu(!showStartMenu)}>
          <div className="start-icon-wrapper">
            <span className="start-icon">⌬</span>
          </div>
          <div className="start-shimmer"></div>
        </div>

        {/* Weather widget */}
        <div className="weather-container">
          <div className="weather-widget" onClick={fetchWeather}>
            {weatherLoading ? (
              <div className="weather-loading">
                <div className="loading-spinner"></div>
                <span className="loading-text">Loading...</span>
              </div>
            ) : weather ? (
              <>
                <div className="weather-icon-temp">
                  <span className="weather-icon">{getWeatherIcon(weather.icon)}</span>
                  <div className="temperature">{weather.temp}°</div>
                </div>
                <div className="weather-details">
                  <div className="weather-description">{weather.description}</div>
                  <div className="weather-location">{weather.location}</div>
                </div>
                <div className="weather-extras">
                  <div className="weather-extra">
                    <span className="extra-icon">💧</span>
                    <span className="extra-value">{weather.humidity}%</span>
                  </div>
                  <div className="weather-extra">
                    <span className="extra-icon">💨</span>
                    <span className="extra-value">{weather.windSpeed}km/h</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="weather-error">
                <span className="error-icon">⚠️</span>
                <span className="error-text">Weather unavailable</span>
              </div>
            )}
            <div className="weather-hover-effect"></div>
          </div>
        </div>

        {/* Running windows */}
        <div className="taskbar-windows">
          {windows.map((window) => (
            <div
              key={window.id}
              className={`taskbar-window ${window.minimized ? "minimized" : ""}`}
              onClick={() => onWindowClick(window.id)}
            >
              <div className="window-icon-wrapper">
                <span className="taskbar-window-icon">{desktopApps.find((app) => app.id === window.appId)?.icon}</span>
              </div>
              <div className="window-active-indicator"></div>
              <div className="window-hover-effect"></div>
            </div>
          ))}
        </div>

        {/* System tray */}
        <div className="system-tray">
          {/* System icons */}
          <div className="system-icons">
            <div className="system-icon" title="Settings" onClick={() => setShowSettings(!showSettings)}>
              <span>🛠️</span>
            </div>
          </div>

          {/* Time and notifications */}
          <div className="system-time" onClick={() => setShowNotifications(!showNotifications)}>
            <div className="time">{formatTime(currentTime)}</div>
            <div className="date">{formatDate(currentTime)}</div>
            <div className="time-hover-effect"></div>
          </div>
        </div>
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <div className="start-menu">
          <div className="start-menu-header">
            <div className="user-profile">
              <div className="user-avatar">
                <span>👤</span>
                <div className="avatar-ring"></div>
              </div>
              <div className="user-info">
                <div className="user-name">Portfolio User</div>
                <div className="user-status">Professional</div>
              </div>
            </div>
          </div>
          <div className="start-menu-apps">
            <div className="apps-section">
              <h4>Pinned</h4>
              <div className="apps-grid">
                {desktopApps.slice(0, 6).map((app) => (
                  <div
                    key={app.id}
                    className="start-menu-app"
                    onClick={() => {
                      onAppClick(app)
                      setShowStartMenu(false)
                    }}
                  >
                    <div className="start-app-icon-wrapper">
                      <span className="app-icon">{app.icon}</span>
                    </div>
                    <span className="app-name">{app.name}</span>
                    <div className="start-app-hover"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="start-menu-footer">
            <div className="made-with-love">
              Made with ❤️, in India
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="settings-panel">
          <div className="settings-header">
            <h3>Settings</h3>
            <button className="close-settings" onClick={() => setShowSettings(false)}>
              ✕
            </button>
          </div>
          <div className="settings-content">
            <div className="setting-group">
              <div className="setting-label">
                <span className="setting-icon">🔆</span>
                <span className="setting-text">Brightness</span>
              </div>
              <div className="setting-control">
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="brightness-slider"
                />
                <span className="brightness-value">{brightness}%</span>
              </div>
            </div>
            <div className="setting-group">
              <div className="setting-label">
                <span className="setting-icon">⏰</span>
                <span className="setting-text">24-Hour Format</span>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={is24Hour}
                    onChange={() => setIs24Hour(!is24Hour)}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification panel */}
      {showNotifications && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            <button className="clear-all" onClick={() => setShowNotifications(false)}>
              Close
            </button>
          </div>
          <div className="notifications">
            <div className="notification-item">
              <div className="notification-dot blue"></div>
              <div className="notification-content">
                <div className="notification-title">Welcome</div>
                <div className="notification-text">Portfolio desktop is ready!</div>
              </div>
            </div>
            <div className="notification-item">
              <div className="notification-dot green"></div>
              <div className="notification-content">
                <div className="notification-title">System</div>
                <div className="notification-text">All applications loaded successfully</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close menus */}
      {(showStartMenu || showNotifications || showSettings) && (
        <div
          className="overlay"
          onClick={() => {
            setShowStartMenu(false)
            setShowNotifications(false)
            setShowSettings(false)
          }}
        />
      )}

      <style jsx>{`
        .taskbar {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 56px;
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.4) 0%, 
            rgba(20, 20, 30, 0.35) 50%, 
            rgba(30, 30, 40, 0.3) 100%);
          backdrop-filter: blur(20px) saturate(180%) brightness(0.8);
          -webkit-backdrop-filter: blur(20px) saturate(180%) brightness(0.8);
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          padding: 0 16px;
          z-index: 1000;
          box-shadow: 
            0 -8px 32px rgba(0, 0, 0, 0.3),
            0 -4px 16px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Inter", sans-serif;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 999;
          backdrop-filter: blur(2px);
        }

        /* Start Button */
        .start-button {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          background: linear-gradient(135deg, 
            rgba(79, 172, 254, 0.8) 0%, 
            rgba(0, 242, 254, 0.6) 50%, 
            rgba(129, 236, 236, 0.7) 100%);
          border-radius: 16px;
          color: white;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          margin-right: 16px;
          overflow: hidden;
          box-shadow: 
            0 8px 32px rgba(79, 172, 254, 0.3),
            0 4px 16px rgba(0, 242, 254, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .start-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 
            0 12px 40px rgba(79, 172, 254, 0.4),
            0 6px 20px rgba(0, 242, 254, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          background: linear-gradient(135deg, 
            rgba(79, 172, 254, 0.9) 0%, 
            rgba(0, 242, 254, 0.7) 50%, 
            rgba(129, 236, 236, 0.8) 100%);
        }

        .start-button:active {
          transform: translateY(-1px) scale(1.01);
          transition: all 0.1s ease;
        }

        .start-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .start-icon {
          font-size: 22px;
          font-weight: bold;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
        }

        .start-text {
          font-weight: 600;
          font-size: 14px;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
          letter-spacing: 0.3px;
        }

        .start-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.4), 
            rgba(129, 236, 236, 0.3), 
            transparent);
          transition: left 0.8s ease;
        }

        .start-button:hover .start-shimmer {
          left: 100%;
        }

        /* Start Menu */
        .start-menu {
          position: absolute;
          bottom: 60px;
          left: 16px;
          width: 360px;
          height: 520px;
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.4) 0%, 
            rgba(20, 20, 30, 0.35) 50%, 
            rgba(30, 30, 40, 0.3) 100%);
          backdrop-filter: blur(30px) saturate(180%) brightness(0.9);
          -webkit-backdrop-filter: blur(30px) saturate(180%) brightness(0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.4),
            0 15px 35px rgba(79, 172, 254, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          animation: slideUpScale 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          z-index: 1001;
        }

        @keyframes slideUpScale {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .start-menu-header {
          padding: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          background: linear-gradient(135deg, 
            rgba(79, 172, 254, 0.2) 0%, 
            rgba(0, 242, 254, 0.15) 50%, 
            rgba(129, 236, 236, 0.18) 100%);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-avatar {
          position: relative;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, 
            rgba(79, 172, 254, 0.9), 
            rgba(0, 242, 254, 0.8));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
          box-shadow: 
            0 8px 25px rgba(79, 172, 254, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .avatar-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: linear-gradient(45deg, 
            rgba(79, 172, 254, 0.8), 
            rgba(0, 255, 136, 0.8), 
            rgba(129, 236, 236, 0.8));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .user-avatar:hover .avatar-ring {
          opacity: 0.6;
        }

        .user-name {
          color: white;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: 0.3px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .user-status {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          margin-top: 2px;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        .start-menu-apps {
          padding: 20px;
          flex: 1;
          overflow-y: auto;
        }

        .apps-section h4 {
          color: white;
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 16px 0;
          opacity: 0.9;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .apps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .start-menu-app {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          overflow: hidden;
        }

        .start-app-hover {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.15) 0%, 
            rgba(79, 172, 254, 0.1) 50%, 
            rgba(129, 236, 236, 0.12) 100%);
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .start-menu-app:hover .start-app-hover {
          opacity: 1;
        }

        .start-menu-app:hover {
          transform: translateY(-3px) scale(1.02);
        }

        .start-app-icon-wrapper {
          position: relative;
          transition: transform 0.3s ease;
        }

        .start-menu-app:hover .start-app-icon-wrapper {
          transform: scale(1.1);
        }

        .start-menu-app .app-icon {
          font-size: 28px;
          filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3));
        }

        .start-menu-app .app-name {
          color: white;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.3;
          z-index: 1;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .start-menu-footer {
          padding: 20px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          justify-content: center;
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.1) 0%, 
            rgba(20, 20, 30, 0.08) 100%);
        }

        .made-with-love {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          letter-spacing: 0.3px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          padding: 8px 16px;
          border-radius: 12px;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(255, 255, 255, 0.02) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;
        }

        .made-with-love:hover {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
          border-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.02);
        }

        /* Settings Panel */
        .settings-panel {
          position: absolute;
          bottom: 60px;
          right: 60px;
          width: 320px;
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.4) 0%, 
            rgba(20, 20, 30, 0.35) 50%, 
            rgba(30, 30, 40, 0.3) 100%);
          backdrop-filter: blur(30px) saturate(180%) brightness(0.9);
          -webkit-backdrop-filter: blur(30px) saturate(180%) brightness(0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.4),
            0 15px 35px rgba(79, 172, 254, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          animation: slideUpScale 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          z-index: 1001;
        }

        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          background: linear-gradient(135deg, 
            rgba(79, 172, 254, 0.2) 0%, 
            rgba(0, 242, 254, 0.15) 50%, 
            rgba(129, 236, 236, 0.18) 100%);
        }

        .settings-header h3 {
          color: white;
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          letter-spacing: 0.3px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .close-settings {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-settings:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: scale(1.1);
        }

        .settings-content {
          padding: 24px;
        }

        .setting-group {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .setting-group:last-child {
          border-bottom: none;
        }

        .setting-label {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .setting-icon {
          font-size: 18px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .setting-text {
          color: white;
          font-size: 15px;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .setting-control {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brightness-slider {
          width: 100px;
          accent-color: #4facfe;
          cursor: pointer;
        }

        .brightness-value {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          font-weight: 600;
          min-width: 40px;
          text-align: right;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        .toggle-switch {
          position: relative;
          width: 40px;
          height: 20px;
          display: inline-block;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-switch .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 34px;
          transition: background-color 0.3s;
        }

        .toggle-switch .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .toggle-switch input:checked + .slider {
          background-color: #4facfe;
        }

        .toggle-switch input:checked + .slider:before {
          transform: translateX(20px);
        }

        /* Weather Widget */
        .weather-container {
          margin-right: 16px;
        }

        .weather-widget {
          position: relative;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px 16px;
          background: transparent;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 300px;
          overflow: hidden;
          box-shadow: none;
        }

        .weather-hover-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.08) 0%, 
            rgba(255, 255, 255, 0.04) 50%, 
            rgba(255, 255, 255, 0.06) 100%);
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .weather-widget:hover .weather-hover-effect {
          opacity: 1;
        }

        .weather-widget:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: transparent;
          box-shadow: none;
          transform: translateY(-1px);
        }

        .weather-loading {
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 1;
        }

        .loading-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-top: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          font-weight: 500;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .weather-icon-temp {
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 1;
        }

        .weather-icon {
          font-size: 28px;
          filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3));
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .temperature {
          font-size: 24px;
          font-weight: 700;
          color: white;
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
          letter-spacing: -0.5px;
        }

        .weather-details {
          flex: 1;
          z-index: 1;
        }

        .weather-description {
          color: white;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 2px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
          line-height: 1.2;
        }

        .weather-location {
          color: rgba(255, 255, 255, 0.8);
          font-size: 12px;
          font-weight: 500;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .weather-extras {
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 1;
        }

        .weather-extra {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .extra-icon {
          font-size: 12px;
          opacity: 0.9;
        }

        .extra-value {
          color: rgba(255, 255, 255, 0.9);
          font-size: 11px;
          font-weight: 600;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          min-width: 35px;
        }

        .weather-error {
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 1;
        }

        .error-icon {
          font-size: 18px;
        }

        .error-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          font-weight: 500;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        /* App Shortcuts */
        .taskbar-apps {
          display: flex;
          gap: 8px;
          margin-right: 16px;
        }

        .taskbar-app {
          position: relative;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .app-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #0066cc, #00ff88, #0066cc);
          border-radius: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .taskbar-app:hover .app-glow {
          opacity: 0.3;
        }

        .taskbar-app:hover {
          transform: translateY(-4px) scale(1.05);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.1);
        }

        .taskbar-app:active {
          transform: translateY(-2px) scale(1.02);
        }

        .app-icon-wrapper {
          transition: transform 0.3s ease;
        }

        .taskbar-app:hover .app-icon-wrapper {
          transform: scale(1.15);
        }

        .taskbar-app-icon {
          font-size: 24px;
          filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3));
        }

        .app-indicator {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #0066cc, #00ff88);
          border-radius: 50%;
          opacity: 0;
          transition: all 0.3s ease;
          box-shadow: 0 0 12px rgba(0, 102, 204, 0.6);
        }

        .taskbar-app:hover .app-indicator,
        .taskbar-app.running .app-indicator {
          opacity: 1;
        }

        .taskbar-app.running .app-indicator {
          background: linear-gradient(45deg, #00ff88, #00cc66);
          box-shadow: 0 0 12px rgba(0, 255, 136, 0.6);
        }

        /* Running Windows */
        .taskbar-windows {
          display: flex;
          gap: 8px;
          flex: 1;
          overflow-x: auto;
          padding: 0 16px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .taskbar-window {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;  /* center icon */
          gap: 0;                   /* no gap since no title */
          padding: 8px;            /* tighter padding */
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.3) 0%, 
            rgba(20, 20, 30, 0.25) 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: auto;          /* remove wide min */
          max-width: none;         /* remove max width */
          width: auto;             /* auto shrink */
          overflow: hidden;
          backdrop-filter: blur(15px);
        }

        .window-hover-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(79, 172, 254, 0.08) 50%, 
            rgba(129, 236, 236, 0.1) 100%);
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .taskbar-window:hover .window-hover-effect {
          opacity: 1;
        }

        .taskbar-window:hover {
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.4) 0%, 
            rgba(20, 20, 30, 0.35) 100%);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 
            0 8px 25px rgba(79, 172, 254, 0.15),
            0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .taskbar-window.minimized {
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.2) 0%, 
            rgba(20, 20, 30, 0.15) 100%);
          opacity: 0.7;
          border-color: rgba(255, 255, 255, 0.1);
        }

        .window-icon-wrapper {
          transition: transform 0.3s ease;
        }

        .taskbar-window:hover .window-icon-wrapper {
          transform: scale(1.1);
        }

        .taskbar-window-icon {
          font-size: 20px;
          flex-shrink: 0;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .taskbar-window-title {
          color: white;
          font-size: 14px;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .window-active-indicator {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, 
            rgba(79, 172, 254, 0.9), 
            rgba(0, 255, 136, 0.9));  /* filled gradient */
          border: none;                                       /* remove border */
          border-radius: 50%;                                /* keep circle */
          opacity: 0;
          transition: opacity 0.3s ease;
          box-shadow: 0 0 8px rgba(79, 172, 254, 0.6);
        }

        .taskbar-window:not(.minimized) .window-active-indicator {
          opacity: 1;
        }

        /* System Tray */
        .system-tray {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: auto;
        }

        .system-icons {
          display: flex;
          gap: 6px;
        }

        .system-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
          backdrop-filter: none;
          border: none;
        }

        .system-icon:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: none;
          box-shadow: none;
        }

        .system-icon span {
          font-size: 18px;
          opacity: 0.9;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .system-time {
          position: relative;
          text-align: right;
          color: white;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
          overflow: hidden;
          backdrop-filter: none;
          border: none;
        }

        .time-hover-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(79, 172, 254, 0.08) 50%, 
            rgba(129, 236, 236, 0.1) 100%);
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .system-time:hover .time-hover-effect {
          opacity: 1;
        }

        .system-time:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: none;
          box-shadow: none;
        }

        .time {
          font-size: 15px;
          font-weight: 700;
          line-height: 1.2;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          letter-spacing: 0.3px;
          z-index: 1;
          position: relative;
        }

        .date {
          font-size: 12px;
          opacity: 0.8;
          line-height: 1.2;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
          z-index: 1;
          position: relative;
        }

        .notification-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 10px;
          height: 10px;
          background: linear-gradient(135deg, #ff4444, #ff6666);
          border-radius: 50%;
          animation: pulse 2s infinite;
          box-shadow: 0 0 12px rgba(255, 68, 68, 0.6);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }

        /* Notification Panel */
        .notification-panel {
          position: absolute;
          bottom: 60px;
          right: 0;
          width: 380px;
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.4) 0%, 
            rgba(20, 20, 30, 0.35) 50%, 
            rgba(30, 30, 40, 0.3) 100%);
          backdrop-filter: blur(30px) saturate(180%) brightness(0.9);
          -webkit-backdrop-filter: blur(30px) saturate(180%) brightness(0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.4),
            0 15px 35px rgba(79, 172, 254, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          animation: slideUpScale 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          z-index: 1001;
        }

        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          background: linear-gradient(135deg, 
            rgba(79, 172, 254, 0.2) 0%, 
            rgba(0, 242, 254, 0.15) 50%, 
            rgba(129, 236, 236, 0.18) 100%);
        }

        .notification-header h3 {
          color: white;
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          letter-spacing: 0.3px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .clear-all {
          background: none;
          border: none;
          color: rgba(79, 172, 254, 0.9);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .clear-all:hover {
          background: rgba(79, 172, 254, 0.15);
          color: rgba(79, 172, 254, 1);
          transform: scale(1.05);
        }

        .notifications {
          padding: 16px;
          max-height: 360px;
          overflow-y: auto;
        }

        .notification-item {
          display: flex;
          gap: 16px;
          padding: 18px;
          border-radius: 16px;
          margin-bottom: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.2) 0%, 
            rgba(20, 20, 30, 0.15) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          backdrop-filter: blur(10px);
        }

        .notification-item:hover {
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.3) 0%, 
            rgba(20, 20, 30, 0.25) 100%);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px) scale(1.01);
          box-shadow: 
            0 8px 25px rgba(79, 172, 254, 0.1),
            0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .notification-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
          box-shadow: 0 0 12px currentColor;
        }

        .notification-dot.blue {
          background: rgba(79, 172, 254, 0.9);
          color: rgba(79, 172, 254, 0.9);
        }

        .notification-dot.green {
          background: rgba(0, 255, 136, 0.9);
          color: rgba(0, 255, 136, 0.9);
        }

        .notification-content {
          flex: 1;
        }

        .notification-title {
          color: white;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 6px;
          letter-spacing: 0.2px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .notification-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          line-height: 1.5;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .weather-container {
            display: none;
          }
          .system-icons {
            display: none;
          }
          .taskbar-apps {
            gap: 6px;
          }
          .taskbar-app {
            width: 44px;
            height: 44px;
          }
          .notification-panel,
          .start-menu {
            width: 320px;
          }
        }

        @media (max-width: 480px) {
          .start-text {
            display: none;
          }
          .taskbar-windows {
            padding: 0 12px;
          }
          .taskbar-window {
            min-width: 120px;
            max-width: 180px;
          }
        }
      `}</style>
    </>
  )
}

export default Taskbar
