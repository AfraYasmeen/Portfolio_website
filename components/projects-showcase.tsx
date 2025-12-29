"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { useEffect, useRef } from "react"

const projects = [
  {
    title: "Ecommerce Admin",
    description:
      "The admin panel boasts an intuitive dashboard with key metrics like sales trends, customer insights, and inventory levels. Customizable widgets provide at-a-glance insights into the store's performance.",
    image: "/ecommerce-admin-dashboard-dark-blue.jpg",
    tags: ["#react", "#mongodb", "#scss"],
  },
  {
    title: "Chat App",
    description:
      "Our chat application harnesses the capabilities of the MERN create a seamless communication experience. Users can effortlessly register, login, create groups, and exchange messages, fostering real-time interactions and collaboration.",
    image: "/chat-app-messaging-interface-purple.jpg",
    tags: ["#react", "#fastapi", "#express"],
  },
  {
    title: "Cryptocurrency Tracker",
    description:
      "Our cryptocurrency tracker application utilizes the MERN stack—MongoDB, Express.js, React, and Node.js—to deliver real-time information and analysis on various cryptocurrencies. Users can monitor cryptocurrency prices, view historical data, set alerts, and stay updated with market trends.",
    image: "/cryptocurrency-tracker-dashboard-red.jpg",
    tags: ["#react", "#fastapi", "#express"],
  },
]

export function ProjectsShowcase() {
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

    const cards = sectionRef.current?.querySelectorAll(".project-card")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-sm text-muted-foreground mb-2">MY WORK</p>
          <h2 className="text-5xl font-bold mb-4">Projects.</h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Following projects showcases my skills and experience through real-world examples of my work. Each project
            is briefly described with links to code repositories and live demos in it. It reflects my ability to solve
            complex problems, work with different technologies, and manage projects effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="project-card overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 opacity-0 group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <div className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-primary/80 transition-colors cursor-pointer">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
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
