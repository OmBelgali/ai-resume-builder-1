"use client";

import { PreviewResume } from "@/components/PreviewResume";
import { TemplateThumbnails } from "@/components/TemplateThumbnails";
import { ColorPicker } from "@/components/ColorPicker";
import { ExportButtons } from "@/components/ExportButtons";
import { ATSScore } from "@/components/ATSScore";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-[#e8e6e3] py-8 px-4">
      <div className="mx-auto max-w-[210mm]">
        <div className="mb-6 space-y-4 print:hidden">
          <p className="text-xs text-[#6e6256] mb-4 text-center">
            Preview — minimal black & white layout
          </p>
          <ATSScore />
          <div className="rounded-xl border border-[#2b2118] bg-[#f7f6f3] p-4">
            <TemplateThumbnails />
            <ColorPicker />
          </div>
          <ExportButtons />
        </div>
        <PreviewResume />
      </div>
    </div>
  );
}
