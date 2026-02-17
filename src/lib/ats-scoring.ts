import type { ResumeData } from "./resume-types";

export interface ATSScore {
  score: number;
  suggestions: string[];
}

/**
 * Calculate ATS Readiness Score (0-100) deterministically.
 * +15 if summary length is 40–120 words
 * +10 if at least 2 projects
 * +10 if at least 1 experience entry
 * +10 if skills list has ≥ 8 items
 * +10 if GitHub or LinkedIn link exists
 * +15 if any experience/project bullet contains a number (%, X, k, etc.)
 * +10 if education section has complete fields
 * Cap at 100.
 */
export function calculateATSScore(data: ResumeData): ATSScore {
  let score = 0;
  const suggestions: string[] = [];

  // Check summary length (40-120 words)
  const summaryWords = data.summary.trim().split(/\s+/).filter(Boolean).length;
  if (summaryWords >= 40 && summaryWords <= 120) {
    score += 15;
  } else {
    if (summaryWords === 0) {
      suggestions.push("Write a professional summary (40–120 words).");
    } else if (summaryWords < 40) {
      suggestions.push(`Expand your summary to 40–120 words (currently ${summaryWords} words).`);
    } else {
      suggestions.push(`Shorten your summary to 40–120 words (currently ${summaryWords} words).`);
    }
  }

  // Check projects (at least 2)
  if (data.projects.length >= 2) {
    score += 10;
  } else {
    if (data.projects.length === 0) {
      suggestions.push("Add at least 2 projects.");
    } else {
      suggestions.push("Add at least 2 projects (currently 1).");
    }
  }

  // Check experience (at least 1)
  if (data.experience.length >= 1) {
    score += 10;
  } else {
    suggestions.push("Add at least 1 experience entry.");
  }

  // Check skills (≥ 8 items) - check categorized first, fallback to flat array
  const totalSkills = data.skillsCategorized
    ? data.skillsCategorized.technical.length +
      data.skillsCategorized.soft.length +
      data.skillsCategorized.tools.length
    : data.skills.length;

  if (totalSkills >= 8) {
    score += 10;
  } else {
    if (totalSkills === 0) {
      suggestions.push("Add more skills (target 8+).");
    } else {
      suggestions.push(`Add more skills (target 8+, currently ${totalSkills}).`);
    }
  }

  // Check links (GitHub or LinkedIn)
  if (data.links.github || data.links.linkedin) {
    score += 10;
  } else {
    suggestions.push("Add GitHub or LinkedIn link.");
  }

  // Check for numbers in experience/project bullets
  const hasNumbers = (text: string): boolean => {
    // Match numbers, percentages, k/m/b suffixes, etc.
    return /\d+[%kmbKMB]?/.test(text);
  };

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

  if (hasMeasurableImpact) {
    score += 15;
  } else {
    if (data.experience.length > 0 || data.projects.length > 0) {
      suggestions.push("Add measurable impact (numbers) in bullets.");
    }
  }

  // Check education completeness
  const hasCompleteEducation = data.education.some(
    (edu) => edu.institution && edu.degree && edu.period
  );
  if (hasCompleteEducation) {
    score += 10;
  } else {
    if (data.education.length === 0) {
      suggestions.push("Add education with complete fields (institution, degree, period).");
    } else {
      suggestions.push("Complete education fields (institution, degree, period).");
    }
  }

  // Cap at 100
  score = Math.min(score, 100);

  // Return top 3 suggestions
  return {
    score,
    suggestions: suggestions.slice(0, 3),
  };
}
