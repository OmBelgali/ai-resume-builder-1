"use client";

import { useResume } from "@/context/ResumeContext";
import { useMemo } from "react";

export function ImprovementPanel() {
  const { data } = useResume();
  const improvements = useMemo(() => {
    const items: string[] = [];

    // Check projects
    if (data.projects.length < 2) {
      items.push("Add at least 2 projects to showcase your work.");
    }

    // Check for numbers in experience/projects
    const hasNumbers = (text: string): boolean => /\d+[%kmbKMB]?/.test(text);
    let hasMeasurableImpact = false;
    for (const exp of data.experience) {
      if (exp.details && hasNumbers(exp.details)) {
        hasMeasurableImpact = true;
        break;
      }
    }
    if (!hasMeasurableImpact) {
      for (const proj of data.projects) {
        if (proj.details && hasNumbers(proj.details)) {
          hasMeasurableImpact = true;
          break;
        }
      }
    }
    if (!hasMeasurableImpact && (data.experience.length > 0 || data.projects.length > 0)) {
      items.push("Add measurable impact (numbers) in experience/project bullets.");
    }

    // Check summary length
    const summaryWords = data.summary.trim().split(/\s+/).filter(Boolean).length;
    if (summaryWords > 0 && summaryWords < 40) {
      items.push("Expand your summary to 40–120 words for better impact.");
    }

    // Check skills
    if (data.skills.length > 0 && data.skills.length < 8) {
      items.push(`Add more skills (target 8+, currently ${data.skills.length}).`);
    }

    // Check experience
    if (data.experience.length === 0 && data.projects.length > 0) {
      items.push("Consider adding internship or project work as experience.");
    }

    return items.slice(0, 3);
  }, [data]);

  if (improvements.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-[#2b2118] bg-[#f7f6f3] p-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[#2b2118] mb-3">
        Top 3 Improvements
      </h3>
      <ul className="space-y-2">
        {improvements.map((improvement, idx) => (
          <li key={idx} className="text-xs text-[#6e6256] flex items-start gap-2">
            <span className="text-[#8b0000] mt-0.5">•</span>
            <span>{improvement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
