import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PixelCard } from "@/components/PixelCard"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Send, ArrowLeft, Bot, User, Copy, ExternalLink, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ProfileData } from "@/types/profile"
import profileData from "@/data/profile.json"

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SEED_QUESTIONS = [
  "Who am I?",
  "What are my top skills?",
  "Tell me about BetWise",
  "Tell me about MindfulMeals",
  "What did I do at A. Berger?",
  "What's my education?",
  "How can you contact me?"
];

// Build alias mapping for better retrieval
const buildAliasMap = (profile: ProfileData) => {
  const aliasMap: Record<string, string[]> = {};
  
  // Experience aliases
  profile.experience.forEach(exp => {
    const mainName = exp.company.toLowerCase();
    aliasMap[mainName] = [mainName, ...(exp.aliases?.map(a => a.toLowerCase()) || [])];
  });
  
  // Project aliases
  profile.projects.forEach(project => {
    const mainName = project.title.toLowerCase();
    const shortName = project.title.split(' – ')[0].toLowerCase();
    aliasMap[mainName] = [mainName, shortName];
    aliasMap[shortName] = [mainName, shortName];
  });
  
  return aliasMap;
};

// Load and chunk both profile data and resume text
const loadResumeData = async () => {
  try {
    const response = await fetch('/src/data/resume.txt');
    const resumeText = await response.text();
    return resumeText;
  } catch (error) {
    console.log('Resume file not found, using profile data only');
    return '';
  }
};

