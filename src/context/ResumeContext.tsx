"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultResumeData,
  type ResumeData,
  createEducationEntry,
  createExperienceEntry,
  createProjectEntry,
} from "@/lib/resume-types";

type ResumeContextValue = {
  data: ResumeData;
  setData: (data: ResumeData | ((prev: ResumeData) => ResumeData)) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  addProject: () => void;
  removeProject: (id: string) => void;
  loadSampleData: () => void;
};

const ResumeContext = createContext<ResumeContextValue | null>(null);

const SAMPLE_DATA: ResumeData = {
  personal: {
    name: "Alex Chen",
    email: "alex.chen@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  },
  summary:
    "Software engineer with 5+ years building scalable web applications. Focus on clean architecture and user experience.",
  education: [
    {
      id: "ed-1",
      institution: "State University",
      degree: "B.S. Computer Science",
      period: "2015 – 2019",
      details: "Relevant coursework: Algorithms, Distributed Systems.",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Tech Corp",
      role: "Senior Software Engineer",
      period: "2021 – Present",
      details:
        "Lead development of customer dashboard. Improved performance by 40%.",
    },
    {
      id: "exp-2",
      company: "Startup Inc",
      role: "Software Engineer",
      period: "2019 – 2021",
      details: "Built APIs and internal tools. Collaborated with design and product.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Open Source CLI Tool",
      period: "2023",
      details: "TypeScript CLI with 2k+ weekly downloads. Maintained docs and issues.",
    },
  ],
  skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
  links: {
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
  },
};

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(defaultResumeData);

  const addEducation = useCallback(() => {
    setData((prev) => ({
      ...prev,
      education: [...prev.education, createEducationEntry()],
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  }, []);

  const addExperience = useCallback(() => {
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, createExperienceEntry()],
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  }, []);

  const addProject = useCallback(() => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, createProjectEntry()],
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  }, []);

  const loadSampleData = useCallback(() => {
    setData(JSON.parse(JSON.stringify(SAMPLE_DATA)));
  }, []);

  const value = useMemo<ResumeContextValue>(
    () => ({
      data,
      setData,
      addEducation,
      removeEducation,
      addExperience,
      removeExperience,
      addProject,
      removeProject,
      loadSampleData,
    }),
    [
      data,
      addEducation,
      removeEducation,
      addExperience,
      removeExperience,
      addProject,
      removeProject,
      loadSampleData,
    ]
  );

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
}
