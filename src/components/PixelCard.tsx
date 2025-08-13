import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface PixelCardProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  glitch?: boolean
}

export function PixelCard({ title, description, children, className, glitch = false }: PixelCardProps) {
  return (
    <Card className={cn(
      "pixel-shadow border-2 border-primary bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-glow hover:border-accent",
      glitch && "hover:animate-glitch",
      className
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="font-mono text-primary terminal-glow">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="font-mono text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="font-mono">
        {children}
      </CardContent>
    </Card>
  )
}