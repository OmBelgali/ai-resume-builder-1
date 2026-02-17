"use client";

import { PreviewResume } from "@/components/PreviewResume";
import { TemplateSelector } from "@/components/TemplateSelector";
import { ExportButtons } from "@/components/ExportButtons";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-[#e8e6e3] py-8 px-4">
      <div className="mx-auto max-w-[210mm]">
        <div className="mb-6 space-y-4 print:hidden">
          <p className="text-xs text-[#6e6256] mb-4 text-center">
            Preview — minimal black & white layout
          </p>
          <TemplateSelector />
          <ExportButtons />
        </div>
        <PreviewResume />
      </div>
    </div>
  );
}
