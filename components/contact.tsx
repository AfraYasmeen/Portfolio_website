"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useRef, useEffect } from "react"

export function Contact() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let rotation = 0
    const layers = 15
    const radius = 120

    function drawSphere() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      rotation += 0.005

      for (let i = 0; i < layers; i++) {
        const layerY = (i / layers - 0.5) * radius * 2
        const layerRadius = Math.sqrt(Math.max(0, radius * radius - layerY * layerY))

        ctx.save()
        ctx.translate(centerX, centerY + layerY)
        ctx.rotate(rotation + i * 0.1)

        // Create gradient for each layer
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, layerRadius)
        gradient.addColorStop(0, `hsla(${180 + i * 10}, 70%, 60%, 0.8)`)
        gradient.addColorStop(0.5, `hsla(${200 + i * 10}, 60%, 50%, 0.6)`)
        gradient.addColorStop(1, `hsla(${220 + i * 10}, 50%, 40%, 0.2)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.ellipse(0, 0, layerRadius * 1.2, layerRadius * 0.3, 0, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }

      requestAnimationFrame(drawSphere)
    }

    drawSphere()
  }, [])

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">GET IN TOUCH</p>
                <h2 className="text-5xl font-bold">Contact.</h2>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Name</label>
                  <Input placeholder="What's your good name?" className="bg-secondary/50 border-border/50" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Your email</label>
                  <Input
                    type="email"
                    placeholder="What's your web address?"
                    className="bg-secondary/50 border-border/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Message</label>
                  <Textarea
                    placeholder="What you want to say?"
                    className="bg-secondary/50 border-border/50 min-h-[120px] resize-none"
                  />
                </div>

                <Button className="w-full" size="lg">
                  Send Message
                </Button>
              </form>
            </div>
          </Card>

          <div className="hidden lg:flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-[600px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
