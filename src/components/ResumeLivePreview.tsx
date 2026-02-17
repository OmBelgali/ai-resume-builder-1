"use client";

import { useResume } from "@/context/ResumeContext";

/** Structured resume layout shell for builder right panel — live-updating placeholder. */
export function ResumeLivePreview() {
  const { data } = useResume();
  const { personal, summary, education, experience, projects, skills, links } = data;

  return (
    <div className="h-full min-h-[640px] rounded-xl border border-[#2b2118] bg-white p-6 shadow-sm">
      <div className="resume-preview text-black space-y-5">
        {/* Header */}
        <header className="border-b border-black/20 pb-3">
          <h1 className="text-xl font-semibold tracking-tight font-serif">
            {personal.name || "Your Name"}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-0 text-xs text-black/70 mt-1">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
          {(links.github || links.linkedin) && (
            <div className="flex gap-3 mt-2 text-xs">
              {links.github && <span>GitHub</span>}
              {links.linkedin && <span>LinkedIn</span>}
            </div>
          )}
        </header>

        {summary && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-black/80 mb-1">
              Summary
            </h2>
            <p className="text-sm text-black/90 leading-relaxed">{summary}</p>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-black/80 mb-2">
              Education
            </h2>
            <ul className="space-y-2">
              {education.map((e) => (
                <li key={e.id} className="text-sm">
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
            <h2 className="text-xs font-semibold uppercase tracking-widest text-black/80 mb-2">
              Experience
            </h2>
            <ul className="space-y-2">
              {experience.map((e) => (
                <li key={e.id} className="text-sm">
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
            <h2 className="text-xs font-semibold uppercase tracking-widest text-black/80 mb-2">
              Projects
            </h2>
            <ul className="space-y-2">
              {projects.map((p) => (
                <li key={p.id} className="text-sm">
                  <span className="font-medium">{p.name || "—"}</span>
                  {p.period && ` · ${p.period}`}
                  {p.details && <p className="text-black/70 mt-0.5">{p.details}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-black/80 mb-1">
              Skills
            </h2>
            <p className="text-sm text-black/90">{skills.join(", ")}</p>
          </section>
        )}

        {!personal.name && !summary && education.length === 0 && experience.length === 0 && projects.length === 0 && skills.length === 0 && (
          <div className="flex items-center justify-center py-12 text-black/40 text-sm">
            Resume preview — fill the form to see content here
          </div>
        )}
      </div>
    </div>
  );
}
