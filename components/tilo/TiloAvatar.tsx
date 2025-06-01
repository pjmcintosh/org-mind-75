"use client"

import { useEffect, useRef, useState } from "react"

type TiloState = "idle" | "listening" | "alert" | "thinking" | "speaking"
type TiloSize = "sm" | "md" | "lg" | "xl"

interface TiloAvatarProps {
  state?: TiloState
  size?: TiloSize
  className?: string
}

export default function TiloAvatar({ state = "idle", size = "md", className = "" }: TiloAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<string>("")
  const [fallbackActive, setFallbackActive] = useState(false)

  // Size mapping
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  }

  // Load and play the appropriate video based on state
  useEffect(() => {
    const videoSrc = `/tilo/${state}-loop1.webm`

    // Only change if different from current
    if (videoSrc !== currentVideo) {
      setCurrentVideo(videoSrc)
      setVideoLoaded(false)
      setFallbackActive(false)

      if (videoRef.current) {
        const video = videoRef.current

        // Clear previous event handlers
        video.onloadeddata = null
        video.onerror = null
        video.oncanplay = null

        // Set up new event handlers
        video.onloadeddata = () => {
          console.log(`Tilo video loaded: ${videoSrc}`)
          setVideoLoaded(true)
          setFallbackActive(false)
          video.play().catch((err) => {
            console.error("Error playing Tilo animation:", err)
            setFallbackActive(true)
          })
        }

        video.oncanplay = () => {
          console.log(`Tilo video can play: ${videoSrc}`)
          if (!videoLoaded) {
            setVideoLoaded(true)
            setFallbackActive(false)
          }
        }

        // Handle errors with better logging
        video.onerror = (e) => {
          console.error("Error loading Tilo animation:", {
            src: videoSrc,
            error: e,
            videoError: video.error,
            networkState: video.networkState,
            readyState: video.readyState,
          })
          setVideoLoaded(false)
          setFallbackActive(true)
        }

        // Set source and load
        video.src = videoSrc
        video.load()
      }
    }
  }, [state, currentVideo, videoLoaded])

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        const video = videoRef.current
        video.onloadeddata = null
        video.onerror = null
        video.oncanplay = null
        video.pause()
      }
    }
  }, [])

  return (
    <div className={`relative rounded-full overflow-hidden bg-cyan-900/30 ${sizeClasses[size]} ${className}`}>
      {/* Video element */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          videoLoaded && !fallbackActive ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Fallback image or animation when video fails */}
      {(!videoLoaded || fallbackActive) && (
        <div className="absolute inset-0 flex items-center justify-center bg-cyan-900/30">
          <div className="w-3/4 h-3/4 rounded-full bg-cyan-400/80 animate-pulse flex items-center justify-center">
            <div className="w-1/2 h-1/2 rounded-full bg-cyan-200 animate-ping opacity-75"></div>
          </div>
          {process.env.NODE_ENV === "development" && fallbackActive && (
            <div className="absolute bottom-0 left-0 right-0 text-xs text-red-400 bg-black/50 p-1 text-center">
              Video failed: {currentVideo}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
