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
    
    // Specific company questions
    if (lowerQuestion.includes("berger") || lowerQuestion.includes("a.berger") || lowerQuestion.includes("a. berger")) {
      return `At A. Berger Precision Ltd, I worked as a Quality Engineer Intern focusing on Operations Analysis from January to April 2025. I made significant improvements to their manufacturing processes: I identified recurring defects across 3 production lines by conducting root cause analysis and leading sprint-based resolution mapping, which cut defect rates by 35% and reduced rework time. I also built Tableau dashboards using inspection results and triage logs to enable data-informed prioritization of defect resolution, helping production teams focus on the highest-impact fixes. Additionally, I standardized quality documentation in Confluence and linked it to version-controlled procedures in Git, improving traceability for corrective actions and reducing onboarding time by 15%.`
    }

    if (lowerQuestion.includes("brampton") || lowerQuestion.includes("city of brampton")) {
      return `At the City of Brampton, I worked as an Engineering Analyst Intern on Infrastructure Projects from January to April 2023. My role involved managing large-scale municipal projects: I led risk assessments on $5M+ capital projects, aligning deliverables across 4 departments to avoid delays. I developed planning templates and roadmapping frameworks that reduced delivery prep time by 30%. I also coordinated stakeholder feedback to align project deliverables with long-term city planning initiatives. This experience taught me how to work effectively across multiple departments and manage complex infrastructure projects with significant budgets.`
    }

    if (lowerQuestion.includes("ozery") || lowerQuestion.includes("bakery")) {
      return `At Ozery Family Bakery, I worked as a Maintenance Planning Engineer Intern focusing on Internal Tools from September to December 2023. I made substantial operational improvements: I reduced inventory holding costs by 25% by redesigning Excel-based forecasting models and refining reorder logic. I leveraged CMMS data to map technician workflows and reduce average task cycle time by 20%. I also built a single-page KPI dashboard to support agile reviews and track team performance trends. This role taught me how to optimize manufacturing operations through data analysis and process improvement.`
    }

    if (lowerQuestion.includes("rbc") || lowerQuestion.includes("royal bank") || lowerQuestion.includes("bank")) {
      return `At Royal Bank of Canada, I worked as an Internal Operations Intern in HR Technology from May to August 2022. I focused on automation and system optimization: I automated 4 workflows using Google Apps Script, cutting manual input by 40% and reducing approval delays. I also designed and implemented interactive dashboards in Google Data Studio to track platform usage, measure adoption rates, and drive continuous optimization across 5 internal HR systems. This was my first major internship and gave me valuable experience in corporate technology environments.`
    }

    if (lowerQuestion.includes("forcen") || lowerQuestion.includes("force n")) {
      return `I have an upcoming role at ForceN as a Quality Engineer Intern from September to December 2025 in Toronto. This will be my next internship focused on quality engineering operations. I'm excited to apply the skills I've developed at A. Berger Precision and other companies to new challenges in quality engineering.`
    }

    // Project-specific questions
    if (lowerQuestion.includes("nourishnudge") || lowerQuestion.includes("ingredient")) {
      return `NourishNudge was an AI Ingredient Substitution Engine I developed from February to April 2024. I developed and tuned tree-based ML models using XGBoost and Random Forest for ingredient substitutions, achieving 92% accuracy in user testing. I conducted extensive user testing and incorporated feedback to improve match accuracy and satisfaction by 35%. This project demonstrated my ability to build practical AI applications that solve real user problems.`
    }

    if (lowerQuestion.includes("cleverdeck") || lowerQuestion.includes("flashcard")) {
      return `CleverDeck was a Flashcard Creation Platform I built from August to September 2024. I boosted active user sessions by 45% through modular study flows and flashcard tracking dashboards. I implemented feedback collection and adoption tracking to refine the study flow experience, increasing feature usage by 25%. This project focused on product design, analytics, and user feedback systems.`
    }

    if (lowerQuestion.includes("betwise") || lowerQuestion.includes("betting") || lowerQuestion.includes("sports")) {
      return `BetWise was an Interactive Decision Support System I built from May to August 2025 for sports betting. I combined data science, user interaction, and real-time insights by integrating historical NFL datasets with live odds via The Odds API. I transitioned from logistic regression to XGBoost for improved prediction calibration and ROI analysis. I delivered two key UIs: Explore Games with filters and ROI simulator, and Team Insights with performance stats and trend charts.`
    }

    if (lowerQuestion.includes("mindfulmeals") || lowerQuestion.includes("meal planner")) {
      return `MindfulMeals was a Personalized Meal Planner I developed from September to December 2024. I built a web app to find recipes based on pantry items, dietary restrictions, and preferences using React and Firebase (Auth, Firestore) for user accounts, saved recipes, and grocery cart features. I implemented nutrition display, cooking steps, allergy filtering, and profile customization, following agile sprints to improve usability and enhance search functionality.`
    }

    // General experience questions
    if (lowerQuestion.includes("experience") || lowerQuestion.includes("work") || lowerQuestion.includes("job")) {
      if (lowerQuestion.includes("exciting") || lowerQuestion.includes("favorite") || lowerQuestion.includes("best")) {
        return `One of the most exciting aspects of my work has been seeing the direct impact of data-driven improvements. At A. Berger Precision, reducing defect rates by 35% through root cause analysis was incredibly rewarding because it directly improved product quality and reduced waste. Similarly, at Ozery Family Bakery, cutting inventory costs by 25% through better forecasting models showed how technical skills can solve real business problems. I love tackling challenges that make a measurable difference.`
      }
      return `I have diverse experience across quality engineering, product development, and data-driven process improvement. My roles have spanned from A. Berger Precision (quality engineering), to Ozery Family Bakery (maintenance planning), City of Brampton (infrastructure projects), and RBC (HR technology). Each role has taught me different aspects of using data and technology to solve business problems and improve processes.`
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
      return `I'm currently pursuing a Bachelor of Applied Science in Management Engineering at the University of Waterloo, graduating in 2026. My coursework includes Simulation (Arena), Quality Control, Optimization (Excel Solver, VBA, Macros), Human-Computer Interaction (Figma), Data Structures and Algorithms, and Supply Chain Management. This program combines engineering principles with business strategy, which aligns perfectly with my interest in data-driven problem solving.`
    }

    // Leadership questions
    if (lowerQuestion.includes("leadership") || lowerQuestion.includes("president") || lowerQuestion.includes("entrepreneurship")) {
      return `I served as President of the UW Entrepreneurship Society from January to August 2024. In this role, I led 10+ campus tech and design events, boosting engagement by 40% using Airtable tracking workflows. I also partnered with sponsors and internal teams to secure over $8,000 in funding while aligning event roadmaps with society KPIs. This experience taught me how to lead teams, manage events, and work with external stakeholders.`
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