// Chunk all available data for retrieval
const chunkAllData = (profile: ProfileData, resumeText: string = '') => {
  const chunks: Array<{ content: string; type: string }> = [];
  
  // Profile summary
  chunks.push({
    content: `I am ${profile.contact.name}. ${profile.profileSummary}`,
    type: "summary"
  });
  
  // Skills
  chunks.push({
    content: `My core skills include: Product Tools (${profile.skills.product.join(', ')}), Design & Delivery (${profile.skills.design.join(', ')}), and Data & Visualization (${profile.skills.data.join(', ')}).`,
    type: "skills"
  });
  
  // Projects
  profile.projects.forEach(project => {
    chunks.push({
      content: `${project.title} (${project.dates}): ${project.bullets.join(' ')}`,
      type: "project"
    });
  });
  
  // Experience
  profile.experience.forEach(exp => {
    chunks.push({
      content: `At ${exp.company} as ${exp.role} (${exp.dates}): ${exp.bullets.join(' ')} Impact: ${exp.impact}`,
      type: "experience"
    });
  });
  
  // Education
  profile.education.forEach(edu => {
    chunks.push({
      content: `I studied ${edu.program} at ${edu.school} (${edu.dates}). Relevant courses: ${edu.highlights.join(', ')}.`,
      type: "education"
    });
  });
  
  // Leadership
  profile.leadership.forEach(leadership => {
    chunks.push({
      content: `As ${leadership.title} (${leadership.dates}): ${leadership.bullets.join(' ')} Impact: ${leadership.impact}`,
      type: "leadership"
    });
  });
  
  // Contact
  chunks.push({
    content: `You can reach me at ${profile.contact.email}, call ${profile.contact.phone}, or connect on LinkedIn (${profile.contact.linkedin}) or GitHub (${profile.contact.github}).`,
    type: "contact"
  });
  
  // Add resume text chunks if available
  if (resumeText) {
    const resumeSections = resumeText.split('\n\n').filter(section => section.trim());
    resumeSections.forEach(section => {
      if (section.length > 50) { // Only meaningful sections
        chunks.push({
          content: section.trim(),
          type: "resume"
        });
      }
    });
  }
  
  return chunks;
};

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Vardhman. Ask me anything about my experience, skills, projects, or background!",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [tempApiKey, setTempApiKey] = useState("");
  const [showApiKeyBanner, setShowApiKeyBanner] = useState(true);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [resumeData, setResumeData] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check for API key availability and load resume data
  useEffect(() => {
    const checkAPIKeyAvailability = async () => {
      try {
        const response = await fetch('/api/check-key');
        const data = await response.json();
        if (data.hasKey) {
          setHasApiKey(true);
          setShowApiKeyBanner(false);
        }
      } catch (error) {
        console.log('No backend API key available');
      }
    };

    const localKey = localStorage.getItem('resume_chat_api_key');
    if (localKey) {
      setTempApiKey(localKey);
      setHasApiKey(true);
      setShowApiKeyBanner(false);
    } else {
      checkAPIKeyAvailability();
    }

    // Load resume data
    loadResumeData().then(setResumeData);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getIntentBasedChunks = (query: string) => {
    const profile = profileData as ProfileData;
    const allChunks = chunkAllData(profile, resumeData);
    const lowerQuery = query.toLowerCase();
    
    // Intent routing - filter chunks by section type
    let filteredChunks = allChunks;
    
    // Company mentions -> Experience only
    const companyAliases = ['a. berger', 'berger', 'precision', 'ozery', 'bakery', 'brampton', 'rbc', 'royal bank', 'forcen'];
    if (companyAliases.some(alias => lowerQuery.includes(alias))) {
      filteredChunks = allChunks.filter(chunk => chunk.type === 'experience' || chunk.type === 'resume');
    }
    // Project mentions -> Projects only
    else if (lowerQuery.includes('betwise') || lowerQuery.includes('mindfulmeals') || lowerQuery.includes('nourishnudge') || lowerQuery.includes('cleverdeck')) {
      filteredChunks = allChunks.filter(chunk => chunk.type === 'project');
    }
    // Skills queries -> Skills + project stacks
    else if (lowerQuery.includes('skill') || lowerQuery.includes('tool') || lowerQuery.includes('stack') || lowerQuery.includes('technology')) {
      filteredChunks = allChunks.filter(chunk => chunk.type === 'skills' || chunk.type === 'project');
    }
    
    return filteredChunks;
  };

  const retrieveRelevantChunks = (query: string, limit = 3) => {
    const aliasMap = buildAliasMap(profileData as ProfileData);
    const lowerQuery = query.toLowerCase();
    
    // Expand query with aliases
    let expandedQuery = lowerQuery;
    Object.entries(aliasMap).forEach(([key, aliases]) => {
      if (aliases.some(alias => lowerQuery.includes(alias))) {
        expandedQuery += ' ' + aliases.join(' ');
      }
    });

    // Get intent-filtered chunks
    const chunks = getIntentBasedChunks(query);

    // Simple scoring based on keyword matches
    const scoredChunks = chunks.map(chunk => {
      const content = chunk.content.toLowerCase();
      const words = expandedQuery.split(/\s+/);
      let score = 0;
      
      words.forEach(word => {
        if (content.includes(word)) {
          score += word.length; // Longer words get higher weight
        }
      });
      
      return { ...chunk, score };
    });

    // Return top chunks
    return scoredChunks
      .filter(chunk => chunk.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  };

  const searchProfile = (query: string): { content: string } => {
    const chunks = retrieveRelevantChunks(query);
    
    if (chunks.length === 0) {
      return {
        content: "I don't have that info yet."
      };
    }
    
    // Synthesize a conversational first-person response (2-4 sentences)
    const rawContent = chunks.map(chunk => chunk.content).join(' ');
    
    // Convert bullet points to natural sentences
    const naturalContent = rawContent
      .replace(/•\s*/g, '')
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Limit to 2-4 sentences for conversational flow
    const sentences = naturalContent.split('.').filter(s => s.trim().length > 0);
    const limitedSentences = sentences.slice(0, 4).map(s => s.trim()).join('. ') + '.';
    
    return {
      content: limitedSentences
    };
  };

  const callLLMAPI = async (query: string, chunks: any[]) => {
    const apiKeyToUse = tempApiKey; // Only use temp key from frontend
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          context: chunks,
          apiKey: apiKeyToUse
        })
      });
      
      if (!response.ok) throw new Error('API call failed');
      
      const data = await response.json();
      return { content: data.content };
    } catch (error) {
      console.error('LLM API error:', error);
      return searchProfile(query); // Fallback to local search
    }
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
    const currentInput = input.trim();
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(async () => {
      let result;
      
      if (hasApiKey || tempApiKey) {
        const chunks = retrieveRelevantChunks(currentInput);
        result = await callLLMAPI(currentInput, chunks);
      } else {
        result = searchProfile(currentInput);
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.content,
        sender: 'bot',
        timestamp: new Date()
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


  const handleUseTemporarily = () => {
    if (apiKey.trim()) {
      setTempApiKey(apiKey.trim());
      localStorage.setItem('resume_chat_api_key', apiKey.trim());
      setHasApiKey(true);
      setShowApiKeyBanner(false);
      setApiKey("");
    }
  };

  const handleMakePermanent = () => {
    if (apiKey.trim()) {
      navigator.clipboard.writeText(apiKey.trim());
      // Open Lovable's OpenAI integration page
      window.open(`https://lovable.dev/projects/${window.location.hostname}/integrations/openai`, '_blank');
      setApiKey("");
    }
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
              Resume Q&A • Mode: {hasApiKey || tempApiKey ? 'LLM (OpenAI)' : 'Local'}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PixelCard title="Chat Interface" className="h-[calc(100vh-12rem)]" glitch>
          <div className="flex flex-col h-full">
            {/* OpenAI API Key Banner */}
            {showApiKeyBanner && !hasApiKey && !tempApiKey && (
              <div className="mb-4 p-3 border-2 border-primary/50 bg-primary/10 pixel-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-mono text-primary">Connect OpenAI for Enhanced Chat</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowApiKeyBanner(false)}
                    className="h-6 w-6"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-2 items-center">
                  <Input
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Paste OpenAI API Key"
                    className="font-mono text-xs border-primary/50"
                    type="password"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleUseTemporarily}
                    disabled={!apiKey.trim()}
                    className="font-mono text-xs"
                  >
                    Use Temporarily
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleMakePermanent}
                    disabled={!apiKey.trim()}
                    className="font-mono text-xs gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Make Permanent
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}

            {/* Messages Container with Fixed Height and Scroll */}
            <div className="max-h-[65vh] h-[65vh] md:max-h-[70vh] md:h-[70vh] overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((message) => (
                <div key={message.id}>
                  <div className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 border-2 border-primary bg-primary/20 flex items-center justify-center pixel-shadow flex-shrink-0">
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
                        style={{ wordBreak: 'break-word', overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }}
                      >
                        {message.text}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 font-mono">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>

                    {message.sender === 'user' && (
                      <div className="w-8 h-8 border-2 border-primary bg-primary/20 flex items-center justify-center pixel-shadow order-3 flex-shrink-0">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 border-2 border-primary bg-primary/20 flex items-center justify-center pixel-shadow flex-shrink-0">
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

            {/* Seed Questions - Sticky to bottom area */}
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

            {/* Input - Sticky at bottom */}
            <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm pt-2 border-t border-primary/20">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about my experience, skills, projects..."
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
          </div>
        </PixelCard>
      </div>
    </div>
  );
}