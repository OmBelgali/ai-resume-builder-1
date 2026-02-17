"use client";

import { analyzeBullet } from "@/lib/bullet-guidance";

interface BulletGuidanceProps {
  text: string;
}

export function BulletGuidance({ text }: BulletGuidanceProps) {
  const guidance = analyzeBullet(text);

  if (!text.trim() || (!guidance.needsActionVerb && !guidance.needsNumbers)) {
    return null;
  }

  return (
    <div className="mt-1 space-y-0.5">
      {guidance.needsActionVerb && (
        <p className="text-[10px] text-[#8b0000]/70 italic">
          Start with a strong action verb.
        </p>
      )}
      {guidance.needsNumbers && (
        <p className="text-[10px] text-[#8b0000]/70 italic">
          Add measurable impact (numbers).
        </p>
      )}
    </div>
  );
}
