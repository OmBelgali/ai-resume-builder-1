"use client";

import { useResume } from "@/context/ResumeContext";
import { useTemplate } from "@/context/TemplateContext";
import { useColorTheme } from "@/context/ColorThemeContext";
import { templateStyles } from "@/lib/template-types";

/** Structured resume layout shell for builder right panel — live-updating placeholder. */
export function ResumeLivePreview() {
  const { data } = useResume();
  const { template } = useTemplate();
  const { colorValue } = useColorTheme();
  const { personal, summary, education, experience, projects, skills, links } = data;
  const styles = templateStyles[template];
  const skillsCategorized = data.skillsCategorized || {
    technical: [],
    soft: [],
    tools: [],
  };

  const allSkills = [
    ...skillsCategorized.technical,
    ...skillsCategorized.soft,
    ...skillsCategorized.tools,
  ];

  // Modern template: two-column layout
  if (styles.layout === "two-column") {
    return (
      <div className="h-full min-h-[640px] rounded-xl border border-[#2b2118] bg-white shadow-sm overflow-hidden">
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div
            className="w-1/3 p-4 text-white"
            style={{ backgroundColor: colorValue }}
          >
            <div className="space-y-4">
              <header>
                <h1 className={`${styles.headerFontSize} ${styles.headerFontFamily} font-semibold tracking-tight ${styles.headerSpacing}`}>
                  {personal.name || "Your Name"}
                </h1>
                <div className="flex flex-col gap-1 text-xs mt-2">
                  {personal.email && <span>{personal.email}</span>}
                  {personal.phone && <span>{personal.phone}</span>}
                  {personal.location && <span>{personal.location}</span>}
                </div>
                {(links.github || links.linkedin) && (
                  <div className="flex flex-col gap-1 mt-2 text-xs">
                    {links.github && (
                      <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        GitHub
                      </a>
                    )}
                    {links.linkedin && (
                      <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </header>

              {allSkills.length > 0 && (
                <section>
                  <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} mb-2`}>
                    Skills
                  </h2>
                  <div className="space-y-2">
                    {skillsCategorized.technical.length > 0 && (
                      <div>
                        <h3 className="text-[10px] font-medium mb-1">Technical</h3>
                        <div className="flex flex-wrap gap-1">
                          {skillsCategorized.technical.map((skill) => (
                            <span key={skill} className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {skillsCategorized.soft.length > 0 && (
                      <div>
                        <h3 className="text-[10px] font-medium mb-1">Soft</h3>
                        <div className="flex flex-wrap gap-1">
                          {skillsCategorized.soft.map((skill) => (
                            <span key={skill} className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {skillsCategorized.tools.length > 0 && (
                      <div>
                        <h3 className="text-[10px] font-medium mb-1">Tools</h3>
                        <div className="flex flex-wrap gap-1">
                          {skillsCategorized.tools.map((skill) => (
                            <span key={skill} className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Right Content */}
          <div className={`flex-1 ${styles.padding} text-black ${styles.sectionSpacing}`}>
            {summary && (
              <section>
                <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} mb-1`} style={{ color: colorValue }}>
                  Summary
                </h2>
                <p className={`${styles.bodyFontSize} ${styles.bodyFontFamily} text-black/90 ${styles.lineHeight}`}>{summary}</p>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} mb-2`} style={{ color: colorValue }}>
                  Education
                </h2>
                <ul className="space-y-2">
                  {education.map((e) => (
                    <li key={e.id} className={styles.bodyFontSize}>
                      <span className="font-medium">{e.institution || "—"}</span>
                      {e.degree && ` · ${e.degree}`}
                      {e.period && ` · ${e.period}`}
                      {e.details && <p className="text-black/70 mt-0.5">{e.details}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {experience.length > 0 && (
              <section>
                <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} mb-2`} style={{ color: colorValue }}>
                  Experience
                </h2>
                <ul className="space-y-2">
                  {experience.map((e) => (
                    <li key={e.id} className={styles.bodyFontSize}>
                      <span className="font-medium">{e.company || "—"}</span>
                      {e.role && ` · ${e.role}`}
                      {e.period && ` · ${e.period}`}
                      {e.details && <p className="text-black/70 mt-0.5">{e.details}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} mb-2`} style={{ color: colorValue }}>
                  Projects
                </h2>
                <div className="space-y-2">
                  {projects.map((p) => (
                    <div key={p.id} className="rounded border border-black/10 bg-white p-2">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`font-medium ${styles.bodyFontSize}`}>
                          {p.name || "Untitled Project"}
                        </h3>
                        <div className="flex gap-1">
                          {p.liveUrl && <span className="text-[10px]">🔗</span>}
                          {p.githubUrl && <span className="text-[10px]">⭐</span>}
                        </div>
                      </div>
                      {p.description && <p className={`text-black/80 mb-1 ${styles.bodyFontSize}`}>{p.description}</p>}
                      {p.techStack && p.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {p.techStack.map((tech) => (
                            <span key={tech} className="text-[9px] border border-black/20 px-1 py-0.5 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Classic and Minimal: single-column layout
  return (
    <div className={`h-full min-h-[640px] rounded-xl border border-[#2b2118] bg-white ${styles.padding} shadow-sm`}>
      <div className={`resume-preview text-black ${styles.sectionSpacing}`}>
        {/* Header */}
        <header className={`${styles.borderStyle} pb-3`}>
          <h1 className={`${styles.headerFontSize} ${styles.headerFontFamily} font-semibold tracking-tight ${styles.headerSpacing}`} style={template === "classic" ? { color: colorValue } : {}}>
            {personal.name || "Your Name"}
          </h1>
          <div className={`flex flex-wrap gap-x-4 gap-y-0 ${styles.bodyFontSize} text-black/70 mt-1`}>
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
          {(links.github || links.linkedin) && (
            <div className={`flex gap-3 mt-2 ${styles.bodyFontSize} text-black/70`}>
              {links.github && (
                <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub
                </a>
              )}
              {links.linkedin && (
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </header>

        {summary && (
          <section>
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} mb-1`} style={template === "classic" ? { color: colorValue } : { color: "rgba(0,0,0,0.8)" }}>
              Summary
            </h2>
            <p className={`${styles.bodyFontSize} ${styles.bodyFontFamily} text-black/90 ${styles.lineHeight}`}>{summary}</p>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} mb-2`} style={template === "classic" ? { color: colorValue } : { color: "rgba(0,0,0,0.8)" }}>
              Education
            </h2>
                <ul className="space-y-2">
                  {education.map((e) => (
                    <li key={e.id} className={`${styles.bodyFontSize} ${styles.bodyFontFamily}`}>
                      <span className="font-medium">{e.institution || "—"}</span>
                      {e.degree && ` · ${e.degree}`}
                      {e.period && ` · ${e.period}`}
                      {e.details && <p className={`text-black/70 mt-0.5 ${styles.bodyFontSize}`}>{e.details}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

        {experience.length > 0 && (
          <section>
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} mb-2`} style={template === "classic" ? { color: colorValue } : { color: "rgba(0,0,0,0.8)" }}>
              Experience
            </h2>
            <ul className="space-y-2">
              {experience.map((e) => (
                <li key={e.id} className={`${styles.bodyFontSize} ${styles.bodyFontFamily}`}>
                  <span className="font-medium">{e.company || "—"}</span>
                  {e.role && ` · ${e.role}`}
                  {e.period && ` · ${e.period}`}
                  {e.details && <p className={`text-black/70 mt-0.5 ${styles.bodyFontSize}`}>{e.details}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} mb-2`} style={template === "classic" ? { color: colorValue } : { color: "rgba(0,0,0,0.8)" }}>
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="rounded border border-black/10 bg-white p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-medium text-black ${styles.bodyFontSize} ${styles.bodyFontFamily}`}>
                      {p.name || "Untitled Project"}
                    </h3>
                    <div className="flex gap-2 flex-shrink-0">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black/60 hover:text-black"
                          aria-label="Live URL"
                        >
                          🔗
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black/60 hover:text-black"
                          aria-label="GitHub"
                        >
                          ⭐
                        </a>
                      )}
                    </div>
                  </div>
                  {p.description && (
                    <p className={`text-black/80 mb-2 ${styles.bodyFontSize} ${styles.bodyFontFamily}`}>{p.description}</p>
                  )}
                  {p.techStack && p.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block rounded border border-black/20 bg-black/5 px-2 py-0.5 text-[10px] text-black/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {(() => {
          const skillsCategorized = data.skillsCategorized;
          const hasSkills =
            skillsCategorized &&
            (skillsCategorized.technical.length > 0 ||
              skillsCategorized.soft.length > 0 ||
              skillsCategorized.tools.length > 0);

          if (!hasSkills && skills.length === 0) return null;

          return (
            <section>
              <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} mb-2`} style={template === "classic" ? { color: colorValue } : { color: "rgba(0,0,0,0.8)" }}>
                Skills
              </h2>
              {skillsCategorized &&
              (skillsCategorized.technical.length > 0 ||
                skillsCategorized.soft.length > 0 ||
                skillsCategorized.tools.length > 0) ? (
                <div className="space-y-3">
                  {skillsCategorized.technical.length > 0 && (
                    <div>
                      <h3 className={`text-[10px] font-medium text-black/70 mb-1.5 ${styles.bodyFontSize}`}>
                        Technical Skills
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {skillsCategorized.technical.map((skill) => (
                          <span
                            key={skill}
                            className="inline-block rounded-full border border-black/20 bg-black/5 px-2.5 py-1 text-[11px] text-black/90"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {skillsCategorized.soft.length > 0 && (
                    <div>
                      <h3 className={`text-[10px] font-medium text-black/70 mb-1.5 ${styles.bodyFontSize} ${styles.bodyFontFamily}`}>
                        Soft Skills
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {skillsCategorized.soft.map((skill) => (
                          <span
                            key={skill}
                            className="inline-block rounded-full border border-black/20 bg-black/5 px-2.5 py-1 text-[11px] text-black/90"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {skillsCategorized.tools.length > 0 && (
                    <div>
                      <h3 className={`text-[10px] font-medium text-black/70 mb-1.5 ${styles.bodyFontSize} ${styles.bodyFontFamily}`}>
                        Tools & Technologies
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {skillsCategorized.tools.map((skill) => (
                          <span
                            key={skill}
                            className="inline-block rounded-full border border-black/20 bg-black/5 px-2.5 py-1 text-[11px] text-black/90"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className={`${styles.bodyFontSize} ${styles.bodyFontFamily} text-black/90`}>{skills.join(", ")}</p>
              )}
            </section>
          );
        })()}

        {(links.github || links.linkedin) && (
          <section>
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} mb-1`} style={template === "classic" ? { color: colorValue } : { color: "rgba(0,0,0,0.8)" }}>
              Links
            </h2>
            <div className={`flex gap-3 ${styles.bodyFontSize} ${styles.bodyFontFamily} text-black/90`}>
              {links.github && (
                <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub
                </a>
              )}
              {links.linkedin && (
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn
                </a>
              )}
            </div>
          </section>
        )}

        {!personal.name &&
          !summary &&
          education.length === 0 &&
          experience.length === 0 &&
          projects.length === 0 &&
          skills.length === 0 &&
          !data.skillsCategorized?.technical.length &&
          !data.skillsCategorized?.soft.length &&
          !data.skillsCategorized?.tools.length &&
          !links.github &&
          !links.linkedin && (
            <div className="flex items-center justify-center py-12 text-black/40 text-sm">
              Resume preview — fill the form to see content here
            </div>
          )}
      </div>
    </div>
  );
}
