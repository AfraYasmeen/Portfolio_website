"use client"

import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Overview } from "@/components/overview"
import { About } from "@/components/about"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { Skills } from "@/components/skills"
import { Tools } from "@/components/tools"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { Education } from "@/components/education"
import { Accomplishments } from "@/components/accomplishments"
import { Contact } from "@/components/contact"
import { SupportMe } from "@/components/support-me"
import { PageLoader } from "@/components/page-loader"
import { RotatingEarth } from "@/components/rotating-earth"
import { useState, useEffect } from "react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div className="min-h-screen relative">
      <RotatingEarth />
      <Navigation />
      <main>
        <Hero />
        <Overview />
        <About />
        <ExperienceTimeline />
        <Skills />
        <Tools />
        {/* <ProjectsShowcase /> */}
        <Education />
        <Accomplishments />
        <SupportMe />
        <Contact />
      </main>
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Afra Yasmeen. Built with Next.js and v0.</p>
        </div>
      </footer>
    </div>
  )
}
