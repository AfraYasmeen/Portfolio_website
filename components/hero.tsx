"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY
        const opacity = Math.max(1 - scrollY / 500, 0)
        const translateY = scrollY * 0.5
        heroRef.current.style.transform = `translateY(${translateY}px)`
        heroRef.current.style.opacity = `${opacity}`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={heroRef} className="pt-32 pb-20 px-6 relative overflow-hidden transition-all">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto max-w-5xl">
        <div className="space-y-6 animate-slide-up print:text-black">
          <h1 className="text-6xl md:text-7xl font-bold text-balance text-black">
            Afra Yasmeen
          </h1>

          <p className="text-2xl md:text-3xl text-neutral-900 text-balance">
            AI Team Lead & Data Science Professional
          </p>

          <p className="text-lg text-neutral-800 max-w-3xl text-pretty leading-relaxed">
            MBA and MSc Data Science Graduate with 8+ years&apos; experience across Finance, Tax Consulting, Quality
            Risk Management, and AI Development. Hands-on experience in Python, ML, Data Analysis, Mining,
            Visualization, SAP HANA, Excel automation, Power BI and project leadership.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 print:hidden">
            <Button size="lg" asChild className="group text-black border-black">
              <Link href="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild className="text-black border-black">
              <a href="mailto:Afra.yasmeen2024@gmail.com">Contact Me</a>
            </Button>
          </div>
        </div>
      </div>

    </section>
  )
}
