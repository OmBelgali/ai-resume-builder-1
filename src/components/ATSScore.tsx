"use client";

import { useResume } from "@/context/ResumeContext";
import { calculateATSScore } from "@/lib/ats-scoring";
import { ImprovementPanel } from "@/components/ImprovementPanel";
import { useMemo } from "react";

export function ATSScore() {
  const { data } = useResume();
  const { score, suggestions, label, color } = useMemo(() => calculateATSScore(data), [data]);

  // Determine colors based on score range
  const getColors = (colorName: string) => {
    switch (colorName) {
      case "green":
        return {
          stroke: "#22c55e",
          text: "#16a34a",
          bg: "#dcfce7",
        };
      case "amber":
        return {
          stroke: "#f59e0b",
          text: "#d97706",
          bg: "#fef3c7",
        };
      case "red":
        return {
          stroke: "#ef4444",
          text: "#dc2626",
          bg: "#fee2e2",
        };
      default:
        return {
          stroke: "#6e6256",
          text: "#6e6256",
          bg: "#f7f6f3",
        };
    }
  };

  const colors = getColors(color);
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="rounded-xl border border-[#2b2118] bg-[#f7f6f3] p-6 space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[#2b2118] mb-4">
        ATS Readiness Score
      </h3>

      {/* Circular Progress */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="relative w-32 h-32">
          {/* Background circle */}
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke={colors.stroke}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          {/* Score text in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold" style={{ color: colors.text }}>
              {score}
            </span>
            <span className="text-xs text-[#6e6256]">/ 100</span>
          </div>
        </div>

        {/* Label */}
        <div
          className="px-4 py-1.5 rounded-full text-xs font-semibold"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {label}
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-2 pt-4 border-t border-[#2b2118]/20">
          <p className="text-xs font-medium text-[#2b2118] mb-2">Improve Your Score:</p>
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
        <div className="pt-4 border-t border-[#2b2118]/20">
          <p className="text-xs text-[#16a34a] font-medium text-center">
            🎉 Perfect! Your resume is ATS-ready.
          </p>
        </div>
      )}
    </div>
  );
}

export function ATSScoreWithImprovements() {
  return (
    <div className="space-y-6">
      <ATSScore />
      <ImprovementPanel />
    </div>
  );
}

