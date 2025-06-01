"use client"

import { useEffect, useRef } from "react"

interface ParticleBackgroundProps {
  className?: string
}

export function ParticleBackground({ className = "" }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Check if window is available (for SSR compatibility)
    if (typeof window === "undefined") return

    const updateCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    updateCanvasSize()

    const particles = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: `rgba(${100 + Math.random() * 100}, ${150 + Math.random() * 100}, ${200 + Math.random() * 55}, ${Math.random() * 0.5 + 0.2})`,
    }))

    let animationId: number

    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width
        if (p.y > canvas.height) p.y = 0
        if (p.y < 0) p.y = canvas.height
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (canvas) {
        updateCanvasSize()
      }
    }

    // Safely add event listener
    if (typeof window !== "undefined" && window.addEventListener) {
      window.addEventListener("resize", handleResize)
    }

    return () => {
      // Safely remove event listener
      if (typeof window !== "undefined" && window.removeEventListener) {
        window.removeEventListener("resize", handleResize)
      }
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />
}
