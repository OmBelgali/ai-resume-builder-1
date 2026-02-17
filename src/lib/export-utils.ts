import type { ResumeData } from "./resume-types";

/**
 * Generate clean plain-text version of resume.
 */
export function generatePlainText(data: ResumeData): string {
  const lines: string[] = [];

  // Name
  if (data.personal.name) {
    lines.push(data.personal.name);
    lines.push("");
  }

  // Contact
  const contact: string[] = [];
  if (data.personal.email) contact.push(data.personal.email);
  if (data.personal.phone) contact.push(data.personal.phone);
  if (data.personal.location) contact.push(data.personal.location);
  if (contact.length > 0) {
    lines.push(contact.join(" | "));
    lines.push("");
  }

  // Links
  const linkLines: string[] = [];
  if (data.links.github) linkLines.push(`GitHub: ${data.links.github}`);
  if (data.links.linkedin) linkLines.push(`LinkedIn: ${data.links.linkedin}`);
  if (linkLines.length > 0) {
    lines.push(linkLines.join(" | "));
    lines.push("");
  }

  // Summary
  if (data.summary) {
    lines.push("SUMMARY");
    lines.push("─".repeat(50));
    lines.push(data.summary);
    lines.push("");
  }

  // Education
  if (data.education.length > 0) {
    lines.push("EDUCATION");
    lines.push("─".repeat(50));
    data.education.forEach((edu) => {
      const eduParts: string[] = [];
      if (edu.institution) eduParts.push(edu.institution);
      if (edu.degree) eduParts.push(edu.degree);
      if (edu.period) eduParts.push(edu.period);
      if (eduParts.length > 0) {
        lines.push(eduParts.join(" · "));
      }
      if (edu.details) {
        lines.push(`  ${edu.details}`);
      }
      lines.push("");
    });
  }

  // Experience
  if (data.experience.length > 0) {
    lines.push("EXPERIENCE");
    lines.push("─".repeat(50));
    data.experience.forEach((exp) => {
      const expParts: string[] = [];
      if (exp.company) expParts.push(exp.company);
      if (exp.role) expParts.push(exp.role);
      if (exp.period) expParts.push(exp.period);
      if (expParts.length > 0) {
        lines.push(expParts.join(" · "));
      }
      if (exp.details) {
        lines.push(`  ${exp.details}`);
      }
      lines.push("");
    });
  }

  // Projects
  if (data.projects.length > 0) {
    lines.push("PROJECTS");
    lines.push("─".repeat(50));
    data.projects.forEach((proj) => {
      const projParts: string[] = [];
      if (proj.name) projParts.push(proj.name);
      if (proj.period) projParts.push(proj.period);
      if (projParts.length > 0) {
        lines.push(projParts.join(" · "));
      }
      if (proj.details) {
        lines.push(`  ${proj.details}`);
      }
      lines.push("");
    });
  }

  // Skills
  if (data.skills.length > 0) {
    lines.push("SKILLS");
    lines.push("─".repeat(50));
    lines.push(data.skills.join(", "));
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Validate resume completeness.
 */
export function validateResume(data: ResumeData): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  if (!data.personal.name || data.personal.name.trim() === "") {
    warnings.push("Name is missing.");
  }

  if (data.projects.length === 0 && data.experience.length === 0) {
    warnings.push("At least one project or experience entry is recommended.");
  }

  return {
    isValid: warnings.length === 0,
    warnings,
  };
}
