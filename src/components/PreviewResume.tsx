"use client";

import { useResume } from "@/context/ResumeContext";
import { useTemplate } from "@/context/TemplateContext";
import { useColorTheme } from "@/context/ColorThemeContext";
import { templateStyles } from "@/lib/template-types";

/** Premium B&W resume layout for /preview — clean typography, no colors. */
export function PreviewResume() {
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
      <article className="resume-container mx-auto max-w-[210mm] bg-white text-black shadow-lg overflow-hidden">
        <div className="flex">
          {/* Left Sidebar */}
          <div
            className="w-1/3 p-6 text-white"
            style={{ backgroundColor: colorValue }}
          >
            <div className="space-y-6">
              <header>
                <h1 className={`${styles.headerFontSize} ${styles.headerFontFamily} font-semibold tracking-tight ${styles.headerSpacing}`}>
                  {personal.name || "Your Name"}
                </h1>
                <div className="flex flex-col gap-1 text-sm mt-2">
                  {personal.email && <span>{personal.email}</span>}
                  {personal.phone && <span>{personal.phone}</span>}
                  {personal.location && <span>{personal.location}</span>}
                </div>
                {(links.github || links.linkedin) && (
                  <div className="flex flex-col gap-1 mt-2 text-sm">
                    {links.github && (
                      <a href={links.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                        GitHub
                      </a>
                    )}
                    {links.linkedin && (
                      <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                        LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </header>

              {allSkills.length > 0 && (
                <section>
                  <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} mb-3`}>
                    Skills
                  </h2>
                  <div className="space-y-3">
                    {skillsCategorized.technical.length > 0 && (
                      <div>
                        <h3 className="text-xs font-medium mb-1">Technical</h3>
                        <div className="flex flex-wrap gap-1">
                          {skillsCategorized.technical.map((skill) => (
                            <span key={skill} className="text-xs bg-white/20 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {skillsCategorized.soft.length > 0 && (
                      <div>
                        <h3 className="text-xs font-medium mb-1">Soft</h3>
                        <div className="flex flex-wrap gap-1">
                          {skillsCategorized.soft.map((skill) => (
                            <span key={skill} className="text-xs bg-white/20 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {skillsCategorized.tools.length > 0 && (
                      <div>
                        <h3 className="text-xs font-medium mb-1">Tools</h3>
                        <div className="flex flex-wrap gap-1">
                          {skillsCategorized.tools.map((skill) => (
                            <span key={skill} className="text-xs bg-white/20 px-2 py-1 rounded">
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
                <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} mb-2`} style={{ color: colorValue }}>
                  Summary
                </h2>
                <p className={`${styles.bodyFontSize} ${styles.bodyFontFamily} ${styles.lineHeight} text-black/90`}>{summary}</p>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-3`} style={{ color: colorValue }}>
                  Education
                </h2>
                <ul className="space-y-3">
                  {education.map((e) => (
                    <li key={e.id}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className={`font-medium text-black ${styles.bodyFontSize} ${styles.bodyFontFamily}`}>{e.institution || "—"}</span>
                        {e.period && <span className={`${styles.bodyFontSize} text-black/70`}>{e.period}</span>}
                      </div>
                      {e.degree && <p className={`${styles.bodyFontSize} text-black/80 mt-0.5`}>{e.degree}</p>}
                      {e.details && <p className={`${styles.bodyFontSize} text-black/70 mt-1`}>{e.details}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {experience.length > 0 && (
              <section>
                <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-3`} style={{ color: colorValue }}>
                  Experience
                </h2>
                <ul className="space-y-3">
                  {experience.map((e) => (
                    <li key={e.id}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className={`font-medium text-black ${styles.bodyFontSize} ${styles.bodyFontFamily}`}>{e.company || "—"}</span>
                        {e.period && <span className={`${styles.bodyFontSize} text-black/70`}>{e.period}</span>}
                      </div>
                      {e.role && <p className={`${styles.bodyFontSize} text-black/80 mt-0.5`}>{e.role}</p>}
                      {e.details && <p className={`${styles.bodyFontSize} text-black/70 mt-1`}>{e.details}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-3`} style={{ color: colorValue }}>
                  Projects
                </h2>
                <div className="space-y-3">
                  {projects.map((p) => (
                    <div key={p.id} className="rounded border border-black/10 bg-white p-3">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`font-medium text-black ${styles.bodyFontSize} ${styles.bodyFontFamily}`}>
                          {p.name || "Untitled Project"}
                        </h3>
                        <div className="flex gap-2">
                          {p.liveUrl && (
                            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black">
                              🔗
                            </a>
                          )}
                          {p.githubUrl && (
                            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black">
                              ⭐
                            </a>
                          )}
                        </div>
                      </div>
                      {p.description && <p className={`${styles.bodyFontSize} ${styles.bodyFontFamily} text-black/80 mb-1`}>{p.description}</p>}
                      {p.techStack && p.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {p.techStack.map((tech) => (
                            <span key={tech} className="text-[10px] border border-black/20 px-1.5 py-0.5 rounded">
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
      </article>
    );
  }

  // Classic and Minimal: single-column layout
  return (
    <article className={`resume-container mx-auto max-w-[210mm] bg-white text-black ${styles.padding} shadow-lg`}>
      <div className={styles.sectionSpacing}>
        {/* Header */}
        <header className={`${styles.borderStyle} pb-4`}>
          <h1 className={`${styles.headerFontSize} ${styles.headerFontFamily} font-semibold tracking-tight text-black ${styles.headerSpacing}`} style={template === "classic" ? { color: colorValue } : {}}>
            {personal.name || "Your Name"}
          </h1>
          <div className="flex flex-wrap gap-x-5 gap-y-0 mt-2 text-sm text-black/70">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
          {(links.github || links.linkedin) && (
            <div className="flex gap-4 mt-2 text-sm text-black/70">
              {links.github && (
                <a href={links.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  GitHub
                </a>
              )}
              {links.linkedin && (
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </header>

        {summary && (
          <section>
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-2`} style={template === "classic" ? { color: colorValue } : {}}>
              Summary
            </h2>
            <p className={`${styles.bodyFontSize} ${styles.bodyFontFamily} ${styles.lineHeight} text-black/90`}>{summary}</p>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-3`} style={template === "classic" ? { color: colorValue } : {}}>
              Education
            </h2>
            <ul className="space-y-3">
              {education.map((e) => (
                <li key={e.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className={`font-medium text-black ${styles.bodyFontSize} ${styles.bodyFontFamily}`}>{e.institution || "—"}</span>
                    {e.period && <span className={`${styles.bodyFontSize} ${styles.bodyFontFamily} text-black/70`}>{e.period}</span>}
                  </div>
                  {e.degree && <p className={`${styles.bodyFontSize} ${styles.bodyFontFamily} text-black/80 mt-0.5`}>{e.degree}</p>}
                  {e.details && <p className={`${styles.bodyFontSize} ${styles.bodyFontFamily} text-black/70 mt-1`}>{e.details}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-3`} style={template === "classic" ? { color: colorValue } : {}}>
              Experience
            </h2>
            <ul className="space-y-3">
              {experience.map((e) => (
                <li key={e.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className={`font-medium text-black ${styles.bodyFontSize} ${styles.bodyFontFamily}`}>{e.company || "—"}</span>
                    {e.period && <span className={`${styles.bodyFontSize} ${styles.bodyFontFamily} text-black/70`}>{e.period}</span>}
                  </div>
                  {e.role && <p className={`${styles.bodyFontSize} ${styles.bodyFontFamily} text-black/80 mt-0.5`}>{e.role}</p>}
                  {e.details && <p className={`${styles.bodyFontSize} ${styles.bodyFontFamily} text-black/70 mt-1`}>{e.details}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-3`} style={template === "classic" ? { color: colorValue } : {}}>
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="rounded border border-black/10 bg-white p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-medium text-black ${styles.bodyFontSize}`}>
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
                    <p className={`text-black/80 mb-2 ${styles.bodyFontSize}`}>{p.description}</p>
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
              <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-2`} style={template === "classic" ? { color: colorValue } : {}}>
                Skills
              </h2>
              {skillsCategorized &&
              (skillsCategorized.technical.length > 0 ||
                skillsCategorized.soft.length > 0 ||
                skillsCategorized.tools.length > 0) ? (
                <div className="space-y-3">
                  {skillsCategorized.technical.length > 0 && (
                    <div>
                      <h3 className={`text-[10px] font-medium text-black/70 mb-1.5 ${styles.bodyFontSize} ${styles.bodyFontFamily}`}>
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
                  <p className={`${styles.bodyFontSize} ${styles.bodyFontFamily} text-black/90`}>{skills.join(" · ")}</p>
                )}
              </section>
            );
          })()}

        {(links.github || links.linkedin) && (
          <section>
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-2`} style={template === "classic" ? { color: colorValue } : {}}>
              Links
            </h2>
            <div className={`flex gap-4 ${styles.bodyFontSize} ${styles.bodyFontFamily} text-black/90`}>
              {links.github && (
                <a href={links.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  GitHub
                </a>
              )}
              {links.linkedin && (
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  LinkedIn
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
