"use client";

import { useState, KeyboardEvent } from "react";
import { useResume } from "@/context/ResumeContext";

type SkillCategory = "technical" | "soft" | "tools";

const categoryLabels: Record<SkillCategory, string> = {
  technical: "Technical Skills",
  soft: "Soft Skills",
  tools: "Tools & Technologies",
};

const SUGGESTED_SKILLS: Record<SkillCategory, string[]> = {
  technical: ["TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"],
  soft: ["Team Leadership", "Problem Solving"],
  tools: ["Git", "Docker", "AWS"],
};

export function SkillsAccordion() {
  const { data, setData } = useResume();
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState<Record<SkillCategory, string>>({
    technical: "",
    soft: "",
    tools: "",
  });

  const skillsCategorized = data.skillsCategorized || {
    technical: [],
    soft: [],
    tools: [],
  };

  const handleAddSkill = (category: SkillCategory, value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const currentSkills = skillsCategorized[category] || [];
    if (currentSkills.includes(trimmed)) return;

    setData((d) => ({
      ...d,
      skillsCategorized: {
        ...(d.skillsCategorized || { technical: [], soft: [], tools: [] }),
        [category]: [...currentSkills, trimmed],
      },
    }));

    setInputValues((prev) => ({ ...prev, [category]: "" }));
  };

  const handleRemoveSkill = (category: SkillCategory, skill: string) => {
    const currentSkills = skillsCategorized[category] || [];
    setData((d) => ({
      ...d,
      skillsCategorized: {
        ...(d.skillsCategorized || { technical: [], soft: [], tools: [] }),
        [category]: currentSkills.filter((s) => s !== skill),
      },
    }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, category: SkillCategory) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill(category, inputValues[category]);
    }
  };

  const handleSuggestSkills = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setData((d) => {
      const current = d.skillsCategorized || { technical: [], soft: [], tools: [] };
      return {
        ...d,
        skillsCategorized: {
          technical: [...new Set([...current.technical, ...SUGGESTED_SKILLS.technical])],
          soft: [...new Set([...current.soft, ...SUGGESTED_SKILLS.soft])],
          tools: [...new Set([...current.tools, ...SUGGESTED_SKILLS.tools])],
        },
      };
    });

    setLoading(false);
  };

  return (
    <section className="rounded-xl border border-[#2b2118] bg-[#f7f6f3] p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-tight font-serif text-[#2b2118]">
          Skills
        </h2>
        <button
          type="button"
          onClick={handleSuggestSkills}
          disabled={loading}
          className="text-xs font-medium text-[#8b0000] hover:underline disabled:opacity-50"
        >
          {loading ? "Loading..." : "✨ Suggest Skills"}
        </button>
      </div>

      <div className="space-y-4">
        {(Object.keys(categoryLabels) as SkillCategory[]).map((category) => {
          const skills = skillsCategorized[category] || [];
          const count = skills.length;

          return (
            <div key={category} className="space-y-2">
              <label className="block text-xs font-medium text-[#2b2118]">
                {categoryLabels[category]} {count > 0 && `(${count})`}
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#2b2118] bg-white px-2.5 py-1 text-xs text-[#2b2118]"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(category, skill)}
                      className="hover:text-[#8b0000] transition"
                      aria-label={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                className="w-full rounded-lg border border-[#2b2118] bg-[#f7f6f3] px-3 py-2 text-sm text-[#2b2118] outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/30"
                value={inputValues[category]}
                onChange={(e) =>
                  setInputValues((prev) => ({ ...prev, [category]: e.target.value }))
                }
                onKeyDown={(e) => handleKeyDown(e, category)}
                placeholder={`Add ${categoryLabels[category].toLowerCase()}...`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
