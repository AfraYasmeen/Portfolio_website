"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef } from "react"

const experiences = [
  {
    company: "My Utility Genius",
    role: "AI Team Lead",
    period: "Jan 2023 - Jun 2023",
    logo: "/my-utility-genius-logo.jpg",
    color: "bg-green-500",
    icon: "M",
    highlights: [
      "Developed automated Excel pricing tool for commercial electricity (12-36 months)",
      "Built ML models (Regression, Neural Networks) for Reuters Data Analysis Project",
      "Led retention project using classification algorithms and feature analysis",
      "Contributed to £700K AEM Research Project for Oxfordshire Council",
      "Managed data migration projects using Azure Data Factory, Pyspark, MS SQL, and Power BI",
    ],
  },
  {
    company: "Freelancer",
    role: "Web Developer",
    period: "Jun 2023 - Jan 2024",
    logo: "/placeholder.svg",
    color: "bg-blue-500",
    icon: "F",
    highlights: [
      "Designed and implemented responsive and user-friendly front-end interfaces using React.js",
      "Developed RESTful APIs using Node.js or Express.js for seamless communication between the front-end and back-end",
      "Utilized MongoDB or Mongoose schema validation and data modeling to ensure data integrity and consistency",
      "Conducted thorough testing including unit tests, integration tests, and end-to-end tests",
    ],
  },
  {
    company: "My Utility Genius",
    role: "Full Stack Developer",
    period: "Jan 2024 - Present",
    logo: "/my-utility-genius-logo.jpg",
    color: "bg-purple-500",
    icon: "M",
    highlights: [
      "End-to-end development of a React Native project, from initial planning to deployment",
      "Developing and maintaining web applications using React.js and React Native",
      "Collaborating with cross-functional teams including designers and other developers",
      "Implementing responsive design and ensuring cross-browser compatibility",
      "Participating in code reviews and providing constructive feedback",
    ],
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
                    className={`w-12 h-12 rounded-full ${exp.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                  >
                    {exp.icon}
                  </div>
                </div>

                {/* Date */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <p className="text-sm font-medium text-muted-foreground">{exp.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
