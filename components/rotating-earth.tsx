"use client"

import { useEffect, useRef } from "react"

export function RotatingEarth() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const earthImageRef = useRef<HTMLImageElement | null>(null)

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

    // Create Earth texture using canvas
    const createEarthTexture = () => {
      const earthCanvas = document.createElement("canvas")
      earthCanvas.width = 200
      earthCanvas.height = 200
      const earthCtx = earthCanvas.getContext("2d")
      if (!earthCtx) return null

      // Create gradient for Earth
      const gradient = earthCtx.createLinearGradient(0, 0, 200, 200)
      gradient.addColorStop(0, "#1e40af")
      gradient.addColorStop(0.3, "#3b82f6")
      gradient.addColorStop(0.5, "#059669")
      gradient.addColorStop(0.7, "#10b981")
      gradient.addColorStop(1, "#1e40af")

      earthCtx.fillStyle = gradient
      earthCtx.fillRect(0, 0, 200, 200)

      // Add some continents-like shapes
      earthCtx.fillStyle = "#065f46"
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * 200
        const y = Math.random() * 200
        const radius = Math.random() * 30 + 10
        earthCtx.beginPath()
        earthCtx.arc(x, y, radius, 0, Math.PI * 2)
        earthCtx.fill()
      }

      const img = new Image()
      img.src = earthCanvas.toDataURL()
      return img
    }

    earthImageRef.current = createEarthTexture()

    let rotation = 0
    let scrollProgress = 0
    let animationId: number

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress = window.scrollY / maxScroll
    }

    window.addEventListener("scroll", handleScroll)

    const drawSphere = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      rotation: number,
      lightAngle: number,
    ) => {
      ctx.save()

      // Draw sphere shadow
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      const shadowGradient = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 0, x, y, radius)
      shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0.3)")
      shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = shadowGradient
      ctx.fill()

      // Clip to circle
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.clip()

      // Draw Earth texture with rotation
      if (earthImageRef.current && earthImageRef.current.complete) {
        const textureWidth = radius * 4
        const offset = (rotation * textureWidth) % textureWidth
        ctx.drawImage(earthImageRef.current, x - textureWidth / 2 + offset, y - radius, textureWidth, radius * 2)
        ctx.drawImage(
          earthImageRef.current,
          x - textureWidth / 2 + offset - textureWidth,
          y - radius,
          textureWidth,
          radius * 2,
        )
      }

      // Add shading based on light angle
      const lightGradient = ctx.createRadialGradient(
        x + Math.cos(lightAngle) * radius * 0.3,
        y + Math.sin(lightAngle) * radius * 0.3,
        radius * 0.1,
        x,
        y,
        radius * 1.2,
      )
      lightGradient.addColorStop(0, "rgba(255, 255, 255, 0.3)")
      lightGradient.addColorStop(0.4, "rgba(255, 255, 255, 0)")
      lightGradient.addColorStop(1, "rgba(0, 0, 20, 0.6)")

      ctx.fillStyle = lightGradient
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)

      // Add atmosphere glow
      ctx.restore()
      ctx.beginPath()
      ctx.arc(x, y, radius * 1.1, 0, Math.PI * 2)
      const glowGradient = ctx.createRadialGradient(x, y, radius * 0.95, x, y, radius * 1.1)
      glowGradient.addColorStop(0, "rgba(100, 200, 255, 0)")
      glowGradient.addColorStop(1, "rgba(100, 200, 255, 0.4)")
      ctx.fillStyle = glowGradient
      ctx.fill()
    }

    const drawStars = (ctx: CanvasRenderingContext2D, density: number) => {
      const starCount = Math.floor(100 * density)
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 2
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 0 = day (light blue), 0.5 = sunset, 1 = night (dark blue/black)
      const timeOfDay = scrollProgress

      // Draw sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)

      if (timeOfDay < 0.25) {
        // Day
        skyGradient.addColorStop(0, `rgba(135, 206, 250, ${1 - timeOfDay * 4})`)
        skyGradient.addColorStop(1, `rgba(176, 224, 230, ${1 - timeOfDay * 4})`)
        ctx.fillStyle = skyGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else if (timeOfDay < 0.5) {
        // Sunset
        const sunsetProgress = (timeOfDay - 0.25) * 4
        skyGradient.addColorStop(0, `rgba(${255 - sunsetProgress * 100}, ${100 - sunsetProgress * 50}, 150, 1)`)
        skyGradient.addColorStop(0.5, `rgba(255, ${140 - sunsetProgress * 100}, 0, 1)`)
        skyGradient.addColorStop(1, `rgba(${100 - sunsetProgress * 80}, ${50 - sunsetProgress * 40}, 100, 1)`)
        ctx.fillStyle = skyGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        // Night
        const nightProgress = (timeOfDay - 0.5) * 2
        skyGradient.addColorStop(
          0,
          `rgba(${10 + nightProgress * 10}, ${10 + nightProgress * 10}, ${30 + nightProgress * 20}, 1)`,
        )
        skyGradient.addColorStop(1, `rgba(0, 0, ${10 + nightProgress * 10}, 1)`)
        ctx.fillStyle = skyGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw stars in night sky
        drawStars(ctx, nightProgress)
      }

      rotation = scrollProgress * Math.PI * 4

      // Calculate light angle based on time of day
      const lightAngle = timeOfDay * Math.PI * 2 - Math.PI / 2

      // Draw Earth in center
      const earthX = canvas.width / 2
      const earthY = canvas.height / 2
      const earthRadius = Math.min(canvas.width, canvas.height) * 0.25

      drawSphere(ctx, earthX, earthY, earthRadius, rotation, lightAngle)

      // Draw sun or moon based on time of day
      if (timeOfDay < 0.5) {
        // Sun
        const sunX = earthX + Math.cos(lightAngle) * earthRadius * 3
        const sunY = earthY + Math.sin(lightAngle) * earthRadius * 3
        const sunRadius = earthRadius * 0.3

        const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius)
        sunGradient.addColorStop(0, "#FDB813")
        sunGradient.addColorStop(0.5, "#FBBF24")
        sunGradient.addColorStop(1, "rgba(251, 191, 36, 0)")
        ctx.fillStyle = sunGradient
        ctx.beginPath()
        ctx.arc(sunX, sunY, sunRadius * 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Moon
        const moonX = earthX + Math.cos(lightAngle) * earthRadius * 3
        const moonY = earthY + Math.sin(lightAngle) * earthRadius * 3
        const moonRadius = earthRadius * 0.2

        ctx.fillStyle = "#E5E7EB"
        ctx.beginPath()
        ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2)
        ctx.fill()

        // Moon craters
        ctx.fillStyle = "rgba(156, 163, 175, 0.3)"
        ctx.beginPath()
        ctx.arc(moonX - moonRadius * 0.3, moonY - moonRadius * 0.2, moonRadius * 0.3, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(moonX + moonRadius * 0.2, moonY + moonRadius * 0.3, moonRadius * 0.2, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    // Wait for Earth texture to load
    if (earthImageRef.current) {
      earthImageRef.current.onload = () => {
        animate()
      }
      // Start immediately if already loaded
      if (earthImageRef.current.complete) {
        animate()
      }
    }

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("scroll", handleScroll)
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
