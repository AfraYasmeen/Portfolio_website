"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef } from "react"

export function Overview() {
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
        <h2 className="text-3xl font-bold mb-8">Overview</h2>
        <Card className="p-8 bg-card/50 backdrop-blur-sm">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              AI Team Lead and Data Science professional with 8+ years of comprehensive experience spanning Finance,
              Tax, Quality Risk Management, and AI Development. Currently leading innovative AI initiatives at My
              Utility Genius.
            </p>

            <div className="grid md:grid-cols-3 gap-6 pt-4">
              <div className="text-center p-4 rounded-lg bg-secondary/50">
                <div className="text-4xl font-bold text-primary mb-2">8+</div>
                <div className="text-sm">Years Experience</div>
              </div>

              <div className="text-center p-4 rounded-lg bg-secondary/50">
                <div className="text-4xl font-bold text-primary mb-2">£700K</div>
                <div className="text-sm">AEM Research Project</div>
              </div>

              <div className="text-center p-4 rounded-lg bg-secondary/50">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm">ML Projects Delivered</div>
              </div>
            </div>

            <p>
              Proven expertise in Python programming, machine learning (regression, classification, neural networks,
              GANs), data preprocessing, visualization, and model deployment. Successfully developed automated pricing
              tools, predictive analytics systems, and enterprise-scale data migration solutions.
            </p>

            <p>
              Strong academic foundation with an MSc in Data Science and Analytics (Distinction) from University of
              Hertfordshire, where I researched GAN-based oversampling techniques for churn prediction. Combined
              technical expertise with strategic business acumen gained from roles at Deloitte and Wells Fargo.
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
