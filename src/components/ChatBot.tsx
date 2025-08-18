import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Send, MessageCircle } from "lucide-react"
import profileData from "@/data/profile.json"
import { resumeText } from "@/data/resume"
import { ProfileData } from "@/types/profile"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface ChatBotProps {
  isOpen: boolean
  onClose: () => void
}

export const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I assist you today? Whether you have questions about my experience, projects, or anything related to my background, feel free to ask!",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const profile = profileData as ProfileData

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    
    // Experience related questions
    if (lowerQuestion.includes("experience") || lowerQuestion.includes("work") || lowerQuestion.includes("job")) {
      if (lowerQuestion.includes("tesla") || lowerQuestion.includes("exciting")) {
        return "One of the most exciting projects I worked on was leading the AI team at Tesla, where we focused on developing computer vision technology for Autopilot. This involved applying deep learning techniques to enable self-driving cars to perceive and understand their environment. The challenge of building robust AI systems that can safely navigate complex real-world scenarios was both technically fascinating and impactful."
      }
      return `I have experience across quality engineering, product development, and data-driven process improvement. My most recent role was as a Quality Engineer Intern at A. Berger Precision Ltd, where I reduced defect rates by 35% through root cause analysis and built Tableau dashboards for data-informed decision making. I've also worked at companies like Ozery Family Bakery, City of Brampton, and RBC, focusing on automation, process optimization, and dashboard development.`
    }

    // Skills related questions
    if (lowerQuestion.includes("skill") || lowerQuestion.includes("technology") || lowerQuestion.includes("tool")) {
      return `I have expertise across three main areas: Product Tools (Agile, A/B Testing, UX Research, KPIs), Design & Delivery (Figma, DevOps, Jira, JavaScript), and Data & Visualization (SQL, Python, Tableau, Power BI, Excel). I'm particularly strong in data analysis and process improvement, having used these skills to achieve measurable impacts like 35% defect reduction and 25% cost savings in my internships.`
    }

    // Project related questions
    if (lowerQuestion.includes("project")) {
      return `I've worked on several impactful projects! NourishNudge was an AI ingredient substitution engine using XGBoost and Random Forest models that achieved 92% accuracy. CleverDeck was a flashcard platform that boosted user sessions by 45%. I also built BetWise, an interactive sports betting decision support system, and MindfulMeals, a personalized meal planner with React and Firebase. Each project demonstrates my ability to combine technical skills with user-focused design.`
    }

    // Education related questions
    if (lowerQuestion.includes("education") || lowerQuestion.includes("university") || lowerQuestion.includes("school")) {
      return `I'm currently pursuing a Bachelor of Applied Science in Management Engineering at the University of Waterloo, graduating in 2026. My coursework includes Simulation, Quality Control, Optimization, Human-Computer Interaction, Data Structures and Algorithms, and Supply Chain Management. This program combines engineering principles with business strategy, which aligns perfectly with my interest in data-driven problem solving.`
    }

    // Leadership questions
    if (lowerQuestion.includes("leadership") || lowerQuestion.includes("president")) {
      return `I served as President of the UW Entrepreneurship Society from January to August 2024. In this role, I led 10+ campus tech and design events, boosting engagement by 40% using Airtable tracking workflows. I also partnered with sponsors and internal teams to secure over $8,000 in funding while aligning event roadmaps with society KPIs.`
    }

    // Contact/availability questions
    if (lowerQuestion.includes("contact") || lowerQuestion.includes("reach") || lowerQuestion.includes("available")) {
      return `You can reach me at vjsiddha@uwaterloo.ca or (647) 838-6925. I'm also on LinkedIn at linkedin.com/in/vardhman-jain- and GitHub at github.com/vjsiddha. I'm always interested in discussing quality engineering, product development, or data-driven solutions!`
    }

    // Default response
    return `That's a great question! I'm passionate about quality engineering and data-driven problem solving. Based on my experience at companies like A. Berger Precision and Ozery Family Bakery, I've learned that the most exciting work happens at the intersection of technology and real business impact. Whether it's reducing defect rates by 35% or building ML models with 92% accuracy, I love tackling challenges that make a measurable difference. What specific aspect of my background would you like to know more about?`
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate thinking time
    setTimeout(() => {
      const response = generateResponse(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-2xl h-[600px] mx-4 flex flex-col border-2 border-primary pixel-shadow">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-primary bg-secondary/20">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h3 className="font-mono font-bold text-primary">Chat with Vardhman</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:text-primary">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg font-mono text-sm ${
                  message.isUser
                    ? "bg-primary text-primary-foreground pixel-shadow border-2 border-primary"
                    : "bg-secondary/40 text-foreground border-2 border-muted"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-secondary/40 text-foreground border-2 border-muted p-3 rounded-lg font-mono text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t-2 border-primary bg-secondary/20">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="font-mono border-2 border-primary focus:ring-primary focus:border-primary"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="pixel-shadow border-2 border-primary font-mono hover:shadow-glow"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}