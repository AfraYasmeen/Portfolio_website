"use client"

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="text-center space-y-6">
        {/* Animated logo/name */}
        <div className="relative">
          <div className="absolute inset-0 blur-3xl opacity-30 bg-primary rounded-full animate-pulse" />
          <h1 className="relative text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
            AY
          </h1>
        </div>

        {/* Loading bar */}
        <div className="w-64 h-1 bg-secondary rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-primary to-accent animate-loading-bar" />
        </div>

        <p className="text-muted-foreground animate-pulse">Loading Portfolio...</p>
      </div>
    </div>
  )
}
