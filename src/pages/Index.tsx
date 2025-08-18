import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { PixelCard } from "@/components/PixelCard"
import { SkillBadge } from "@/components/SkillBadge"
import { TerminalText } from "@/components/TerminalText"
import { ProjectModal, ProjectModalData } from "@/components/ProjectModal"

import { useNavigate } from "react-router-dom"
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
import profileData from "@/data/profile.json"
import { ProfileData } from "@/types/profile"

const Index = () => {
  const navigate = useNavigate()
  const [showGreeting, setShowGreeting] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [modalProject, setModalProject] = useState<ProjectModalData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const profile = profileData as ProfileData

  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  const openProjectModal = (project: any) => {
    const modalData: ProjectModalData = {
      title: project.title,
      dates: project.dates,
      bullets: project.bullets,
      stack: project.stack,
      outcome: project.outcome
    }
    setModalProject(modalData)
    setIsModalOpen(true)
  }

  const skills = {
    product: [
      { name: "Agile", variant: "primary" as const },
      { name: "A/B Testing", variant: "accent" as const },
      { name: "Wireframing", variant: "retro" as const },
      { name: "KPIs", variant: "secondary" as const },
      { name: "GTM Strategy", variant: "primary" as const },
      { name: "UX Research", variant: "accent" as const },
      { name: "Competitive Analysis", variant: "retro" as const }
    ],
    design: [
      { name: "Figma", variant: "primary" as const },
      { name: "PowerPoint", variant: "secondary" as const },
      { name: "DevOps", variant: "accent" as const },
      { name: "Asana", variant: "retro" as const },
      { name: "Jira", variant: "primary" as const },
      { name: "UAT/QA Testing", variant: "secondary" as const },
      { name: "JavaScript", variant: "accent" as const }
    ],
    data: [
      { name: "SQL", variant: "primary" as const },
      { name: "Excel", variant: "secondary" as const },
      { name: "Tableau", variant: "accent" as const },
      { name: "Power BI", variant: "retro" as const },
      { name: "Python", variant: "primary" as const },
      { name: "VBA", variant: "secondary" as const },
      { name: "R", variant: "accent" as const },
      { name: "Node", variant: "retro" as const },
      { name: "Google Analytics", variant: "primary" as const }
    ]
  }

  const projects = [
    {
      title: "NourishNudge – AI Ingredient Substitution Engine",
      description: "Achieved 92% substitution accuracy using ML models (XGBoost, Random Forest)",
      date: "Feb 2024 – Apr 2024",
      impact: "Improved match accuracy and satisfaction by 35% through user testing and feedback",
      tech: ["Python", "ML", "XGBoost", "User Testing"],
      status: "Complete"
    },
    {
      title: "CleverDeck – Flashcard Creation Platform",
      description: "Boosted active user sessions by 45% via modular study flows and dashboards",
      date: "Aug 2024 – Sep 2024", 
      impact: "Increased feature usage by 25% through feedback collection and adoption tracking",
      tech: ["Product Design", "Analytics", "User Feedback", "Dashboards"],
      status: "Active"
    }
  ]

  const experiences = [
    {
      title: "Quality Engineer Intern",
      company: "A. Berger Precision Ltd",
      date: "Jan 2025 – Apr 2025",
      achievements: [
        "Reduced defects by 35% via root-cause analysis and sprint-based resolution mapping",
        "Built Tableau dashboards to prioritize high-impact fixes"
      ]
    },
    {
      title: "Maintenance Planning Engineer Intern", 
      company: "Ozery Family Bakery",
      date: "Sep 2023 – Dec 2023",
      achievements: [
        "Cut inventory holding costs by 25% via Excel-based forecasting redesign",
        "Reduced task cycle time by 20% through CMMS workflow mapping"
      ]
    },
    {
      title: "Engineering Analyst Intern",
      company: "City of Brampton", 
      date: "Jan 2023 – Apr 2023",
      achievements: [
        "Led risk assessments on $5M+ projects, aligning deliverables across 4 departments",
        "Reduced prep time by 30% with planning templates and frameworks"
      ]
    },
    {
      title: "Internal Operations Intern",
      company: "RBC",
      date: "May 2022 – Aug 2022", 
      achievements: [
        "Automated 4 workflows, reducing manual input by 40%",
        "Built dashboards to track adoption and optimize 5 HR systems"
      ]
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
              onClick={() => scrollToSection("hero")}
              className="font-mono hover:text-primary"
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection("skills")}
              className="font-mono hover:text-primary"
            >
              Skills
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection("projects")}
              className="font-mono hover:text-primary"
            >
              Projects
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection("experience")}
              className="font-mono hover:text-primary"
            >
              Experience
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection("contact")}
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
                  VARDHMAN_JAIN.EXE
                </h1>
                {showGreeting && (
                  <div className="text-xl md:text-2xl text-muted-foreground">
                    <TerminalText 
                      text="> Quality Engineer | Product Thinker | Data-Driven Problem Solver" 
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
                  Management Engineering student at University of Waterloo (Graduating 2026) with experience 
                  across quality engineering, product development, and data-driven process improvement.
                </p>
                <p className="text-lg">
                  <span className="text-primary">$</span> <span className="text-accent">cat expertise.txt</span>
                </p>
                <p className="text-muted-foreground ml-4">
                  High-precision manufacturing • Product platforms • Root-cause analysis • Automation • User-focused solutions
                </p>
              </div>

              <div className="flex gap-4">
                <Button 
                  className="pixel-shadow bg-gradient-terminal border-2 border-primary font-mono hover:shadow-glow"
                  onClick={() => scrollToSection("contact")}
                >
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
              <PixelCard title="Product Tools" glitch>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TestTube className="w-4 h-4 text-primary" />
                    <span>Agile • A/B Testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bug className="w-4 h-4 text-primary" />
                    <span>Wireframing • KPIs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-primary" />
                    <span>GTM Strategy • UX Research</span>
                  </div>
                </div>
              </PixelCard>

              <PixelCard title="Design & Delivery" glitch>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    <span>Figma • PowerPoint</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-primary" />
                    <span>DevOps • Asana • Jira</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    <span>UAT/QA Testing • JavaScript</span>
                  </div>
                </div>
              </PixelCard>

              <PixelCard title="Data & Visualization" glitch>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    <span>SQL • Excel • Tableau</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>Power BI • Python • VBA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    <span>R • Node • Google Analytics</span>
                  </div>
                </div>
              </PixelCard>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-mono text-center text-primary">Core Skills</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {[...skills.product, ...skills.design, ...skills.data].map((skill, index) => (
                  <SkillBadge key={index} variant={skill.variant}>
                    {skill.name}
                  </SkillBadge>
                ))}
              </div>
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
            
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {profile.projects.map((project, index) => (
                <PixelCard key={index} title={project.title} glitch>
                  <div className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground font-mono">{project.dates}</p>
                      <p className="text-primary">{project.bullets[0]}</p>
                      <p className="text-accent">{project.outcome}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, techIndex) => (
                        <SkillBadge key={techIndex} variant="secondary">
                          {tech}
                        </SkillBadge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm px-2 py-1 border-2 pixel-shadow border-primary text-primary bg-primary/10">
                        COMPLETE
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="font-mono hover:text-primary"
                        onClick={() => openProjectModal(project)}
                      >
                        View Details →
                      </Button>
                    </div>
                  </div>
                </PixelCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-center mb-12 text-primary terminal-glow">
              WORK_HISTORY.LOG
            </h2>
            
            <div className="space-y-6">
              {profile.experience.map((exp, index) => (
                <PixelCard key={index} title={`${exp.role} @ ${exp.company}`} glitch>
                  <div className="space-y-4">
                    <p className="text-muted-foreground font-mono text-sm">{exp.dates}</p>
                    <div className="space-y-2">
                      {exp.bullets.slice(0, 2).map((bullet, bulletIndex) => (
                        <div key={bulletIndex} className="flex items-start gap-2">
                          <span className="text-primary font-mono">•</span>
                          <span className="text-sm">{bullet}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-accent font-mono">Impact: {exp.impact}</p>
                  </div>
                </PixelCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-center mb-12 text-primary terminal-glow">
              LEADERSHIP.EXE
            </h2>
            
{profile.leadership.map((leadership, index) => (
              <PixelCard key={index} title={leadership.title} className="max-w-4xl mx-auto" glitch>
                <div className="space-y-4">
                  <p className="text-muted-foreground font-mono text-sm">{leadership.dates}</p>
                  <div className="space-y-2">
                    {leadership.bullets.map((bullet, bulletIndex) => (
                      <div key={bulletIndex} className="flex items-start gap-2">
                        <span className="text-primary font-mono">•</span>
                        <span className="text-sm">{bullet}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-accent font-mono">Impact: {leadership.impact}</p>
                </div>
              </PixelCard>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-center mb-12 text-primary terminal-glow">
              EDUCATION.SYS
            </h2>
            
{profile.education.map((edu, index) => (
              <PixelCard key={index} title={`${edu.school} – ${edu.program}`} className="max-w-4xl mx-auto" glitch>
                <div className="space-y-4">
                  <p className="text-muted-foreground font-mono text-sm">{edu.dates}</p>
                  <div className="space-y-2">
                    <p className="text-primary font-semibold">Relevant Courses:</p>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      {edu.highlights.map((course, courseIndex) => (
                        <div key={courseIndex} className="flex items-center gap-2">
                          <span className="text-accent">•</span>
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PixelCard>
            ))}
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
                  Interested in quality engineering, product development, or data-driven solutions? 
                  Let's discuss process improvement, automation, or collaboration opportunities!
                </p>
                
                <div className="flex justify-center gap-4">
                  <Button 
                    className="pixel-shadow bg-gradient-terminal border-2 border-primary font-mono hover:shadow-glow"
                    onClick={() => window.open(`mailto:${profile.contact.email}`, '_blank')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Me
                  </Button>
                  <Button 
                    variant="outline" 
                    className="pixel-shadow border-2 font-mono hover:shadow-glow"
                    onClick={() => window.open(`https://${profile.contact.github}`, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button 
                    variant="outline" 
                    className="pixel-shadow border-2 font-mono hover:shadow-glow"
                    onClick={() => window.open(`https://${profile.contact.linkedin}`, '_blank')}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>

                <div className="font-mono text-sm text-muted-foreground pt-4 border-t-2 border-primary/20">
                  <TerminalText text="$ echo 'Ready to make an impact together!' && exit 0" speed={30} />
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
            <span className="text-primary">©</span> 2024 VARDHMAN_JAIN.DEV 
            <span className="text-primary mx-2">|</span> 
            Built with <span className="text-accent">React</span> + <span className="text-primary">TypeScript</span>
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={modalProject}
      />
    </div>
  )
}

export default Index