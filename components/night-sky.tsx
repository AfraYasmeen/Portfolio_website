"use client"

import { useEffect, useRef } from "react"

export function NightSky() {
  const containerRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = containerRef.current
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

    type ShootingStar = {
      x: number
      y: number
      vx: number
      vy: number
      life: number
    }
    let shootingStars: ShootingStar[] = []  
    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5, // top half
        vx: 8 + Math.random() * 4,
        vy: 4 + Math.random() * 2,
        life: 60, // frames
      })
    }
    const drawShootingStars = (ctx: CanvasRenderingContext2D) => {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
        ctx.lineWidth = 2

        shootingStars.forEach((star, index) => {
          ctx.beginPath()
          ctx.moveTo(star.x, star.y)
          ctx.lineTo(star.x - star.vx * 3, star.y - star.vy * 3)
          ctx.stroke()

          star.x += star.vx
          star.y += star.vy
          star.life--

          if (star.life <= 0) {
            shootingStars.splice(index, 1)
          }
        })
      }
    // Generate random stars
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
        // Draw stars
        drawStars(ctx, 1)
        drawShootingStars(ctx)

        // Random chance to spawn (≈ once every 2–4 seconds)
        if (Math.random() < 0.02) {
          spawnShootingStar()
      }
        requestAnimationFrame(animate)
    }
    animate()
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }   
    }, [])


  return (
    
      <canvas
        ref={containerRef}
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #0f1728 0%, #1a2847 50%, #0d1628 100%)",
        }}
      />
  )
}
