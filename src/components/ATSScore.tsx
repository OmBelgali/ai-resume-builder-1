"use client";

import { useResume } from "@/context/ResumeContext";
import { calculateATSScore } from "@/lib/ats-scoring";
import { useMemo } from "react";

export function ATSScore() {
  const { data } = useResume();
  const { score, suggestions } = useMemo(() => calculateATSScore(data), [data]);

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[#8b0000]";
    if (score >= 60) return "text-[#8b0000]/80";
    return "text-[#6e6256]";
  };

  const getBarColor = (score: number) => {
    if (score >= 80) return "bg-[#8b0000]";
    if (score >= 60) return "bg-[#8b0000]/80";
    return "bg-[#6e6256]";
  };

  return (
    <div className="rounded-xl border border-[#2b2118] bg-[#f7f6f3] p-4 space-y-4">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#2b2118] mb-3">
          ATS Readiness Score
        </h3>
        
        {/* Score Display */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className={`text-3xl font-semibold font-serif ${getScoreColor(score)}`}>
              {score}
            </span>
            <span className="text-xs text-[#6e6256]">/ 100</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-[#2b2118]/10 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${getBarColor(score)}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-[#2b2118]/20">
          <p className="text-xs font-medium text-[#2b2118] mb-2">Suggestions:</p>
          <ul className="space-y-1.5">
            {suggestions.map((suggestion, idx) => (
              <li key={idx} className="text-xs text-[#6e6256] flex items-start gap-2">
                <span className="text-[#8b0000] mt-0.5">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {suggestions.length === 0 && score === 100 && (
        <div className="pt-2 border-t border-[#2b2118]/20">
          <p className="text-xs text-[#8b0000] font-medium">
            Excellent! Your resume is ATS-ready.
          </p>
        </div>
      )}
    </div>
  );
}
