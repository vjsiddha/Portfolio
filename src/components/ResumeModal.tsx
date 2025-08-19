import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, X } from "lucide-react"
import profileData from "@/data/profile.json"
import { ProfileData } from "@/types/profile"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const profile = profileData as ProfileData

  const handleDownloadResume = () => {
    const resumeContent = `
VARDHMAN JAIN
vjsiddha@uwaterloo.ca | linkedin.com/in/vardhman-jain- | github.com/vjsiddha | (647) 838-6925

SKILLS
Product Tools: ${profile.skills.product.join(", ")}
Design & Delivery: ${profile.skills.design.join(", ")}
Data & Visualization: ${profile.skills.data.join(", ")}

EXPERIENCE
${profile.experience.map(exp => `
${exp.role}
${exp.company} | ${exp.dates} | ${exp.location}
${exp.bullets.map(bullet => `• ${bullet}`).join('\n')}
`).join('\n')}

PROJECTS
${profile.projects.map(project => `
${project.title} | ${project.dates}
${project.bullets.map(bullet => `• ${bullet}`).join('\n')}
`).join('\n')}

LEADERSHIP AND STRATEGY
${profile.leadership.map(leadership => `
${leadership.title} | ${leadership.dates}
${leadership.bullets.map(bullet => `• ${bullet}`).join('\n')}
`).join('\n')}

EDUCATION
${profile.education.map(edu => `
${edu.school} | ${edu.dates} | ${edu.location}
${edu.program}
Relevant Courses: ${edu.highlights.join(", ")}
`).join('\n')}
    `.trim()

    const blob = new Blob([resumeContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${profile.contact.name.replace(' ', '_')}_Resume.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] border-2 border-primary pixel-shadow [&>button]:hidden">
        <DialogHeader className="border-b-2 border-primary pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-mono text-primary text-xl">
              RESUME.PDF
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadResume}
                className="font-mono border-2 border-primary hover:shadow-glow"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <div id="resume-content" className="space-y-6 p-4 font-mono">
            {/* Header */}
            <div className="text-center space-y-2 border-b-2 border-primary pb-4">
              <h1 className="text-2xl font-bold text-primary">{profile.contact.name}</h1>
              <div className="text-sm text-muted-foreground">
                <p>{profile.contact.email} | {profile.contact.linkedin} | {profile.contact.github} | {profile.contact.phone}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-primary border-b border-primary pb-1">SKILLS</h2>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-accent">Product Tools:</span> {profile.skills.product.join(", ")}
                </div>
                <div>
                  <span className="font-semibold text-accent">Design & Delivery:</span> {profile.skills.design.join(", ")}
                </div>
                <div>
                  <span className="font-semibold text-accent">Data & Visualization:</span> {profile.skills.data.join(", ")}
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-primary border-b border-primary pb-1">EXPERIENCE</h2>
              {profile.experience.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.role}</h3>
                      <p className="text-accent font-semibold">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">{exp.dates}</p>
                      <p className="text-muted-foreground">{exp.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-1 text-sm ml-4">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-primary border-b border-primary pb-1">PROJECTS</h2>
              {profile.projects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.dates}</p>
                  </div>
                  <ul className="space-y-1 text-sm ml-4">
                    {project.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Leadership */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-primary border-b border-primary pb-1">LEADERSHIP AND STRATEGY</h2>
              {profile.leadership.map((leadership, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-foreground">{leadership.title}</h3>
                    <p className="text-sm text-muted-foreground">{leadership.dates}</p>
                  </div>
                  <ul className="space-y-1 text-sm ml-4">
                    {leadership.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-primary border-b border-primary pb-1">EDUCATION</h2>
              {profile.education.map((edu, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-foreground">{edu.school}</h3>
                      <p className="text-accent">{edu.program}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">{edu.dates}</p>
                      <p className="text-muted-foreground">{edu.location}</p>
                    </div>
                  </div>
                  <div className="text-sm ml-4">
                    <p className="font-semibold text-foreground mb-1">Relevant Courses:</p>
                    <p className="text-muted-foreground">{edu.highlights.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}