import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SkillBadgeProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent" | "retro"
  className?: string
}

export function SkillBadge({ children, variant = "primary", className }: SkillBadgeProps) {
  const variants = {
    primary: "bg-gradient-terminal text-primary-foreground border-primary",
    secondary: "bg-secondary text-secondary-foreground border-secondary",
    accent: "bg-accent text-accent-foreground border-accent",
    retro: "bg-gradient-retro text-white border-retro-purple"
  }

  return (
    <Badge className={cn(
      "font-mono pixel-shadow border-2 transition-all duration-300 hover:scale-105 hover:shadow-glow",
      variants[variant],
      className
    )}>
      {children}
    </Badge>
  )
}