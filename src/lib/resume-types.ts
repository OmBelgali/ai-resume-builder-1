/** Resume data types — skeleton only (no validation). */

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  period: string;
  details?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  details?: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  period: string;
  details?: string;
  description?: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillsData {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface Links {
  github: string;
  linkedin: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: string[];
  skillsCategorized?: SkillsData;
  links: Links;
}

export const defaultResumeData: ResumeData = {
  personal: {
    name: "",
    email: "",
    phone: "",
    location: "",
  },
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: [],
  skillsCategorized: {
    technical: [],
    soft: [],
    tools: [],
  },
  links: { github: "", linkedin: "" },
};

export function createEducationEntry(): EducationEntry {
  return {
    id: crypto.randomUUID(),
    institution: "",
    degree: "",
    period: "",
    details: "",
  };
}

export function createExperienceEntry(): ExperienceEntry {
  return {
    id: crypto.randomUUID(),
    company: "",
    role: "",
    period: "",
    details: "",
  };
}

export function createProjectEntry(): ProjectEntry {
  return {
    id: crypto.randomUUID(),
    name: "",
    period: "",
    details: "",
    description: "",
    techStack: [],
    liveUrl: "",
    githubUrl: "",
  };
}
