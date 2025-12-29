"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  pulseSpeed: number
}

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create stars
    const stars: Star[] = []
    const starCount = 200

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      })
    }

    // Animation
    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw nebula clouds
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3,
        canvas.height * 0.2,
        0,
        canvas.width * 0.3,
        canvas.height * 0.2,
        canvas.width * 0.4,
      )
      gradient1.addColorStop(0, "rgba(120, 81, 169, 0.1)")
      gradient1.addColorStop(0.5, "rgba(120, 81, 169, 0.05)")
      gradient1.addColorStop(1, "rgba(120, 81, 169, 0)")
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7,
        canvas.height * 0.6,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        canvas.width * 0.5,
      )
      gradient2.addColorStop(0, "rgba(192, 132, 252, 0.08)")
      gradient2.addColorStop(0.5, "rgba(192, 132, 252, 0.04)")
      gradient2.addColorStop(1, "rgba(192, 132, 252, 0)")
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gradient3 = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.8,
        0,
        canvas.width * 0.5,
        canvas.height * 0.8,
        canvas.width * 0.3,
      )
      gradient3.addColorStop(0, "rgba(236, 72, 153, 0.06)")
      gradient3.addColorStop(0.5, "rgba(236, 72, 153, 0.03)")
      gradient3.addColorStop(1, "rgba(236, 72, 153, 0)")
      ctx.fillStyle = gradient3
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and animate stars
      stars.forEach((star) => {
        // Move stars
        star.y -= star.speed
        if (star.y < 0) {
          star.y = canvas.height
          star.x = Math.random() * canvas.width
        }

        // Pulsing effect
        const pulse = Math.sin(time * star.pulseSpeed) * 0.3 + 0.7

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * pulse})`
        ctx.fill()

        // Add glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * pulse * 2, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * pulse * 2)
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * pulse * 0.3})`)
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
