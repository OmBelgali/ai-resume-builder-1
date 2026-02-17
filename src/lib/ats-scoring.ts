import type { ResumeData } from "./resume-types";

export interface ATSScore {
  score: number;
  suggestions: string[];
  label: string;
  color: string;
}

/**
 * Calculate ATS Readiness Score (0-100) deterministically.
 * Score starts at 0, max 100.
 * 
 * Rules:
 * +10 if name provided
 * +10 if email provided
 * +10 if summary > 50 chars
 * +15 if at least 1 experience entry with bullets
 * +10 if at least 1 education entry
 * +10 if at least 5 skills added
 * +10 if at least 1 project added
 * +5 if phone provided
 * +5 if LinkedIn provided
 * +5 if GitHub provided
 * +10 if summary contains action verbs (built, led, designed, improved, etc.)
 */
export function calculateATSScore(data: ResumeData): ATSScore {
  let score = 0;
  const suggestions: string[] = [];

  // +10 if name provided
  if (data.personal.name.trim()) {
    score += 10;
  } else {
    suggestions.push("Add your name (+10 points)");
  }

  // +10 if email provided
  if (data.personal.email.trim()) {
    score += 10;
  } else {
    suggestions.push("Add your email (+10 points)");
  }

  // +10 if summary > 50 chars
  if (data.summary.trim().length > 50) {
    score += 10;
  } else {
    if (data.summary.trim().length === 0) {
      suggestions.push("Add a professional summary (+10 points)");
    } else {
      suggestions.push(`Expand your summary to >50 characters (+10 points)`);
    }
  }

  // +15 if at least 1 experience entry with bullets (details field)
  const hasExperienceWithBullets = data.experience.some(
    (exp) => exp.details && exp.details.trim().length > 0
  );
  if (hasExperienceWithBullets) {
    score += 15;
  } else {
    if (data.experience.length === 0) {
      suggestions.push("Add at least 1 experience entry with details (+15 points)");
    } else {
      suggestions.push("Add details/bullets to your experience entries (+15 points)");
    }
  }

  // +10 if at least 1 education entry
  if (data.education.length >= 1) {
    score += 10;
  } else {
    suggestions.push("Add at least 1 education entry (+10 points)");
  }

  // +10 if at least 5 skills added
  const totalSkills = data.skillsCategorized
    ? data.skillsCategorized.technical.length +
    data.skillsCategorized.soft.length +
    data.skillsCategorized.tools.length
    : data.skills.length;

  if (totalSkills >= 5) {
    score += 10;
  } else {
    suggestions.push(`Add at least 5 skills (currently ${totalSkills}) (+10 points)`);
  }

  // +10 if at least 1 project added
  if (data.projects.length >= 1) {
    score += 10;
  } else {
    suggestions.push("Add at least 1 project (+10 points)");
  }

  // +5 if phone provided
  if (data.personal.phone.trim()) {
    score += 5;
  } else {
    suggestions.push("Add your phone number (+5 points)");
  }

  // +5 if LinkedIn provided
  if (data.links.linkedin.trim()) {
    score += 5;
  } else {
    suggestions.push("Add your LinkedIn profile (+5 points)");
  }

  // +5 if GitHub provided
  if (data.links.github.trim()) {
    score += 5;
  } else {
    suggestions.push("Add your GitHub profile (+5 points)");
  }

  // +10 if summary contains action verbs
  const actionVerbs = [
    "built", "led", "designed", "improved", "developed", "created",
    "managed", "implemented", "achieved", "increased", "decreased",
    "reduced", "optimized", "launched", "delivered", "established",
    "coordinated", "executed", "streamlined", "enhanced", "drove"
  ];
  const summaryLower = data.summary.toLowerCase();
  const hasActionVerbs = actionVerbs.some(verb => summaryLower.includes(verb));

  if (hasActionVerbs) {
    score += 10;
  } else {
    if (data.summary.trim().length > 0) {
      suggestions.push("Use action verbs in your summary (built, led, designed, etc.) (+10 points)");
    }
  }

  // Cap at 100
  score = Math.min(score, 100);

  // Determine label and color based on score
  let label: string;
  let color: string;

  if (score >= 71) {
    label = "Strong Resume";
    color = "green";
  } else if (score >= 41) {
    label = "Getting There";
    color = "amber";
  } else {
    label = "Needs Work";
    color = "red";
  }

  return {
    score,
    suggestions: suggestions.slice(0, 5),
    label,
    color,
  };
}
