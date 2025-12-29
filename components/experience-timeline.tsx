"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    company: "My Utility Genius",
    role: "AI Team Lead",
    period: "April 2023 - Present",
    logo: "/MUG Logo.png",
    color: "bg-green-500",
    icon: "M",
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
    company: "My Utility Genius",
    role: "AI Developer",
    period: "May 2021 – May 2022",
    logo: "/MUG Logo.png",
    color: "bg-green-500",
    icon: "M",
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
    period: "March 2018 – January 2021",
    logo: "/Deloitte_Logo.png",
    color: "bg-blue-500",
    icon: "F",
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
    role: "Tax Office Management & Reporting Analyst II",
    period: "March 2018 – January 2021",
    logo: "/DeloitteNewSmall.png",
    color: "bg-purple-500",
    icon: "M",
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
    period: "January 2016 - March 2018 (2 Years 3 Months)",
    logo: "/Deloitte_Logo.png",
    color: "bg-purple-500",
    icon: "M",
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
    period: "September 2015 – December 2015",
    logo: "/wells-fargo-logo.png",
    color: "bg-red-500",
    icon: "M",
    highlights: [
      "Selected as Best Trainee during training period",
      "Analyzed financial statements of US businesses",
      "Worked on US property insurance processes",
    ],
    tags: ["Financial Analysis", "Banking", "Insurance"],
  },
]

export function ExperienceTimeline() {
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

    const cards = sectionRef.current?.querySelectorAll(".timeline-card")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container mx-auto max-w-5xl">
        <h2 className="text-5xl font-bold mb-4">Work Experience.</h2>

        <div className="relative mt-16">
          {/* Timeline vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border/50 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`timeline-card opacity-0 relative flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Content Card */}
                <Card
                  className={`flex-1 p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-muted-foreground font-medium mb-2">{exp.company}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                  <ul className={`space-y-2 mt-4 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        {index % 2 === 0 ? (
                          <>
                            <span className="flex-1">{highlight}</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          </>
                        ) : (
                          <>
                            <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                            <span className="flex-1">{highlight}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Timeline Icon */}
              <div className="relative flex-shrink-0 hidden md:block">
                <div
                  className={`w-12 h-12 rounded-full ${exp.color} flex items-center justify-center shadow-lg overflow-hidden`}
                >
                  <img
                    src={exp.logo}
                    alt={`${exp.company || "Company"} logo`}
                    className="w-300 h-300 object-contain"
                  />
                </div>
              </div>

                {/* Date */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <p className="text-sm font-medium text-white">{exp.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
