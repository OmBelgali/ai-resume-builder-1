"use client";

import { useTemplate } from "@/context/TemplateContext";
import type { TemplateType } from "@/lib/template-types";

const templates: { id: TemplateType; label: string }[] = [
  { id: "classic", label: "Classic" },
  { id: "modern", label: "Modern" },
  { id: "minimal", label: "Minimal" },
];

export function TemplateSelector() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="flex items-center gap-2 border-b border-[#2b2118] pb-3 mb-4">
      <span className="text-xs font-medium text-[#6e6256] mr-2">Template:</span>
      <div className="flex gap-1">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTemplate(t.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
              template === t.id
                ? "bg-[#8b0000]/10 text-[#8b0000] border border-[#8b0000]/30"
                : "text-[#6e6256] hover:text-[#2b2118] hover:bg-[#2b2118]/5 border border-transparent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
