import { Navigation } from "@/components/navigation"
import { ProjectsGrid } from "@/components/projects-grid"
import { NightSky } from "@/components/night-sky"

export const metadata = {
  title: "Projects | Afra Yasmeen",
  description: "Explore my portfolio of AI, data science, and software development projects.",
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <NightSky />
      <Navigation />
      <main className="container mx-auto px-6 py-24">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold mb-4 text-balance">Projects</h1>
          <p className="text-xl text-muted-foreground mb-16 text-pretty leading-relaxed">
            A collection of my work in AI development, data science, machine learning, and automation. Each project
            showcases practical applications of Python, ML algorithms, and data analysis.
          </p>
        </div>
        <ProjectsGrid />
      </main>
      <footer className="border-t border-border/40 py-8 mt-24">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Afra Yasmeen. Built with Next.js</p>
        </div>
      </footer>
    </div>
  )
}
