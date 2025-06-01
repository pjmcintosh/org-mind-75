"use client"

import { useState, useEffect } from "react"

interface TiloAvatarProps {
  state?: "idle" | "listening" | "alert"
  size?: "sm" | "md" | "lg"
  className?: string
}

/**
 * TiloAvatar Component
 *
 * IMPORTANT: This component is designed to be used ONLY within the sidebar context.
 * Do not use this component in other parts of the application.
 */
const TiloAvatar = ({ state = "idle", size = "md", className = "" }: TiloAvatarProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const getSource = () => {
    switch (state) {
      case "listening":
        return "/tilo/listening-loop1.webm"
      case "alert":
        return "/tilo/alert-loop1.webm"
      default:
        return "/tilo/idle-loop1.webm"
    }
  }

  // Reset error state when state changes
  useEffect(() => {
    setHasError(false)
    setVideoLoaded(false)
  }, [state])

  const handleVideoLoad = () => {
    setVideoLoaded(true)
    setHasError(false)
  }

  const handleVideoError = () => {
    setHasError(true)
    setVideoLoaded(false)
  }

  // Size classes
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  }

  // Fallback component for when video fails
  if (hasError) {
    return (
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center rounded-full border-2 border-cyan-400 shadow-md ${className}`}
      >
        <div className="text-white font-bold text-xs">T</div>
      </div>
    )
  }

  return (
    <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden ${className}`}>
      <video
        key={state}
        src={getSource()}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover rounded-full border-2 border-cyan-400 shadow-md"
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        style={{ aspectRatio: "1/1" }}
      />
      {!videoLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-700 rounded-full border-2 border-cyan-400">
          <div className="w-2 h-2 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

export default TiloAvatar
