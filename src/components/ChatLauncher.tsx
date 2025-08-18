import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { ChatBot } from "./ChatBot"

export const ChatLauncher = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      <Button 
        onClick={() => setIsChatOpen(true)}
        className="pixel-shadow bg-gradient-terminal border-2 border-primary font-mono hover:shadow-glow"
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Chat with Me
      </Button>
      
      <ChatBot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  )
}