"use client";

import { PreviewResume } from "@/components/PreviewResume";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-[#e8e6e3] py-8 px-4">
      <div className="mx-auto max-w-[210mm]">
        <p className="text-xs text-[#6e6256] mb-4 text-center">
          Preview — minimal black & white layout
        </p>
        <PreviewResume />
      </div>
    </div>
  );
}
