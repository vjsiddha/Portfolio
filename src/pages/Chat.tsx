import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PixelCard } from "@/components/PixelCard"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Send, ArrowLeft, Bot, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ProfileData } from "@/types/profile"
import profileData from "@/data/profile.json"

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  source?: string;
}

const SEED_QUESTIONS = [
  "Who is Vardhman?",
  "What are your top skills?",
  "Tell me about NourishNudge",
  "What did you do at A. Berger?",
  "What's your education background?",
  "How can I contact you?"
];

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Vardhman's resume assistant. Ask me anything about his experience, skills, projects, or background!",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const searchProfile = (query: string): { content: string; source: string } => {
    const profile = profileData as ProfileData;
    const lowerQuery = query.toLowerCase();

    // Check for general info
    if (lowerQuery.includes('who') || lowerQuery.includes('about') || lowerQuery.includes('vardhman')) {
      return {
        content: `${profile.contact.name} is a ${profile.profileSummary}`,
        source: "Profile Summary"
      };
    }

    // Check for skills
    if (lowerQuery.includes('skill') || lowerQuery.includes('tool') || lowerQuery.includes('technology')) {
      const allSkills = [...profile.skills.product, ...profile.skills.design, ...profile.skills.data];
      return {
        content: `My core skills include: Product Tools (${profile.skills.product.join(', ')}), Design & Delivery (${profile.skills.design.join(', ')}), and Data & Visualization (${profile.skills.data.join(', ')}).`,
        source: "Skills"
      };
    }

    // Check for specific projects
    for (const project of profile.projects) {
      if (lowerQuery.includes(project.title.toLowerCase()) || 
          project.title.toLowerCase().includes(lowerQuery) ||
          lowerQuery.includes('nourishnudge') || lowerQuery.includes('cleverdeck')) {
        return {
          content: `${project.title} (${project.dates}): ${project.bullets.join(' ')} ${project.outcome}`,
          source: "Projects"
        };
      }
    }

    // Check for specific companies/experience
    for (const exp of profile.experience) {
      if (lowerQuery.includes(exp.company.toLowerCase()) || 
          lowerQuery.includes(exp.role.toLowerCase()) ||
          exp.company.toLowerCase().includes(lowerQuery)) {
        return {
          content: `At ${exp.company} as ${exp.role} (${exp.dates}): ${exp.bullets.join(' ')} Impact: ${exp.impact}`,
          source: "Experience"
        };
      }
    }

    // Check for education
    if (lowerQuery.includes('education') || lowerQuery.includes('university') || lowerQuery.includes('waterloo') || lowerQuery.includes('school')) {
      const edu = profile.education[0];
      return {
        content: `${edu.program} at ${edu.school} (${edu.dates}). Relevant courses: ${edu.highlights.join(', ')}.`,
        source: "Education"
      };
    }

    // Check for contact
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('reach')) {
      return {
        content: `You can reach me at ${profile.contact.email}, call ${profile.contact.phone}, or connect on LinkedIn (${profile.contact.linkedin}) or GitHub (${profile.contact.github}).`,
        source: "Contact"
      };
    }

    // Check for leadership
    if (lowerQuery.includes('leadership') || lowerQuery.includes('president') || lowerQuery.includes('society')) {
      const leadership = profile.leadership[0];
      return {
        content: `${leadership.title} (${leadership.dates}): ${leadership.bullets.join(' ')} Impact: ${leadership.impact}`,
        source: "Leadership"
      };
    }

    return {
      content: "I don't have that specific information in my knowledge base. Try asking about skills, projects, experience, education, or contact details!",
      source: "General"
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const { content, source } = searchProfile(input.trim());
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: content,
        sender: 'bot',
        timestamp: new Date(),
        source: source
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSeedQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-background scan-line">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b-2 border-primary bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
              className="font-mono hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="font-mono text-xl font-bold text-primary terminal-glow">
              RESUME_CHAT.EXE
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-muted-foreground">
              Resume Q&A • Mode: Local
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PixelCard title="Chat Interface" className="h-[calc(100vh-12rem)]" glitch>
          <div className="flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 border-2 border-primary bg-primary/20 flex items-center justify-center pixel-shadow">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : ''}`}>
                    <div
                      className={`p-3 border-2 pixel-shadow font-mono text-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-secondary/50 border-secondary'
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.source && (
                      <div className="text-xs text-muted-foreground mt-1 font-mono">
                        Source: {message.source}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground mt-1 font-mono">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-8 h-8 border-2 border-primary bg-primary/20 flex items-center justify-center pixel-shadow order-3">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 border-2 border-primary bg-primary/20 flex items-center justify-center pixel-shadow">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary/50 border-2 border-secondary p-3 pixel-shadow">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Seed Questions */}
            <div className="mb-4">
              <div className="text-xs font-mono text-muted-foreground mb-2">Quick questions:</div>
              <div className="flex flex-wrap gap-2">
                {SEED_QUESTIONS.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs font-mono border-primary/50 hover:border-primary"
                    onClick={() => handleSeedQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about experience, skills, projects..."
                className="font-mono border-2 border-primary focus:shadow-glow"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="pixel-shadow bg-gradient-terminal border-2 border-primary font-mono hover:shadow-glow"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </PixelCard>
      </div>
    </div>
  );
}