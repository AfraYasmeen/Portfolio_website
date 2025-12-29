"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef } from "react"

const skillCategories = [
  {
    category: "Programming & Data Science",
    skills: [
      "Python (NumPy, pandas, matplotlib, scikit-learn, tensorflow, keras)",
      "Machine Learning (Supervised & Unsupervised)",
      "SQL, RDBMS, Web Programming",
      "C Language, Java, HTML",
      "Data Preprocessing, Wrangling, Visualization",
    ],
  },
  {
    category: "Machine Learning Expertise",
    skills: [
      "Regression & Classification",
      "Clustering & Association Rule Learning",
      "Natural Language Processing",
      "Deep Learning & Neural Networks",
      "Time Series Forecasting & Trend Analysis",
      "Dimensionality Reduction & Model Selection",
      "GANs (Generative Adversarial Networks)",
    ],
  },
  {
    category: "Tools & Technologies",
    skills: [
      "SAP HANA, Power BI, Tableau",
      "Microsoft Excel (Advanced & Automation)",
      "Azure Data Factory, Pyspark, MS SQL",
      "Git, Agile, Waterfall Project Management",
      "GoSystems (Thomson Reuters)",
    ],
  },
  {
    category: "Domain Knowledge",
    skills: [
      "Finance & Tax (US-Canada Corporate & Partnership)",
      "Quality Risk Management",
      "Statistical Analysis",
      "Project Leadership & Team Management",
      "Budget Planning & Control",
    ],
  },
]

export function Skills() {
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

    const cards = sectionRef.current?.querySelectorAll(".skill-card")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12">Skills & Expertise</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="skill-card p-6 hover:border-primary/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 opacity-0"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg font-semibold mb-4 text-primary">{category.category}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
