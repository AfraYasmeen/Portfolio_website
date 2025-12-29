"use client"

import { Card } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import { useEffect, useRef } from "react"

const education = [
  {
    degree: "MSc Data Science & Analytics (with placement year)",
    institution: "University of Hertfordshire, Hatfield, UK",
    period: "Feb 2021 - Feb 2023",
    grade: "Distinction (74%)",
    highlights: [
      'Research: "Investigating the effect of Generative Adversarial Networks (GAN) oversampling technique on Classification ML algorithms for Churn Prediction"',
    ],
  },
  {
    degree: "Master of Business Administration (Major: Finance, Minor: HR)",
    institution: "Osmania University, Hyderabad, India",
    period: "2013 - 2015",
    grade: "71.4%",
    highlights: [
      "Internship: Financial Statement Analysis at HDFC Bank",
      "Subject Topper in Statistics (1st Semester)",
    ],
  },
  {
    degree: "Bachelor of Commerce (Computers)",
    institution: "Osmania University, India",
    period: "2010 - 2013",
    grade: "79%",
    highlights: ["Pursued IT, C Language, RDBMS, Web Programming, Statistics"],
  },
]

export function Education() {
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

    const cards = sectionRef.current?.querySelectorAll(".education-card")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12">Education</h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card
              key={index}
              className="education-card p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 opacity-0"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <p className="text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.period} • <span className="text-primary font-semibold">{edu.grade}</span>
                  </p>
                  <ul className="space-y-1 pt-2">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start">
                        <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
