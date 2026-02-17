"use client";

import { useState, KeyboardEvent } from "react";
import { useResume } from "@/context/ResumeContext";

export function ProjectsAccordion() {
  const { data, setData, addProject, removeProject } = useResume();
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddTechStack = (projectId: string, value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const project = data.projects.find((p) => p.id === projectId);
    if (!project) return;

    const currentStack = project.techStack || [];
    if (currentStack.includes(trimmed)) return;

    setData((d) => ({
      ...d,
      projects: d.projects.map((p) =>
        p.id === projectId ? { ...p, techStack: [...currentStack, trimmed] } : p
      ),
    }));

    setInputValues((prev) => ({ ...prev, [projectId]: "" }));
  };

  const handleRemoveTech = (projectId: string, tech: string) => {
    setData((d) => ({
      ...d,
      projects: d.projects.map((p) =>
        p.id === projectId
          ? { ...p, techStack: (p.techStack || []).filter((t) => t !== tech) }
          : p
      ),
    }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, projectId: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTechStack(projectId, inputValues[projectId] || "");
    }
  };

  return (
    <section className="rounded-xl border border-[#2b2118] bg-[#f7f6f3] p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-tight font-serif text-[#2b2118]">
          Projects
        </h2>
        <button
          type="button"
          onClick={addProject}
          className="text-xs font-medium text-[#8b0000] hover:underline"
        >
          + Add Project
        </button>
      </div>

      <div className="space-y-3">
        {data.projects.map((project) => {
          const isExpanded = expandedProjects.has(project.id);
          const description = project.description || "";
          const charCount = description.length;
          const maxChars = 200;

          return (
            <div
              key={project.id}
              className="rounded-lg border border-[#2b2118]/40 bg-white overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleProject(project.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#f7f6f3] transition"
              >
                <span className="text-sm font-medium text-[#2b2118]">
                  {project.name || "Untitled Project"}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6e6256]">
                    {isExpanded ? "−" : "+"}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProject(project.id);
                    }}
                    className="text-xs text-[#6e6256] hover:text-[#8b0000]"
                  >
                    Delete
                  </button>
                </div>
              </button>

              {isExpanded && (
                <div className="px-3 pb-3 space-y-3 border-t border-[#2b2118]/20">
                  <div>
                    <label className="block text-xs font-medium text-[#2b2118] mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-[#2b2118] bg-[#f7f6f3] px-3 py-2 text-sm text-[#2b2118] outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/30"
                      value={project.name}
                      onChange={(e) =>
                        setData((d) => ({
                          ...d,
                          projects: d.projects.map((p) =>
                            p.id === project.id ? { ...p, name: e.target.value } : p
                          ),
                        }))
                      }
                      placeholder="Project name"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-[#2b2118]">
                        Description
                      </label>
                      <span className={`text-[10px] ${charCount > maxChars ? "text-[#8b0000]" : "text-[#6e6256]"}`}>
                        {charCount}/{maxChars}
                      </span>
                    </div>
                    <textarea
                      className="w-full rounded-lg border border-[#2b2118] bg-[#f7f6f3] px-3 py-2 text-sm text-[#2b2118] outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/30 resize-y min-h-[80px]"
                      value={description}
                      onChange={(e) => {
                        const value = e.target.value.slice(0, maxChars);
                        setData((d) => ({
                          ...d,
                          projects: d.projects.map((p) =>
                            p.id === project.id ? { ...p, description: value } : p
                          ),
                        }));
                      }}
                      placeholder="Brief project description..."
                      maxLength={maxChars}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2b2118] mb-1">
                      Tech Stack
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(project.techStack || []).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#2b2118] bg-white px-2.5 py-1 text-xs text-[#2b2118]"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => handleRemoveTech(project.id, tech)}
                            className="hover:text-[#8b0000] transition"
                            aria-label={`Remove ${tech}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-[#2b2118] bg-[#f7f6f3] px-3 py-2 text-sm text-[#2b2118] outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/30"
                      value={inputValues[project.id] || ""}
                      onChange={(e) =>
                        setInputValues((prev) => ({ ...prev, [project.id]: e.target.value }))
                      }
                      onKeyDown={(e) => handleKeyDown(e, project.id)}
                      placeholder="Add technology (press Enter)..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#2b2118] mb-1">
                        Live URL (optional)
                      </label>
                      <input
                        type="url"
                        className="w-full rounded-lg border border-[#2b2118] bg-[#f7f6f3] px-3 py-2 text-sm text-[#2b2118] outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/30"
                        value={project.liveUrl || ""}
                        onChange={(e) =>
                          setData((d) => ({
                            ...d,
                            projects: d.projects.map((p) =>
                              p.id === project.id ? { ...p, liveUrl: e.target.value } : p
                            ),
                          }))
                        }
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#2b2118] mb-1">
                        GitHub URL (optional)
                      </label>
                      <input
                        type="url"
                        className="w-full rounded-lg border border-[#2b2118] bg-[#f7f6f3] px-3 py-2 text-sm text-[#2b2118] outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/30"
                        value={project.githubUrl || ""}
                        onChange={(e) =>
                          setData((d) => ({
                            ...d,
                            projects: d.projects.map((p) =>
                              p.id === project.id ? { ...p, githubUrl: e.target.value } : p
                            ),
                          }))
                        }
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
