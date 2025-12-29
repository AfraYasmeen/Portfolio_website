"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Trophy } from "lucide-react"
import { useEffect, useRef } from "react"

const accomplishments = [
  "Appreciated by Technology Lead & Product Risk Director for value-added services on AEM Research project worth £635K at My Utility Genius",
  "Nominated as member of Deloitte Tax Advisory Committee by US-India Tax QRM Lead for Tax Strategic implementations",
  "Brand Ambassador of Deloitte - Contributed towards increasing firm goodwill via LinkedIn",
  "Spot awarded for performance resulting in renewal of 3-year contract with billion-dollar client (US-Canada Tax)",
  'Spot awarded twice for "value-adding" performance on QRM and Tax Office Management front (2018 & 2019)',
  "Won 2 Best Table Topic Speaker Awards in Toastmaster Club sessions (2019)",
  "Received state rank 1646 in ICET MBA entrance exam (130,000+ students)",
  "Complete government scholarship for MBA (2013-2015)",
]

const certifications = [
  {
    name: "Project Management Professional (PMP)",
    description: "Prince 2 Equivalent",
  },
  {
    name: "Machine Learning A-Z",
    description: "Hands on Python in Data Science",
  },
]

export function Accomplishments() {
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

    const cards = sectionRef.current?.querySelectorAll(".accomplishment-card")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12">Accomplishments & Certifications</h2>

        <div className="space-y-8">
          <Card className="accomplishment-card p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 opacity-0">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="h-6 w-6 text-primary animate-pulse" />
              <h3 className="text-xl font-semibold">Accomplishments</h3>
            </div>
            <ul className="space-y-3">
              {accomplishments.map((accomplishment, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start">
                  <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{accomplishment}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            className="accomplishment-card p-6 hover:border-accent/50 hover:shadow-lg transition-all duration-300 opacity-0"
            style={{ transitionDelay: "150ms" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-6 w-6 text-accent animate-pulse" />
              <h3 className="text-xl font-semibold">Certifications</h3>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Certified
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
