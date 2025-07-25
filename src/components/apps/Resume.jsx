"use client"

import { useEffect, useState } from "react"
import "./AppStyles.css"

const Resume = () => {
  const [downloadStatus, setDownloadStatus] = useState("idle") // "idle" | "downloading" | "success" | "error"
  const [countdown, setCountdown] = useState(3)

  const downloadResume = async () => {
    try {
      setDownloadStatus("downloading")

      // Direct URL to your public bucket
      const resumeUrl = "https://pub-01f8ea42cbec4c288d845e07ecbd1c05.r2.dev/Ritesh_Narayan_Das_IIT2023060.pdf"

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a")
      link.href = resumeUrl
      link.download = "Ritesh_Narayan_Das_Resume.pdf"
      link.target = "_blank"

      // Append to body, click, and remove
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Simulate download success after a brief delay
      setTimeout(() => {
        setDownloadStatus("success")
      }, 1000)
    } catch (error) {
      console.error("Error downloading resume:", error)
      setDownloadStatus("error")
    }
  }

  useEffect(() => {
    // Countdown before auto-download
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          downloadResume()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getStatusIcon = () => {
    switch (downloadStatus) {
      case "downloading":
        return "⏳"
      case "success":
        return "✅"
      case "error":
        return "❌"
      default:
        return "📥"
    }
  }

  const getStatusMessage = () => {
    switch (downloadStatus) {
      case "downloading":
        return "Preparing your download..."
      case "success":
        return "Download started successfully!"
      case "error":
        return "Download failed. Please try again."
      default:
        return countdown > 0 ? `Auto-download starting in ${countdown}...` : "Ready to download"
    }
  }

  const getButtonText = () => {
    switch (downloadStatus) {
      case "downloading":
        return "Downloading..."
      case "success":
        return "Download Again"
      case "error":
        return "Retry Download"
      default:
        return "Download Resume"
    }
  }

  const getStatusColor = () => {
    switch (downloadStatus) {
      case "success":
        return "#10b981"
      case "error":
        return "#ef4444"
      case "downloading":
        return "#3b82f6"
      default:
        return "#6b7280"
    }
  }

  const getButtonStyle = () => {
    const baseStyle = {
      background:
        downloadStatus === "success"
          ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
          : downloadStatus === "error"
            ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      padding: "16px 32px",
      borderRadius: "12px",
      fontSize: "18px",
      fontWeight: "600",
      cursor: downloadStatus === "downloading" ? "not-allowed" : "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      width: "100%",
      opacity: downloadStatus === "downloading" ? 0.7 : 1,
      transform: "translateY(0)",
    }
    return baseStyle
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 style={{ display: "flex", alignItems: "center", gap: "12px" }}>📄 Resume Download</h1>
      </div>

      <div className="app-content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            padding: "24px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%)",
              padding: "48px",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
              maxWidth: "500px",
              width: "100%",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              textAlign: "center",
            }}
          >
            {/* Animated Icon with Status Indicator */}
            <div style={{ position: "relative", marginBottom: "32px" }}>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "40px",
                  color: "white",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                  margin: "0 auto",
                  animation: downloadStatus === "downloading" ? "pulse 2s infinite" : "bounce 2s infinite",
                }}
              >
                📄
              </div>

              {/* Status Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-8px",
                  right: "calc(50% - 50px - 8px)",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: getStatusColor(),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                  border: "3px solid white",
                }}
              >
                {getStatusIcon()}
              </div>
            </div>

            {/* Title */}
            <div style={{ marginBottom: "24px" }}>
              <h2
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#1a1a1a",
                }}
              >
                Ritesh Narayan Das
              </h2>
              <p
                style={{
                  margin: "0",
                  fontSize: "16px",
                  color: "#666",
                  fontWeight: "500",
                }}
              >
                Software Developer Resume
              </p>
            </div>

            {/* Status Message */}
            <div
              style={{
                padding: "16px 24px",
                borderRadius: "12px",
                marginBottom: "32px",
                backgroundColor:
                  downloadStatus === "success"
                    ? "rgba(16, 185, 129, 0.1)"
                    : downloadStatus === "error"
                      ? "rgba(239, 68, 68, 0.1)"
                      : downloadStatus === "downloading"
                        ? "rgba(59, 130, 246, 0.1)"
                        : "rgba(107, 114, 128, 0.1)",
                border: `1px solid ${getStatusColor()}20`,
                color: getStatusColor(),
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                {getStatusMessage()}
              </p>
            </div>

            {/* Progress Bar for Auto-download */}
            {countdown > 0 && downloadStatus === "idle" && (
              <div
                style={{
                  width: "100%",
                  height: "4px",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "2px",
                  overflow: "hidden",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "2px",
                    width: `${((3 - countdown) / 3) * 100}%`,
                    transition: "width 1s linear",
                  }}
                />
              </div>
            )}

            {/* Download Button */}
            <button
              onClick={downloadResume}
              disabled={downloadStatus === "downloading"}
              style={getButtonStyle()}
              onMouseOver={(e) => {
                if (downloadStatus !== "downloading") {
                  e.target.style.transform = "translateY(-2px)"
                  e.target.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.4)"
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.3)"
              }}
            >
              <span style={{ fontSize: "20px" }}>{getStatusIcon()}</span>
              {getButtonText()}
            </button>

            {/* Additional Info */}
            <div
              style={{
                marginTop: "32px",
                fontSize: "14px",
                color: "#666",
                lineHeight: "1.6",
              }}
            >
              <p style={{ margin: "0 0 12px 0", fontWeight: "600" }}>📄 PDF Format • 📏 A4 Size • 🔄 Latest Version</p>
              <p style={{ margin: "0" }}>
                If the download doesn't start automatically, please check your browser's download settings or popup
                blocker.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  )
}

export default Resume
