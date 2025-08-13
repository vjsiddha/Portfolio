import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { PixelCard } from "@/components/PixelCard"
import { SkillBadge } from "@/components/SkillBadge"
import { TerminalText } from "@/components/TerminalText"
import { 
  Code, 
  Bug, 
  TestTube, 
  Shield, 
  Cpu, 
  Database,
  GitBranch,
  Terminal,
  Mail,
  Github,
  Linkedin,
  ExternalLink
} from "lucide-react"
import qeAvatar from "@/assets/qe-avatar.png"

const Index = () => {
  const [showGreeting, setShowGreeting] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const skills = [
    { name: "Python", variant: "primary" as const },
    { name: "JavaScript", variant: "accent" as const },
    { name: "Selenium", variant: "retro" as const },
    { name: "Cypress", variant: "secondary" as const },
    { name: "Jest", variant: "primary" as const },
    { name: "Docker", variant: "accent" as const },
    { name: "Jenkins", variant: "retro" as const },
    { name: "Git", variant: "secondary" as const },
    { name: "SQL", variant: "primary" as const },
    { name: "API Testing", variant: "accent" as const },
    { name: "Automation", variant: "retro" as const },
    { name: "CI/CD", variant: "secondary" as const }
  ]

  const projects = [
    {
      title: "E2E Test Automation Framework",
      description: "Built comprehensive testing suite with Cypress and Python",
      tech: ["Python", "Cypress", "Docker", "Jenkins"],
      status: "Production"
    },
    {
      title: "API Quality Dashboard", 
      description: "Real-time monitoring dashboard for API performance and reliability",
      tech: ["JavaScript", "Node.js", "PostgreSQL", "Grafana"],
      status: "Active"
    },
    {
      title: "Bug Detection AI",
      description: "Machine learning model to predict potential bug hotspots",
      tech: ["Python", "TensorFlow", "Git Analysis", "CI/CD"],
      status: "Research"
    }
  ]

  return (
    <div className="min-h-screen bg-background scan-line">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b-2 border-primary bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-mono text-xl font-bold text-primary terminal-glow">
            QE.DEV
          </div>
          <div className="flex gap-4 items-center">
            <Button 
              variant="ghost" 
              onClick={() => setActiveSection("hero")}
              className="font-mono hover:text-primary"
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setActiveSection("skills")}
              className="font-mono hover:text-primary"
            >
              Skills
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setActiveSection("projects")}
              className="font-mono hover:text-primary"
            >
              Projects
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setActiveSection("contact")}
              className="font-mono hover:text-primary"
            >
              Contact
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="ascii-border"></div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold font-mono text-primary terminal-glow">
                  QUALITY_ENGINEER.EXE
                </h1>
                {showGreeting && (
                  <div className="text-xl md:text-2xl text-muted-foreground">
                    <TerminalText 
                      text="> Ensuring code quality, one test at a time..." 
                      speed={50}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-4 font-mono">
                <p className="text-lg">
                  <span className="text-primary">$</span> <span className="text-accent">whoami</span>
                </p>
                <p className="text-muted-foreground ml-4">
                  Senior Quality Engineer specializing in test automation, 
                  CI/CD pipelines, and building robust testing frameworks.
                </p>
                <p className="text-lg">
                  <span className="text-primary">$</span> <span className="text-accent">cat skills.txt</span>
                </p>
                <p className="text-muted-foreground ml-4">
                  Test Automation • API Testing • Performance Testing • DevOps
                </p>
              </div>

              <div className="flex gap-4">
                <Button className="pixel-shadow bg-gradient-terminal border-2 border-primary font-mono hover:shadow-glow">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </Button>
                <Button variant="outline" className="pixel-shadow border-2 font-mono hover:shadow-glow">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Resume
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src={qeAvatar} 
                  alt="Quality Engineer Avatar"
                  className="w-80 h-80 pixel-shadow border-4 border-primary rounded-none bg-secondary/20 animate-pixel-pulse"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-3 py-1 font-mono text-sm pixel-shadow border-2 border-primary">
                  STATUS: ONLINE
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-center mb-12 text-primary terminal-glow">
              SKILL_TREE.JSON
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <PixelCard title="Testing Frameworks" glitch>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TestTube className="w-4 h-4 text-primary" />
                    <span>Selenium WebDriver</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bug className="w-4 h-4 text-primary" />
                    <span>Cypress • Playwright</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-primary" />
                    <span>Jest • PyTest</span>
                  </div>
                </div>
              </PixelCard>

              <PixelCard title="Development" glitch>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    <span>Python • JavaScript</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-primary" />
                    <span>Git • GitHub Actions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    <span>SQL • MongoDB</span>
                  </div>
                </div>
              </PixelCard>

              <PixelCard title="DevOps & Tools" glitch>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    <span>Docker • Kubernetes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>Jenkins • CircleCI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    <span>AWS • Azure</span>
                  </div>
                </div>
              </PixelCard>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <SkillBadge key={index} variant={skill.variant}>
                  {skill.name}
                </SkillBadge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-center mb-12 text-primary terminal-glow">
              PROJECT_LOG.DB
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <PixelCard key={index} title={project.title} description={project.description} glitch>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <SkillBadge key={techIndex} variant="secondary">
                          {tech}
                        </SkillBadge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-sm px-2 py-1 border-2 pixel-shadow ${
                        project.status === 'Production' ? 'border-success text-success bg-success/10' :
                        project.status === 'Active' ? 'border-primary text-primary bg-primary/10' :
                        'border-accent text-accent bg-accent/10'
                      }`}>
                        {project.status}
                      </span>
                      <Button variant="ghost" size="sm" className="font-mono hover:text-primary">
                        View Code →
                      </Button>
                    </div>
                  </div>
                </PixelCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12 text-primary terminal-glow">
              INIT_CONTACT.SH
            </h2>
            
            <PixelCard title="Let's Connect" className="max-w-2xl mx-auto">
              <div className="space-y-6">
                <p className="text-lg">
                  Ready to improve your code quality? Let's talk about testing strategies, 
                  automation frameworks, or just geek out about tech!
                </p>
                
                <div className="flex justify-center gap-4">
                  <Button className="pixel-shadow bg-gradient-terminal border-2 border-primary font-mono hover:shadow-glow">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Me
                  </Button>
                  <Button variant="outline" className="pixel-shadow border-2 font-mono hover:shadow-glow">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="outline" className="pixel-shadow border-2 font-mono hover:shadow-glow">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>

                <div className="font-mono text-sm text-muted-foreground pt-4 border-t-2 border-primary/20">
                  <TerminalText text="$ echo 'Looking forward to collaborating!' && exit 0" speed={30} />
                </div>
              </div>
            </PixelCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-primary bg-background/80 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="font-mono text-muted-foreground">
            <span className="text-primary">©</span> 2024 QUALITY_ENGINEER.DEV 
            <span className="text-primary mx-2">|</span> 
            Built with <span className="text-accent">React</span> + <span className="text-primary">TypeScript</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Index