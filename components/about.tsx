"use client"

import { useEffect, useRef } from "react"

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up")
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div ref={sectionRef} className="container mx-auto max-w-5xl opacity-0">
        <h2 className="text-3xl font-bold mb-8">About</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I specialize in artificial intelligence, machine learning, and data science with a proven track record of
            leading AI teams and delivering innovative solutions. Currently, I serve as an AI Team Leader at My Utility
            Genius, where I&apos;ve contributed to projects worth over £700K.
          </p>
          <p>
            My expertise spans Python programming, machine learning algorithms (regression, classification, clustering,
            neural networks), data preprocessing, visualization, and productionizing ML models. I&apos;ve successfully
            developed automated Excel tools, predictive models, retention systems, and complex data migration projects.
          </p>
          <p>
            With a strong foundation in finance and tax consulting from my time at Wells Fargo and Deloitte, I bring a
            unique perspective that combines technical expertise with business acumen and strategic thinking.
          </p>
        </div>
      </div>
    </section>
  )
}
