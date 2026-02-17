"use client";

import { useResume } from "@/context/ResumeContext";
import { ResumeLivePreview } from "@/components/ResumeLivePreview";
import { ATSScoreWithImprovements } from "@/components/ATSScore";
import { TemplateSelector } from "@/components/TemplateSelector";
import { BulletGuidance } from "@/components/BulletGuidance";

const inputClass =
  "w-full rounded-lg border border-[#2b2118] bg-[#f7f6f3] px-3 py-2 text-sm text-[#2b2118] outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/30";
const labelClass = "block text-xs font-medium text-[#2b2118] mb-1";
const sectionTitleClass = "text-sm font-semibold tracking-tight font-serif text-[#2b2118] mb-3";

export default function BuilderPage() {
  const { data, setData, addEducation, removeEducation, addExperience, removeExperience, addProject, removeProject, loadSampleData } = useResume();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold tracking-tight font-serif text-[#2b2118]">
          Builder
        </h1>
        <button
          type="button"
          onClick={loadSampleData}
          className="rounded-lg border border-[#2b2118] bg-transparent px-4 py-2 text-sm font-medium text-[#2b2118] hover:bg-[#8b0000]/5 transition"
        >
          Load Sample Data
        </button>
      </div>

      <TemplateSelector />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Form */}
        <div className="space-y-8">
          {/* Personal Info */}
          <section className="rounded-xl border border-[#2b2118] bg-[#f7f6f3] p-4">
            <h2 className={sectionTitleClass}>Personal Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className={labelClass}>Name</label>
                <input
                  type="text"
                  className={inputClass}
                  value={data.personal.name}
                  onChange={(e) => setData((d) => ({ ...d, personal: { ...d.personal, name: e.target.value } }))}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  className={inputClass}
                  value={data.personal.email}
                  onChange={(e) => setData((d) => ({ ...d, personal: { ...d.personal, email: e.target.value } }))}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  className={inputClass}
                  value={data.personal.phone}
                  onChange={(e) => setData((d) => ({ ...d, personal: { ...d.personal, phone: e.target.value } }))}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  className={inputClass}
                  value={data.personal.location}
                  onChange={(e) => setData((d) => ({ ...d, personal: { ...d.personal, location: e.target.value } }))}
                  placeholder="City, State / Country"
                />
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="rounded-xl border border-[#2b2118] bg-[#f7f6f3] p-4">
            <h2 className={sectionTitleClass}>Summary</h2>
            <label className={labelClass}>Professional summary</label>
            <textarea
              className={`${inputClass} min-h-[100px] resize-y`}
              value={data.summary}
              onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))}
              placeholder="Brief summary of your background and goals..."
            />
          </section>

          {/* Education */}
          <section className="rounded-xl border border-[#2b2118] bg-[#f7f6f3] p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className={sectionTitleClass + " mb-0"}>Education</h2>
              <button
                type="button"
                onClick={addEducation}
                className="text-xs font-medium text-[#8b0000] hover:underline"
              >
                + Add entry
              </button>
            </div>
            <div className="space-y-4">
              {data.education.map((e) => (
                <div key={e.id} className="rounded-lg border border-[#2b2118]/40 bg-white p-3 space-y-2">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeEducation(e.id)}
                      className="text-xs text-[#6e6256] hover:text-[#8b0000]"
                    >
                      Remove
                    </button>
                  </div>
                  <div>
                    <label className={labelClass}>Institution</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={e.institution}
                      onChange={(ev) => setData((d) => ({
                        ...d,
                        education: d.education.map((x) => x.id === e.id ? { ...x, institution: ev.target.value } : x),
                      }))}
                      placeholder="University name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={labelClass}>Degree</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={e.degree}
                        onChange={(ev) => setData((d) => ({
                          ...d,
                          education: d.education.map((x) => x.id === e.id ? { ...x, degree: ev.target.value } : x),
                        }))}
                        placeholder="B.S. Computer Science"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Period</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={e.period}
                        onChange={(ev) => setData((d) => ({
                          ...d,
                          education: d.education.map((x) => x.id === e.id ? { ...x, period: ev.target.value } : x),
                        }))}
                        placeholder="2018 – 2022"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Details (optional)</label>
                    <textarea
                      className={`${inputClass} min-h-[60px] resize-y`}
                      value={e.details ?? ""}
                      onChange={(ev) => setData((d) => ({
                        ...d,
                        education: d.education.map((x) => x.id === e.id ? { ...x, details: ev.target.value } : x),
                      }))}
                      placeholder="Relevant coursework, honors..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="rounded-xl border border-[#2b2118] bg-[#f7f6f3] p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className={sectionTitleClass + " mb-0"}>Experience</h2>
              <button
                type="button"
                onClick={addExperience}
                className="text-xs font-medium text-[#8b0000] hover:underline"
              >
                + Add entry
              </button>
            </div>
            <div className="space-y-4">
              {data.experience.map((e) => (
                <div key={e.id} className="rounded-lg border border-[#2b2118]/40 bg-white p-3 space-y-2">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeExperience(e.id)}
                      className="text-xs text-[#6e6256] hover:text-[#8b0000]"
                    >
                      Remove
                    </button>
                  </div>
                  <div>
                    <label className={labelClass}>Company</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={e.company}
                      onChange={(ev) => setData((d) => ({
                        ...d,
                        experience: d.experience.map((x) => x.id === e.id ? { ...x, company: ev.target.value } : x),
                      }))}
                      placeholder="Company name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={labelClass}>Role</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={e.role}
                        onChange={(ev) => setData((d) => ({
                          ...d,
                          experience: d.experience.map((x) => x.id === e.id ? { ...x, role: ev.target.value } : x),
                        }))}
                        placeholder="Job title"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Period</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={e.period}
                        onChange={(ev) => setData((d) => ({
                          ...d,
                          experience: d.experience.map((x) => x.id === e.id ? { ...x, period: ev.target.value } : x),
                        }))}
                        placeholder="2020 – Present"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Details (optional)</label>
                    <textarea
                      className={`${inputClass} min-h-[60px] resize-y`}
                      value={e.details ?? ""}
                      onChange={(ev) => setData((d) => ({
                        ...d,
                        experience: d.experience.map((x) => x.id === e.id ? { ...x, details: ev.target.value } : x),
                      }))}
                      placeholder="Key responsibilities, achievements..."
                    />
                    <BulletGuidance text={e.details ?? ""} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="rounded-xl border border-[#2b2118] bg-[#f7f6f3] p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className={sectionTitleClass + " mb-0"}>Projects</h2>
              <button
                type="button"
                onClick={addProject}
                className="text-xs font-medium text-[#8b0000] hover:underline"
              >
                + Add entry
              </button>
            </div>
            <div className="space-y-4">
              {data.projects.map((p) => (
                <div key={p.id} className="rounded-lg border border-[#2b2118]/40 bg-white p-3 space-y-2">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeProject(p.id)}
                      className="text-xs text-[#6e6256] hover:text-[#8b0000]"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={labelClass}>Project name</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={p.name}
                        onChange={(ev) => setData((d) => ({
                          ...d,
                          projects: d.projects.map((x) => x.id === p.id ? { ...x, name: ev.target.value } : x),
                        }))}
                        placeholder="Project name"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Period</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={p.period}
                        onChange={(ev) => setData((d) => ({
                          ...d,
                          projects: d.projects.map((x) => x.id === p.id ? { ...x, period: ev.target.value } : x),
                        }))}
                        placeholder="2023"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Details (optional)</label>
                    <textarea
                      className={`${inputClass} min-h-[60px] resize-y`}
                      value={p.details ?? ""}
                      onChange={(ev) => setData((d) => ({
                        ...d,
                        projects: d.projects.map((x) => x.id === p.id ? { ...x, details: ev.target.value } : x),
                      }))}
                      placeholder="Tech stack, impact..."
                    />
                    <BulletGuidance text={p.details ?? ""} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="rounded-xl border border-[#2b2118] bg-[#f7f6f3] p-4">
            <h2 className={sectionTitleClass}>Skills</h2>
            <label className={labelClass}>Comma-separated</label>
            <input
              type="text"
              className={inputClass}
              value={data.skills.join(", ")}
              onChange={(e) => setData((d) => ({
                ...d,
                skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              }))}
              placeholder="TypeScript, React, Node.js, ..."
            />
          </section>

          {/* Links */}
          <section className="rounded-xl border border-[#2b2118] bg-[#f7f6f3] p-4">
            <h2 className={sectionTitleClass}>Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>GitHub</label>
                <input
                  type="url"
                  className={inputClass}
                  value={data.links.github}
                  onChange={(e) => setData((d) => ({ ...d, links: { ...d.links, github: e.target.value } }))}
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className={labelClass}>LinkedIn</label>
                <input
                  type="url"
                  className={inputClass}
                  value={data.links.linkedin}
                  onChange={(e) => setData((d) => ({ ...d, links: { ...d.links, linkedin: e.target.value } }))}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right: ATS Score + Live preview */}
        <div className="lg:sticky lg:top-6 lg:self-start space-y-6">
          <ATSScoreWithImprovements />
          <div>
            <p className="text-xs text-[#6e6256] mb-2">Live preview</p>
            <ResumeLivePreview />
          </div>
        </div>
      </div>
    </div>
  );
}
