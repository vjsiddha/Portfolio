import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SkillBadge } from "@/components/SkillBadge"
import { X, ExternalLink, Github } from "lucide-react"

export interface ProjectModalData {
  title: string;
  dates: string;
  bullets: string[];
  stack: string[];
  outcome?: string;
  githubUrl?: string;
  demoUrl?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectModalData | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!project) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-2xl bg-background border-2 border-primary pixel-shadow font-mono"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <DialogTitle className="text-xl font-mono text-primary terminal-glow">
                {project.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">{project.dates}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-primary"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, index) => (
                <SkillBadge key={index} variant="secondary">
                  {tech}
                </SkillBadge>
              ))}
            </div>
          </div>

          {/* Key Achievements */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-3">Key Achievements</h4>
            <div className="space-y-2">
              {project.bullets.map((bullet, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-primary font-mono mt-1">•</span>
                  <span className="text-sm leading-relaxed">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome */}
          {project.outcome && (
            <div>
              <h4 className="text-sm font-semibold text-primary mb-3">Impact</h4>
              <p className="text-sm text-accent">{project.outcome}</p>
            </div>
          )}

          {/* External Links */}
          <div className="flex gap-3 pt-4 border-t border-primary/20">
            {project.githubUrl && (
              <Button 
                variant="outline" 
                size="sm" 
                className="font-mono border-2 hover:shadow-glow"
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            )}
            {project.demoUrl && (
              <Button 
                variant="outline" 
                size="sm" 
                className="font-mono border-2 hover:shadow-glow"
                onClick={() => window.open(project.demoUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}