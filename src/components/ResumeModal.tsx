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

  const handlePrintResume = () => {
    const printContent = document.getElementById('resume-content')
    if (printContent) {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Resume - ${profile.contact.name}</title>
              <style>
                body { font-family: monospace; margin: 20px; line-height: 1.6; }
                h1 { color: #000; font-size: 24px; text-align: center; }
                h2 { color: #000; font-size: 18px; border-bottom: 1px solid #000; padding-bottom: 4px; }
                h3 { color: #000; font-size: 16px; }
                .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 16px; margin-bottom: 24px; }
                .section { margin-bottom: 24px; }
                .job { margin-bottom: 16px; }
                .job-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px; }
                .company { font-weight: bold; }
                .dates { text-align: right; font-size: 14px; }
                ul { margin: 8px 0; padding-left: 20px; }
                li { margin-bottom: 4px; }
                @media print { body { margin: 0; } }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
        printWindow.close()
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] border-2 border-primary pixel-shadow">
        <DialogHeader className="border-b-2 border-primary pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-mono text-primary text-xl">
              RESUME.PDF
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrintResume}
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