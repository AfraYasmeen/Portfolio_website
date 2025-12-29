"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold hover:text-primary transition-colors">
          Afra Yasmeen
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm transition-colors ${pathname === "/" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              About
            </Link>
            <Link
              href="/projects"
              className={`text-sm transition-colors ${pathname === "/projects" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Work
            </Link>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/afrayasmeen" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/afra-yasmeen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:Afra.yasmeen2024@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
