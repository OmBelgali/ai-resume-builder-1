"use client";

import { useResume } from "@/context/ResumeContext";
import { useTemplate } from "@/context/TemplateContext";
import { templateStyles } from "@/lib/template-types";

/** Premium B&W resume layout for /preview — clean typography, no colors. */
export function PreviewResume() {
  const { data } = useResume();
  const { template } = useTemplate();
  const { personal, summary, education, experience, projects, skills, links } = data;
  const styles = templateStyles[template];

  return (
    <article className={`mx-auto max-w-[210mm] bg-white text-black ${styles.padding} shadow-lg`}>
      <div className={styles.sectionSpacing}>
        {/* Header */}
        <header className={`${styles.borderStyle} pb-4`}>
          <h1 className={`${styles.headerFontSize} font-semibold tracking-tight font-serif text-black ${styles.headerSpacing}`}>
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
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-2`}>
              Summary
            </h2>
            <p className={`${styles.bodyFontSize} ${styles.lineHeight} text-black/90`}>{summary}</p>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-3`}>
              Education
            </h2>
            <ul className="space-y-3">
              {education.map((e) => (
                <li key={e.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-medium text-black">{e.institution || "—"}</span>
                    {e.period && <span className="text-sm text-black/70">{e.period}</span>}
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
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-3`}>
              Experience
            </h2>
            <ul className="space-y-3">
              {experience.map((e) => (
                <li key={e.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className={`font-medium text-black ${styles.bodyFontSize}`}>{e.company || "—"}</span>
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
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-3`}>
              Projects
            </h2>
            <ul className="space-y-3">
              {projects.map((p) => (
                <li key={p.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className={`font-medium text-black ${styles.bodyFontSize}`}>{p.name || "—"}</span>
                    {p.period && <span className={`${styles.bodyFontSize} text-black/70`}>{p.period}</span>}
                  </div>
                  {p.details && <p className={`${styles.bodyFontSize} text-black/70 mt-1`}>{p.details}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className={`${styles.sectionHeaderSize} ${styles.sectionHeaderWeight} uppercase ${styles.sectionHeaderTracking} text-black mb-2`}>
              Skills
            </h2>
            <p className={`${styles.bodyFontSize} text-black/90`}>{skills.join(" · ")}</p>
          </section>
        )}

        {(links.github || links.linkedin) && (
          <section>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black mb-2">
              Links
            </h2>
            <div className="flex gap-4 text-sm text-black/90">
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
