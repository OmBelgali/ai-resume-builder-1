/**
 * Bullet structure guidance utilities.
 */

const ACTION_VERBS = [
  "built",
  "developed",
  "designed",
  "implemented",
  "led",
  "improved",
  "created",
  "optimized",
  "automated",
  "managed",
  "delivered",
  "achieved",
  "increased",
  "reduced",
  "enhanced",
  "established",
  "launched",
  "architected",
  "scaled",
  "transformed",
];

export interface BulletGuidance {
  needsActionVerb: boolean;
  needsNumbers: boolean;
}

/**
 * Check if bullet starts with an action verb.
 */
function startsWithActionVerb(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;
  
  const firstWord = trimmed.split(/\s+/)[0].toLowerCase();
  return ACTION_VERBS.some((verb) => firstWord.startsWith(verb));
}

/**
 * Check if bullet contains numeric indicators.
 */
function hasNumbers(text: string): boolean {
  // Match numbers, percentages, k/m/b suffixes, etc.
  return /\d+[%kmbKMB]?/.test(text);
}

/**
 * Analyze bullet text and return guidance.
 */
export function analyzeBullet(text: string): BulletGuidance {
  if (!text.trim()) {
    return { needsActionVerb: false, needsNumbers: false };
  }

  return {
    needsActionVerb: !startsWithActionVerb(text),
    needsNumbers: !hasNumbers(text),
  };
}
