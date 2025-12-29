"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef } from "react"
import Image from "next/image"

const experiences = [
  {
    company: "My Utility Genius",
    role: "AI Team Lead",
    period: "Apr 2023 - Present (1 Year + Internship)",
    logo: "/my-utility-genius-logo.jpg",
    description: "Leading AI team in developing automated solutions and ML models for energy pricing and analytics.",
    highlights: [
      "Developed automated Excel pricing tool for commercial electricity (12-36 months)",
      "Built ML models (Regression, Neural Networks) for Reuters Data Analysis Project",
      "Led retention project using classification algorithms and feature analysis",
      "Contributed to £700K AEM Research Project for Oxfordshire Council",
      "Managed data migration projects using Azure Data Factory, Pyspark, MS SQL, and Power BI",
    ],
    tags: ["Python", "Machine Learning", "Data Analysis", "Power BI", "Azure"],
  },
  {
    company: "Deloitte",
    role: "Quality Risk Analyst II",
    period: "May 2021 - May 2022",
    logo: "/deloitte-logo.png",
    description: "Managed quality risk and compliance programs for US-India Tax Function.",
    highlights: [
      "EA Program Management - Reviewed IRS qualification status of Deloitte learnings",
      "PTIN Program Management - Instructed sessions for Tax professionals",
      "Engagement Letter Program Management - Ensured compliance with Deloitte Policies",
      "Nominated to Tax Advisory Committee by QRM Lead",
    ],
    tags: ["Quality Risk", "Tax Compliance", "Program Management"],
  },
  {
    company: "Deloitte",
    role: "Tax Office Management & Reporting Analyst",
    period: "Mar 2018 - Jan 2021 (2 Years 9 Months)",
    logo: "/deloitte-logo.png",
    description: "Led reporting, analysis, and new hire onboarding for Tax Function.",
    highlights: [
      "Prepared Client Service Hours reports using SAP HANA and Tableau",
      "Led 5 CSR batches (250-650 professionals) onboarding as Project Lead",
      "Managed budget planning and cost center transfers",
      "Prepared presentations for client visits and leadership events",
    ],
    tags: ["SAP HANA", "Tableau", "Project Management", "Budget Planning"],
  },
  {
    company: "Deloitte",
    role: "Tax Consultant II",
    period: "Jan 2016 - Mar 2018 (2 Years 3 Months)",
    logo: "/deloitte-logo.png",
    description: "Prepared and reviewed tax returns for US-Canada corporations and partnerships.",
    highlights: [
      'Secured batches for being "Top Performer" during training',
      "Prepared Work Papers & Tax Returns (Form 1120 & 1065)",
      "Recognized for quality work and quick turnaround time",
      "Worked as Acting Senior to bridge resource gaps",
    ],
    tags: ["US-Canada Tax", "Corporate Tax", "Partnership Tax", "GoSystems"],
  },
  {
    company: "Wells Fargo",
    role: "Associate Financial Analyst",
    period: "Oct 2013 - Mar 2015",
    logo: "/wells-fargo-stagecoach.png",
    description: "Analyzed financial statements for loan sanctioning and worked on US property insurance.",
    highlights: [
      "Selected as Best Trainee during training period",
      "Analyzed financial statements of US businesses",
      "Worked on US property insurance processes",
    ],
    tags: ["Financial Analysis", "Banking", "Insurance"],
  },
]

export function Experience() {
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

    const cards = sectionRef.current?.querySelectorAll(".experience-card")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12">Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="experience-card p-6 hover:border-primary/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 opacity-0"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={exp.logo || "/placeholder.svg"}
                      alt={`${exp.company} logo`}
                      width={60}
                      height={60}
                      className="rounded-lg border border-border/50"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <p className="text-muted-foreground font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
