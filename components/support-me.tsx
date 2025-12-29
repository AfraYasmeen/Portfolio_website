"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coffee } from "lucide-react"

export function SupportMe() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto max-w-3xl">
        <Card className="p-8 md:p-12 text-center space-y-6 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 hover:shadow-2xl transition-shadow duration-500">
          <div className="flex justify-center">
            <div className="p-4 bg-accent/10 rounded-full">
              <Coffee className="h-12 w-12 text-accent animate-bounce" />
            </div>
          </div>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            Support My Work
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            If you find my projects helpful or enjoy my content, consider buying me a coffee! Your support helps me
            continue creating innovative AI solutions and sharing knowledge with the community.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button size="lg" className="group bg-accent hover:bg-accent/90" asChild>
              <a href="https://www.buymeacoffee.com/afrayasmeen" target="_blank" rel="noopener noreferrer">
                <Coffee className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Buy Me a Coffee
              </a>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com/afrayasmeen" target="_blank" rel="noopener noreferrer">
                Star on GitHub
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">Every contribution, big or small, makes a difference!</p>
        </Card>
      </div>
    </section>
  )
}
