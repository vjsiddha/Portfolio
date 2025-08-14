import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function ChatLauncher() {
  const navigate = useNavigate();

  return (
    <Button 
      variant="outline" 
      size="sm"
      className="pixel-shadow border-2 font-mono hover:shadow-glow"
      onClick={() => navigate('/chat')}
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      Open Chat
    </Button>
  );
}