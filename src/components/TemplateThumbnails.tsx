"use client";

import { useTemplate } from "@/context/TemplateContext";
import type { TemplateType } from "@/lib/template-types";

const templates: { id: TemplateType; label: string }[] = [
  { id: "classic", label: "Classic" },
  { id: "modern", label: "Modern" },
  { id: "minimal", label: "Minimal" },
];

export function TemplateThumbnails() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="mb-4">
      <p className="text-xs font-medium text-[#2b2118] mb-2">Template</p>
      <div className="flex gap-2">
        {templates.map((t) => {
          const isActive = template === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTemplate(t.id)}
              className={`relative flex-1 rounded-lg border-2 p-2 transition ${
                isActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-[#2b2118]/20 bg-white hover:border-[#2b2118]/40"
              }`}
              style={{ width: "120px", height: "90px" }}
            >
              {/* Template sketch */}
              <div className="h-full flex flex-col gap-1">
                {t.id === "classic" && (
                  <>
                    <div className="h-2 bg-black/80 rounded"></div>
                    <div className="h-1 bg-black/40 rounded"></div>
                    <div className="h-1 bg-black/20 rounded"></div>
                    <div className="h-1 bg-black/20 rounded"></div>
                    <div className="h-1 bg-black/20 rounded"></div>
                  </>
                )}
                {t.id === "modern" && (
                  <>
                    <div className="flex gap-1 h-full">
                      <div className="w-1/3 bg-black/60 rounded"></div>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="h-2 bg-black/80 rounded"></div>
                        <div className="h-1 bg-black/40 rounded"></div>
                        <div className="h-1 bg-black/20 rounded"></div>
                      </div>
                    </div>
                  </>
                )}
                {t.id === "minimal" && (
                  <>
                    <div className="h-2 bg-black/60 rounded"></div>
                    <div className="h-1 bg-black/30 rounded"></div>
                    <div className="h-1 bg-black/20 rounded"></div>
                    <div className="h-1 bg-black/20 rounded"></div>
                  </>
                )}
              </div>
              {isActive && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px]">✓</span>
                </div>
              )}
              <p className="text-[10px] font-medium text-[#2b2118] mt-1 text-center">
                {t.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
