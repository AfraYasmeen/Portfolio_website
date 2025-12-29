"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef } from "react"

const tools = [
  { name: "Python", icon: "🐍", category: "Programming" },
  { name: "TensorFlow", icon: "🧠", category: "ML Framework" },
  { name: "PyTorch", icon: "🔥", category: "ML Framework" },
  { name: "scikit-learn", icon: "📊", category: "ML Library" },
  { name: "Pandas", icon: "🐼", category: "Data Analysis" },
  { name: "NumPy", icon: "🔢", category: "Computing" },
  { name: "Power BI", icon: "📈", category: "Visualization" },
  { name: "Tableau", icon: "📊", category: "Visualization" },
  { name: "Azure", icon: "☁️", category: "Cloud" },
  { name: "SQL", icon: "🗄️", category: "Database" },
  { name: "Git", icon: "🌿", category: "Version Control" },
  { name: "Excel", icon: "📑", category: "Productivity" },
]

export function Tools() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = sectionRef.current?.querySelectorAll(".tool-card")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-4">Tools & Technologies</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          A comprehensive toolkit of modern technologies and frameworks I use to build robust AI solutions and
          data-driven applications.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="tool-card p-6 hover:border-primary/50 hover:shadow-lg hover:scale-105 transition-all duration-300 opacity-0 text-center"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="text-5xl mb-3">{tool.icon}</div>
              <h3 className="font-semibold mb-1">{tool.name}</h3>
              <p className="text-xs text-muted-foreground">{tool.category}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
