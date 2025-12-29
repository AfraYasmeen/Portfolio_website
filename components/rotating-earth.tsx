"use client"

import { useEffect, useRef } from "react"

export function RotatingEarth() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollProgressRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Earth properties
    const earthRadius = Math.min(canvas.width, canvas.height) * 0.15
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Track scroll
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollProgressRef.current = scrolled / maxScroll
    }
    window.addEventListener("scroll", handleScroll)

    // Animation
    let animationId: number
    let rotation = 0

    const drawEarth = (rotationAngle: number, dayNightProgress: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dynamic sky gradient based on day/night cycle
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)

      if (dayNightProgress < 0.5) {
        // Day sky (blue)
        const dayProgress = dayNightProgress * 2
        skyGradient.addColorStop(0, `rgba(13, 15, 43, ${0.95 - dayProgress * 0.3})`)
        skyGradient.addColorStop(0.5, `rgba(25, 45, 85, ${0.8 - dayProgress * 0.3})`)
        skyGradient.addColorStop(1, `rgba(50, 80, 150, ${0.5 - dayProgress * 0.2})`)
      } else {
        // Night sky (dark blue/purple)
        const nightProgress = (dayNightProgress - 0.5) * 2
        skyGradient.addColorStop(0, `rgba(5, 5, 20, ${0.65 + nightProgress * 0.3})`)
        skyGradient.addColorStop(0.5, `rgba(10, 10, 35, ${0.5 + nightProgress * 0.3})`)
        skyGradient.addColorStop(1, `rgba(15, 15, 50, ${0.3 + nightProgress * 0.2})`)
      }

      ctx.fillStyle = skyGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Outer glow
      const outerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        earthRadius * 0.9,
        centerX,
        centerY,
        earthRadius * 1.3,
      )
      outerGlow.addColorStop(0, "rgba(100, 180, 255, 0)")
      outerGlow.addColorStop(0.5, "rgba(100, 180, 255, 0.15)")
      outerGlow.addColorStop(1, "rgba(100, 180, 255, 0)")
      ctx.fillStyle = outerGlow
      ctx.fillRect(centerX - earthRadius * 1.5, centerY - earthRadius * 1.5, earthRadius * 3, earthRadius * 3)

      // Earth sphere base
      const earthGradient = ctx.createRadialGradient(
        centerX - earthRadius * 0.3,
        centerY - earthRadius * 0.3,
        earthRadius * 0.2,
        centerX,
        centerY,
        earthRadius,
      )
      earthGradient.addColorStop(0, "#4a90e2")
      earthGradient.addColorStop(0.4, "#2b5a8f")
      earthGradient.addColorStop(0.7, "#1a3a5f")
      earthGradient.addColorStop(1, "#0d1f3f")

      ctx.beginPath()
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2)
      ctx.fillStyle = earthGradient
      ctx.fill()

      // Draw continents (simplified)
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotationAngle)
      ctx.fillStyle = "#2d5a3f"

      // Simplified continent shapes
      const continents = [
        // Africa-like shape
        { x: 0, y: earthRadius * 0.2, width: earthRadius * 0.5, height: earthRadius * 0.8 },
        // Europe-like shape
        { x: -earthRadius * 0.3, y: -earthRadius * 0.4, width: earthRadius * 0.4, height: earthRadius * 0.3 },
        // Americas-like shape
        { x: -earthRadius * 0.8, y: 0, width: earthRadius * 0.3, height: earthRadius * 0.9 },
        // Asia-like shape
        { x: earthRadius * 0.3, y: -earthRadius * 0.3, width: earthRadius * 0.6, height: earthRadius * 0.7 },
      ]

      continents.forEach((continent) => {
        ctx.beginPath()
        ctx.ellipse(continent.x, continent.y, continent.width / 2, continent.height / 2, 0, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()

      // Add clouds
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotationAngle * 0.7) // Clouds rotate slower
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const distance = earthRadius * 0.6
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance

        ctx.beginPath()
        ctx.ellipse(x, y, earthRadius * 0.15, earthRadius * 0.08, angle, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()

      // Atmosphere rim light
      ctx.save()
      ctx.beginPath()
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2)
      ctx.clip()

      const rimGradient = ctx.createRadialGradient(
        centerX + earthRadius * 0.3,
        centerY - earthRadius * 0.3,
        earthRadius * 0.8,
        centerX,
        centerY,
        earthRadius,
      )
      rimGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
      rimGradient.addColorStop(0.8, "rgba(135, 206, 235, 0.2)")
      rimGradient.addColorStop(1, "rgba(135, 206, 235, 0.4)")

      ctx.fillStyle = rimGradient
      ctx.fillRect(centerX - earthRadius, centerY - earthRadius, earthRadius * 2, earthRadius * 2)
      ctx.restore()

      // Day/Night terminator
      const terminatorGradient = ctx.createLinearGradient(
        centerX - earthRadius,
        centerY,
        centerX + earthRadius,
        centerY,
      )
      const terminatorPosition = dayNightProgress
      terminatorGradient.addColorStop(0, "rgba(0, 0, 0, 0)")
      terminatorGradient.addColorStop(Math.max(0, terminatorPosition - 0.2), "rgba(0, 0, 0, 0)")
      terminatorGradient.addColorStop(terminatorPosition, "rgba(0, 0, 0, 0.5)")
      terminatorGradient.addColorStop(Math.min(1, terminatorPosition + 0.2), "rgba(0, 0, 0, 0)")
      terminatorGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.save()
      ctx.beginPath()
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2)
      ctx.clip()
      ctx.fillStyle = terminatorGradient
      ctx.fillRect(centerX - earthRadius, centerY - earthRadius, earthRadius * 2, earthRadius * 2)
      ctx.restore()

      // Night lights on dark side
      if (dayNightProgress > 0.4 && dayNightProgress < 0.9) {
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(rotationAngle)

        const lightIntensity = Math.sin((dayNightProgress - 0.4) * Math.PI * 2) * 0.5 + 0.5

        for (let i = 0; i < 30; i++) {
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * earthRadius * 0.8
          const x = Math.cos(angle) * distance
          const y = Math.sin(angle) * distance

          if (x > -earthRadius * 0.3) {
            // Only show lights on the night side
            ctx.beginPath()
            ctx.arc(x, y, 1.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 230, 150, ${lightIntensity * 0.8})`
            ctx.fill()
          }
        }

        ctx.restore()
      }
    }

    const animate = () => {
      // Rotation based on scroll
      rotation = scrollProgressRef.current * Math.PI * 4

      // Day/night cycle also based on scroll
      const dayNightProgress = ((scrollProgressRef.current % 1) + 1) % 1

      drawEarth(rotation, dayNightProgress)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
