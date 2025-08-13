import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TerminalTextProps {
  text: string
  className?: string
  speed?: number
  showCursor?: boolean
  onComplete?: () => void
}

export function TerminalText({ 
  text, 
  className, 
  speed = 100, 
  showCursor = true,
  onComplete 
}: TerminalTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span className={cn("font-mono", className)}>
      {displayText}
      {showCursor && (
        <span className="terminal-blink text-primary">█</span>
      )}
    </span>
  )
}