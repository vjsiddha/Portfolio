export interface ProfileData {
  profileSummary: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  skills: {
    product: string[];
    design: string[];
    data: string[];
  };
  projects: Array<{
    title: string;
    dates: string;
    stack: string[];
    bullets: string[];
    outcome: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    dates: string;
    location: string;
    bullets: string[];
    impact: string;
  }>;
  leadership: Array<{
    title: string;
    dates: string;
    bullets: string[];
    impact: string;
  }>;
  education: Array<{
    school: string;
    program: string;
    dates: string;
    location: string;
    highlights: string[];
  }>;
}